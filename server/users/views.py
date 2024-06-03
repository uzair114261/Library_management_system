from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, StudentSerializer
from rest_framework.pagination import PageNumberPagination
from .models import User

class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of rows per page
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        password = make_password(serializer.validated_data['password'])
        serializer.validated_data['password'] = password
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_student(request, cnic):
    try:
        student = User.objects.get(cnic=cnic, role='STUDENT')
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def student_list_by_ids(request):
    student_ids = request.data.get('student_ids')
    if not student_ids:
        return Response({'error': 'Student IDs not provided'}, status=status.HTTP_400_BAD_REQUEST)

    students = User.objects.filter(id__in=student_ids, role='STUDENT')
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_student(request):
    paginator = CustomPagination()
    students = User.objects.filter(role='STUDENT')
    search_query = request.query_params.get('search', None)
    if search_query:
        students = students.filter(name__icontains=search_query)
        
    result_page = paginator.paginate_queryset(students, request)
    serializer = StudentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['DELETE'])
def delete_student(request, cnic):
    try:
        student = User.objects.get(cnic=cnic, role='STUDENT')
        student.delete()
        return Response({'message': 'Student deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)


class AdminLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email, role='ADMIN')
        except User.DoesNotExist:
            return Response({'error': 'Admin not found'}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        user_data = {
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'image': user.image.url
        }
        data = {
            'refresh': str(refresh),
            'access': str(access_token),
            'user': user_data
        }

        return Response(data, status=status.HTTP_200_OK)
    
    
class StudentLoginView(APIView):
    def post(self, request):
        cnic = request.data.get('cnic')
        password = request.data.get('password')

        try:
            student = User.objects.get(cnic=cnic, role='STUDENT')
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(password, student.password):
            return Response({'error': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(student)
        access_token = refresh.access_token
        student_data = {
                'name': student.name,
                'email': student.email,
                'cnic' : student.cnic,
                'phone': student.phone,
                'address': student.address,
                'standard': student.standard,
                'major': student.major,
                'image': student.image.url,
                
        }
        data = {
            'refresh': str(refresh),
            'access': str(access_token),
            'studentData': student_data
        }

        return Response(data, status=status.HTTP_200_OK)
    
    
@api_view(['PUT'])
def update_student_profile(request):
    if request.method == 'PUT':
        cnic = request.data.get('cnic')
        address = request.data.get('address')
        image = request.data.get('image')
        standard = request.data.get('standard')
        try:
            student = User.objects.get(cnic=cnic, role='STUDENT')
            student.address = address
            student.image = image
            student.standard = standard
            student.save()
            updated_data = {
                'name': student.name,
                'email': student.email,
                'cnic' : student.cnic,
                'phone': student.phone,
                'address': student.address,
                'standard': student.standard,
                'major': student.major,
                'image': student.image.url,
            }
            return Response({'studentData': updated_data}, status=200)
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
    
    return Response({'error': 'Method not allowed'}, status=405)
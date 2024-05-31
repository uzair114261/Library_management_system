from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
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

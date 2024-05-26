from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from .serializers import UserSerializer, StudentSerializer
from .models import User

# Create your views here.
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
    for studentId in student_ids:
        students = User.objects.filter(id=studentId, role='STUDENT')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
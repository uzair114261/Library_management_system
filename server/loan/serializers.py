from rest_framework import serializers
from .models import LoanBook
from users.serializers import StudentSerializer  # Import the StudentSerializer
from books.serializers import BooksSerializer  # Import the BooksSerializer

class LoanBookSerializer(serializers.ModelSerializer):
    student_data = StudentSerializer(source='student', read_only=True)
    book_data = BooksSerializer(source='book', read_only=True)

    class Meta:
        model = LoanBook
        fields = '__all__'
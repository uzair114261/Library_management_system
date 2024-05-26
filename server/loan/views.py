from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanBook
from .serializers import LoanBookSerializer
from books.models import Books
from users.models import User
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of rows per page
    page_size_query_param = 'page_size'
    max_page_size = 100
# Create your views here.
@api_view(['POST'])
def allocate_book(request):
    student_cnic = request.data.get('student_cnic')
    book_ids = request.data.get('book_ids')
    due_date = request.data.get('due_date')
    student = User.objects.get(cnic=student_cnic, role='STUDENT')

    loan_books = []
    for book_id in book_ids:
            book = Books.objects.get(id=book_id)
            book.quantity -= 1
            book.save()
            loan_book = LoanBook.objects.create(student=student, book=book, due_date=due_date)
            loan_books.append(loan_book)
        
    serializer = LoanBookSerializer(loan_books, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_all_allocated_books(request):
    paginator = CustomPagination()
    books = LoanBook.objects.all()

    # Search functionality
    search_query = request.query_params.get('search', None)
    if search_query:
        books = books.filter(title__icontains=search_query)

    result_page = paginator.paginate_queryset(books, request)
    serializer = LoanBookSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
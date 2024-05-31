from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanBook
from .serializers import LoanBookSerializer
from django.utils import timezone
from books.models import Books
from users.models import User
from rest_framework.pagination import PageNumberPagination
from datetime import timedelta

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

    try:
        student = User.objects.get(cnic=student_cnic, role='STUDENT')
    except User.DoesNotExist:
        return Response({'error': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check for borrowed books or unpaid fines
    borrowed_books = LoanBook.objects.filter(student=student, status='BORROWED').exists()
    unpaid_fines = LoanBook.objects.filter(student=student, fine__gt=0).exists()

    if borrowed_books:
        return Response({'error': 'Please return previous borrowed books before getting new ones.'}, status=status.HTTP_400_BAD_REQUEST)

    if unpaid_fines:
        return Response({'error': 'Please pay all outstanding fines before borrowing new books.'}, status=status.HTTP_400_BAD_REQUEST)

    loan_books = []
    for book_id in book_ids:
        try:
            book = Books.objects.get(id=book_id)
        except Books.DoesNotExist:
            return Response({'error': f'Book with ID {book_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

        if book.quantity <= 0:
            return Response({'error': f'Book "{book.title}" is not available.'}, status=status.HTTP_400_BAD_REQUEST)

        book.quantity -= 1
        book.save()
        loan_book = LoanBook.objects.create(student=student, book=book, due_date=due_date)
        loan_books.append(loan_book)

    serializer = LoanBookSerializer(loan_books, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def get_all_allocated_books(request):
    paginator = CustomPagination()
    loan_books = LoanBook.objects.all()

    # Search functionality
    search_query = request.query_params.get('search', None)
    if search_query:
        loan_books = loan_books.filter(
            Q(student__cnic__icontains=search_query) |
            Q(student__name__icontains=search_query) |
            Q(book__title__icontains=search_query)
        )

    result_page = paginator.paginate_queryset(loan_books, request)
    serializer = LoanBookSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
def return_book(request, loan_id):
    try:
        loan_book = LoanBook.objects.get(id=loan_id)
    except LoanBook.DoesNotExist:
        return Response({'error': 'Loan record not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    loan_book.return_date = timezone.now() + timedelta(days=20)
    loan_book.calculate_fine()
    loan_book.save()

    try:
        book = Books.objects.get(id=loan_book.book_id)
        book.quantity += 1
        book.save()
    except Books.DoesNotExist:
        return Response({'error': 'Book record not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = LoanBookSerializer(loan_book)
    return Response(serializer.data, status=status.HTTP_200_OK)
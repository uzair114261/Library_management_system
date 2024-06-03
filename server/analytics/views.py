from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Books
from loan.models import LoanBook
from users.models import User
from django.db.models import Count

class AnalyticsView(APIView):
    def get(self, request):
        # Total count of books
        total_books = Books.objects.all().count()

        # Get all books data
        books = list(Books.objects.values())

        # Total count of loans
        total_loan = LoanBook.objects.all().count()

        # Get all loans data
        loans = list(LoanBook.objects.values())

        # Total count of students
        total_students = User.objects.filter(role='STUDENT').count()

        # Get all students data
        students = list(User.objects.filter(role='STUDENT').values())

        # Count of overdue books
        overdue_books = LoanBook.objects.filter(status='OVERDUE').count()

        # Books borrowed by category
        books_by_category = Books.objects.values('category').annotate(total=Count('id'))

        # Convert books_by_category to a more usable format
        books_by_category_data = {item['category']: item['total'] for item in books_by_category}

        data = {
            'total_books': total_books,
            'books': books,
            'total_loan': total_loan,
            'loans': loans,
            'total_students': total_students,
            'students': students,
            'overdue_books': overdue_books,
            'books_by_category': books_by_category_data,
        }

        return Response(data)

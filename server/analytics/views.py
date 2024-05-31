from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Books
from loan.models import LoanBook
from users.models import User

# Create your views here.
class AnalyticsView(APIView):
    def get(self, request):
        total_books = Books.objects.all().count()
        total_loan = LoanBook.objects.count()
        # total_students = User.objects.all(role='STUDENT')
        data = {
            'total_books': total_books,
            'total_loan' : total_loan
        }
        return Response(data)
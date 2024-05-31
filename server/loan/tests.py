from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from users.models import User
from books.models import Books
from .models import LoanBook

class LoanBookModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', password='12345')
        self.book = Books.objects.create(title='Test Book', author='Author', quantity=5)

    def test_calculate_fine_no_fine(self):
        loan_book = LoanBook.objects.create(
            student=self.user,
            book=self.book,
            due_date=timezone.now() + timedelta(days=7)
        )
        # Setting return_date within the due_date
        loan_book.return_date = loan_book.due_date - timedelta(days=1)
        loan_book.calculate_fine()
        
        self.assertEqual(loan_book.fine, 0)
        self.assertEqual(loan_book.status, 'RETURNED')

    def test_calculate_fine_with_fine(self):
        loan_book = LoanBook.objects.create(
            student=self.user,
            book=self.book,
            due_date=timezone.now() - timedelta(days=7)
        )
        # Setting return_date after the due_date
        loan_book.return_date = loan_book.due_date + timedelta(days=3)
        loan_book.calculate_fine()
        
        self.assertEqual(loan_book.fine, 300)  # 3 days overdue * 100
        self.assertEqual(loan_book.status, 'OVERDUE')

    def test_calculate_fine_returned_on_due_date(self):
        loan_book = LoanBook.objects.create(
            student=self.user,
            book=self.book,
            due_date=timezone.now() + timedelta(days=7)
        )
        # Setting return_date on the due_date
        loan_book.return_date = loan_book.due_date
        loan_book.calculate_fine()
        
        self.assertEqual(loan_book.fine, 0)
        self.assertEqual(loan_book.status, 'RETURNED')

# Remember to run your tests with the command
# python manage.py test

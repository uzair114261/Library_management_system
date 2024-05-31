from django.db import models
from users.models import User
from books.models import Books

# Create your models here.
class LoanBook(models.Model):
    STATUS_CHOICES = (
        ('BORROWED', 'Borrowed'),
        ('RETURNED', 'Returned'),
        ('OVERDUE', 'Overdue')
    )
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Books, on_delete=models.CASCADE)
    loan_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(null=True, blank=True)
    fine = models.IntegerField(max_length=5, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='BORROWED')
    
    def calculate_fine(self):
        if self.return_date and self.return_date > self.due_date:
            overdue_days = (self.return_date - self.due_date).days
            self.fine = overdue_days * 100
            self.status = 'OVERDUE'
        elif self.return_date and self.return_date <= self.due_date:
            self.fine = 0
            self.status = 'RETURNED'
        self.save()
    
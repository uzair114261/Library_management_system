from django.urls import path
from loan import views

urlpatterns = [
    path('allocate_book', views.allocate_book, name='allocate_book'),
    path('get_allocated_books', views.get_all_allocated_books, name='get_allocated_books'),
    path('return_book/<int:loan_id>', views.return_book, name='return_book'),
    path('student/<str:student_cnic>/', views.get_loans_by_student_cnic, name='get_loans_by_student_cnic')
]

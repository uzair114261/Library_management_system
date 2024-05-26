from django.urls import path
from loan import views
urlpatterns = [
    path('allocate_book', views.allocate_book, name='allocate_book'),
    path('get_allocated_books', views.get_all_allocated_books, name='get_allocated_books'),
]

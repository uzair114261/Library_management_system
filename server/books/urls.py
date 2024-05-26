from django.urls import path
from books import views

urlpatterns = [
    path('create_book', views.create_book, name='create_book'),
    path('get_all_books', views.get_all_books, name='get_all_books'),
    path('delete_book/<int:id>', views.delete_book, name='delete_books'),
    path('get_book/<int:id>', views.get_book, name='get_book')
]

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Books
from .serializers import BooksSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.
@api_view(['POST'])
def create_book(request):
    serializer = BooksSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomPagination(PageNumberPagination):
    page_size = 1  # Number of rows per page
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def get_all_books(request):
    paginator = CustomPagination()
    books = Books.objects.all()

    # Search functionality
    search_query = request.query_params.get('search', None)
    if search_query:
        books = books.filter(title__icontains=search_query)

    result_page = paginator.paginate_queryset(books, request)
    serializer = BooksSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['DELETE'])
def delete_book(request, id):
    book = Books.objects.get(id=id)
    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_book(request, id):
    book = Books.objects.get(id=id)
    serializer = BooksSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)
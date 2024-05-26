from django.urls import path
from users import views

urlpatterns = [
    path('create_user', views.create_user, name='create_user'),
    path('get_student/<str:cnic>', views.get_student, name='get_student'),
    path('get_student_list', views.student_list_by_ids, name='student_list')
]
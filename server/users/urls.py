from django.urls import path
from users import views

urlpatterns = [
    path('create_user', views.create_user, name='create_user'),
    path('login_user', views.AdminLoginView.as_view(), name='login_user'),
    path('student_login', views.StudentLoginView.as_view(), name='login_student'),
    path('student_update', views.update_student_profile, name='student_update'),
    path('get_student/<str:cnic>', views.get_student, name='get_student'),
    path('get_student_list', views.student_list_by_ids, name='student_list'),
    path('all_students', views.get_all_student, name='all_students'),
    path('delete_student/<str:cnic>', views.delete_student, name='delete_student'),
]

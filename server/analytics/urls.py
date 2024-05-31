from django.urls import path
from analytics import views

urlpatterns = [
    path('', views.AnalyticsView.as_view(), name='analytics')
]

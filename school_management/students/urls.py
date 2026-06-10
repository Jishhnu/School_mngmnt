from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('students/', all_students),
    path('students/<int:student_id>/', get_student),
    path('students/add/', add_student),
    path('students/update/<int:student_id>/', update_student),
    path('students/delete/<int:student_id>/', delete_student),
    path('students/search/', search_students),
]
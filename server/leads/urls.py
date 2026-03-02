from django.urls import path
from .views import LeadListCreateView, LeadDetailView, ConvertLeadView

urlpatterns = [
    path("", LeadListCreateView.as_view()),
    path("<int:pk>/", LeadDetailView.as_view()),
    path("convert/<int:pk>/", ConvertLeadView.as_view()),
]
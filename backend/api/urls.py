from django.urls import path
from . import views

urlpatterns = [
    path('auth/login/', views.LoginView.as_view()),
    path('dashboard/stats/', views.DashboardStatsView.as_view()),
    path('products/', views.ProductListView.as_view()),
    path('products/<int:pk>/', views.ProductDetailView.as_view()),
    path('orders/', views.OrderListView.as_view()),
    path('analytics/sales/', views.SalesAnalyticsView.as_view()),
    path('ml/predict-sales/', views.PredictSalesView.as_view()),
    path('ml/analyze-review/', views.ReviewAnalysisView.as_view()),
    path('ml/chatbot/', views.ChatbotView.as_view()),
]
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Sum, Count
from .models import Product, Order, Review
from .serializers import ProductSerializer, OrderSerializer, ReviewSerializer
from .ml.predict import predict_sales, detect_fake_review, analyze_sentiment, chatbot_response

# Auth
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({'access': str(refresh.access_token), 'refresh': str(refresh)})
        return Response({'error': 'Invalid credentials'}, status=401)

# Dashboard Stats
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        total_revenue = Order.objects.filter(status='completed').aggregate(Sum('total_price'))['total_price__sum'] or 0
        total_orders = Order.objects.count()
        total_products = Product.objects.count()
        total_reviews = Review.objects.count()
        return Response({
            'total_revenue': round(total_revenue, 2),
            'total_orders': total_orders,
            'total_products': total_products,
            'total_reviews': total_reviews,
        })

# Products CRUD
class ProductListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(ProductSerializer(Product.objects.all(), many=True).data)
    def post(self, request):
        s = ProductSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        product = Product.objects.get(pk=pk)
        s = ProductSerializer(product, data=request.data)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)
    def delete(self, request, pk):
        Product.objects.get(pk=pk).delete()
        return Response(status=204)

# Orders
class OrderListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(OrderSerializer(Order.objects.all().order_by('-created_at'), many=True).data)
    def post(self, request):
        s = OrderSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)

# Sales Analytics
class SalesAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        monthly = Order.objects.filter(status='completed').values('created_at__month').annotate(
            total=Sum('total_price'), count=Count('id')
        ).order_by('created_at__month')
        return Response(list(monthly))

# ML Views
class PredictSalesView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        month = request.data.get('month', 1)
        price = request.data.get('price', 100)
        quantity = request.data.get('quantity', 10)
        prediction = predict_sales(int(month), float(price), int(quantity))
        return Response({'predicted_sales': prediction})

class ReviewAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        text = request.data.get('text', '')
        sentiment = analyze_sentiment(text)
        is_fake = detect_fake_review(text)
        review = Review.objects.create(
            product_id=request.data.get('product_id'),
            review_text=text,
            sentiment=sentiment,
            is_fake=is_fake
        )
        return Response(ReviewSerializer(review).data)

class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        message = request.data.get('message', '')
        return Response({'response': chatbot_response(message)})
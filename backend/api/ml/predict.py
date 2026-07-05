import joblib, os
import numpy as np

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

def predict_sales(month, price, quantity):
    model = joblib.load(os.path.join(MODELS_DIR, 'sales_model.pkl'))
    return round(model.predict([[month, price, quantity]])[0], 2)

def detect_fake_review(text):
    model = joblib.load(os.path.join(MODELS_DIR, 'fake_review_model.pkl'))
    result = model.predict([text])[0]
    return bool(result)

def analyze_sentiment(text):
    model = joblib.load(os.path.join(MODELS_DIR, 'sentiment_model.pkl'))
    return model.predict([text])[0]

# Simple rule-based chatbot (no API needed)
def chatbot_response(message):
    msg = message.lower()
    if any(w in msg for w in ['sales', 'revenue', 'earning', 'income']):
        return "Check the Analytics page for detailed sales charts and use the AI Sales Predictor to forecast future revenue!"
    elif any(w in msg for w in ['order', 'orders', 'purchase']):
        return "Go to Orders section to see all orders. Filter by Pending, Completed, or Cancelled status."
    elif any(w in msg for w in ['product', 'products', 'item', 'stock']):
        return "You currently have products listed. Go to Products page to add, edit or delete items."
    elif any(w in msg for w in ['review', 'feedback', 'rating', 'comment']):
        return "Submit a review in the Reviews section — AI will auto-detect sentiment (positive/negative) and fake reviews!"
    elif any(w in msg for w in ['analytics', 'predict', 'forecast', 'ai']):
        return "Visit Analytics page! Enter month, price and quantity to get AI-powered sales prediction."
    elif any(w in msg for w in ['hello', 'hi', 'hey', 'salam', 'assalam']):
        return "Hello! I'm your E-Commerce AI Assistant. Ask me about sales, orders, products, or reviews!"
    elif any(w in msg for w in ['help', 'madad', 'guide']):
        return "I can help with: Sales Analytics, Order Management, Product CRUD, and Review Analysis. What do you need?"
    elif any(w in msg for w in ['revenue', 'profit', 'loss']):
        return "Total revenue is shown on Dashboard. Completed orders contribute to revenue. Check Analytics for trends!"
    else:
        return f"I understand you're asking about '{message}'. Try asking about: sales, orders, products, reviews, or analytics!"
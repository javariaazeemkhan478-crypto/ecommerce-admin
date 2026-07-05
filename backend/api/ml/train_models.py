import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
import joblib, os

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

# 1. Sales Prediction Model
def train_sales_model():
    np.random.seed(42)
    n = 500
    df = pd.DataFrame({
        'month': np.random.randint(1, 13, n),
        'price': np.random.uniform(10, 500, n),
        'quantity': np.random.randint(1, 100, n),
    })
    df['sales'] = df['price'] * df['quantity'] * (1 + np.random.normal(0, 0.1, n))
    X = df[['month', 'price', 'quantity']]
    y = df['sales']
    model = LinearRegression()
    model.fit(X, y)
    joblib.dump(model, os.path.join(MODELS_DIR, 'sales_model.pkl'))
    print("Sales model trained!")

# 2. Fake Review Detection
def train_fake_review_model():
    texts = (
        ["Great product! Highly recommend"] * 100 +
        ["buy now best product ever amazing"] * 100 +
        ["worst quality, broke after 1 day"] * 100 +
        ["buy buy buy discount offer limited"] * 100
    )
    labels = [0]*200 + [1]*200  # 0=real, 1=fake
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', LogisticRegression())
    ])
    pipeline.fit(texts, labels)
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'fake_review_model.pkl'))
    print("Fake review model trained!")

# 3. Sentiment Analysis (rule-based, no API needed)
def train_sentiment_model():
    texts = (
        ["I love this product it is amazing"] * 150 +
        ["terrible product waste of money"] * 150 +
        ["okay product nothing special"] * 100
    )
    labels = ['positive']*150 + ['negative']*150 + ['neutral']*100
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', LogisticRegression(max_iter=200))
    ])
    pipeline.fit(texts, labels)
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'sentiment_model.pkl'))
    print("Sentiment model trained!")

if __name__ == '__main__':
    train_sales_model()
    train_fake_review_model()
    train_sentiment_model()
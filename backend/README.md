# E-Commerce Admin Dashboard

Full-stack admin dashboard with AI/ML features.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Django REST Framework
- Database: PostgreSQL
- AI/ML: scikit-learn

## Features
- Dashboard with real-time stats
- Products CRUD
- Orders Management
- AI Sales Predictor
- Sentiment Analysis
- Fake Review Detection
- AI Chatbot

## Setup Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

## Setup Frontend
cd frontend
npm install
npm run dev

# Scalable Portfolio Management Web Application

> Cloud-based investment tracking platform for stocks and cryptocurrencies with real-time price alerts, tax calculation, and multi-currency portfolio valuation

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Ughanze23/MSC-Cloud-SCP-PROJECT)
[![Project Report](https://img.shields.io/badge/Report-Google%20Drive-green)](https://drive.google.com/file/d/1otEltqxjy81nIsm3MHuob09_DdSgd7VT/view?usp=drive_link)
[![AWS](https://img.shields.io/badge/AWS-Deployed-orange)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React-Frontend-61dafb)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-Backend-092e20)](https://www.djangoproject.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution Architecture](#solution-architecture)
- [Features](#features)
- [Design Patterns](#design-patterns)
- [Technology Stack](#technology-stack)
- [API Integrations](#api-integrations)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Documentation](#documentation)

## 🎯 Overview

**Course**: Scalable Cloud Programming  
**Programme**: MSc in Cloud Computing  
**Institution**: National College of Ireland  
**Student**: Ikenna Ughanze Polycarp (23384069)  
**Submission Date**: 02/04/2024

This project delivers a scalable cloud-based portfolio management application that enables users to track their stock and cryptocurrency investments in a unified platform. Built with modern microservices architecture and deployed on AWS, the application demonstrates enterprise-level cloud engineering practices including auto-scaling, high availability (>99% uptime), and seamless integration with multiple third-party services.

### Project Objectives

The application addresses the complexity of managing investment portfolios across different asset classes by providing:
- Centralized tracking of stocks and cryptocurrencies
- Real-time price alerts via email notifications
- Investment gains tax calculation using custom-built API
- Multi-currency portfolio valuation
- Near real-time financial news integration
- Secure, scalable cloud infrastructure

## 🔍 Problem Statement

Managing investment portfolios across different markets presents several challenges:

### Current Pain Points

1. **Data Silos**: Investment data scattered across multiple platforms
2. **Manual Tracking**: Time-consuming manual consolidation of portfolio data
3. **Lack of Real-Time Insights**: No immediate updates on price movements
4. **Tax Complexity**: Difficulty calculating investment income tax
5. **Multi-Currency Challenges**: Need to track portfolio value in different currencies
6. **Inefficiency**: Reliance on multiple applications or Excel spreadsheets

### Solution Impact

Traditional investment tracking methods require investors to manually consolidate data from various platforms, leading to inefficiencies, errors, and a lack of real-time insights. This cloud-based solution eliminates these challenges by providing a unified, automated, and scalable platform.

## 🏗️ Solution Architecture

### Cloud Architecture

The application implements a modern microservices architecture deployed on AWS infrastructure:

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐        │
│  │ React UI │  │  Django  │  │ GitHub Actions     │        │
│  │          │  │   API    │  │ (CI/CD Workflows)  │        │
│  └──────────┘  └──────────┘  └────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ GitHub Actions  │
                    │  CI/CD Pipeline │
                    │  • Lint Code    │
                    │  • Build & Test │
                    │  • Dockerize    │
                    └────────┬────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│                      AWS Cloud Infrastructure               │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │    EC2       │ ◄────── │   Docker     │                │
│  │  Instance    │         │  Container   │                │
│  │              │         │ (React+Django)│                │
│  └──────┬───────┘         └──────────────┘                │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────┐         ┌──────────────┐                │
│  │     RDS      │         │ API Gateway  │                │
│  │ PostgreSQL   │         │              │                │
│  └──────────────┘         └──────┬───────┘                │
│                                   │                         │
│                                   ▼                         │
│                          ┌──────────────┐                  │
│                          │   Lambda     │                  │
│                          │ (Tax Calc)   │                  │
│                          └──────────────┘                  │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│              External APIs & Services                       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │Alpha Vantage │  │CoinMarketCap │  │   Custom     │    │
│  │  Stock API   │  │  Crypto API  │  │ Classmate    │    │
│  │              │  │              │  │    APIs      │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────────────────────────────────────┘
```
<img width="2010" height="1012" alt="image" src="https://github.com/user-attachments/assets/a717d86a-c9fa-448a-8a2a-115d3631d164" />



### Architecture Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | React.js | User interface and API consumption |
| **Backend** | Django | Business logic and data management |
| **Database** | AWS RDS (PostgreSQL) | Persistent data storage |
| **Compute** | AWS EC2 | Application hosting |
| **Serverless** | AWS Lambda | Tax calculation service |
| **API Gateway** | AWS API Gateway | RESTful API management |
| **CI/CD** | GitHub Actions | Automated deployment pipeline |
| **Containerization** | Docker | 

## ✨ Features

### Core Functionality

#### 1. User Management
- **User Registration**: Secure account creation with validation
- **Authentication**: Secure login with JWT tokens
- **Session Management**: Persistent user sessions

#### 2. Investment Tracking
- **Stock Portfolio Management**
  - Add, update, and delete stock investments
  - Track number of units bought and sold
  - View current stock prices via Alpha Vantage API
  - Monitor Portfolio performance

- **Cryptocurrency Portfolio Management**
  - Add, update, and delete cryptocurrency holdings
  - Real-time crypto prices via CoinMarketCap API
  - Track portfolio value across different cryptocurrencies

#### 3. Price Alert System
- **Custom Price Alerts**
  - Create alerts for stocks and cryptocurrencies
  - Set target prices (above or below current price)
  - Receive email notifications when targets are met
  
- **Email Notifications**
  - Automated email alerts via custom API (x23122498)
  - Triggered on user login to check alert conditions
  - Clear notification of price movements

#### 4. Tax Calculation
- **Investment Income Tax Calculator**
  - Custom-built API using AWS Lambda
  - Calculate tax on investment income
  - Support for multiple income types:
    - Employment income
    - Self-employment income
    - Investment income
  - Accessible via RESTful endpoint on API Gateway

#### 5. Multi-Currency Support
- **Portfolio Valuation**
  - View portfolio value in different currencies
  - Real-time currency conversion via classmate's API (x23158131)
  - Support for major global currencies

#### 6. Financial News Integration
- **Real-Time Market News**
  - Latest financial news via Alpha Vantage API
  - Filter news by ticker symbol
  - Stay informed on market developments

#### 7. Dashboard & Analytics
- **Portfolio Overview Dashboard**
  - Total portfolio value (EUR)
  - Total unique stock holdings
  - Total unique cryptocurrency holdings
  - Quick summary metrics

### Non-Functional Features

| Feature | Target | Implementation |
|---------|--------|----------------|
| **Uptime** | >99% availability | AWS auto-scaling, health checks |
| **Data Integrity** | 100% accuracy | RDS ACID compliance, transaction management |
| **Security** | Enterprise-grade | JWT authentication, HTTPS, input validation |
| **Scalability** | Auto-scaling | EC2 auto-scaling groups, containerization |
| **Usability** | Intuitive UI | Responsive React design, clear navigation |

## 🔧 Design Patterns

The application implements several industry-standard design patterns to ensure modularity, scalability, and maintainability:

<img width="1224" height="758" alt="image" src="https://github.com/user-attachments/assets/dbe17ee6-835b-4aa8-8080-00308fe7aa9a" />

### 1. Microservices Architecture Pattern

**Implementation**: The application is divided into specialized, independently distributed services:
- Tax Calculation Service (AWS Lambda)
- Email Notification Service (Classmate's API)
- Currency Converter Service (Classmate's API)
- Main Application Service (React + Django)

**Benefits**:
- Independent scaling of services
- Technology flexibility per service
- Fault isolation
- Easy deployment and updates

### 2. API Gateway Pattern

**Implementation**: Amazon API Gateway serves as the central entry point routing requests to appropriate microservices.

**Benefits**:
- Simplified authentication and authorization
- Request/response transformation
- Rate limiting and throttling
- Centralized API management
- Simplified client consumption

### 3. Backend for Frontend (BFF) Pattern

**Implementation**: Frontend (React) and backend (Django) are containerized together in an ECS container. Django acts as the BFF by exposing RESTful APIs specifically designed to serve the React frontend efficiently.

**Benefits**:
- Optimized API responses for frontend needs
- Independent scaling and versioning
- Reduced frontend complexity
- Better separation of concerns
- Improved performance

### 4. API Composition Pattern

**Implementation**: The frontend aggregates data from multiple third-party APIs to present comprehensive information to users:
- CoinMarketCap API (cryptocurrency prices)
- Alpha Vantage API (stock prices and financial news)
- Custom Tax Calculation API
- Currency Converter API
- Email Notification API

**Considerations**:
- Managed latency through async calls
- Handled CORS restrictions
- Implemented error handling for API failures

### 5. Database Per Service Pattern

**Implementation**: Each microservice has its own isolated data storage, ensuring loose coupling and independent scalability.

**Benefits**:
- Data independence
- Technology flexibility
- Easier scaling
- Fault isolation

## 🛠️ Technology Stack

### Frontend Technologies

#### React.js
- **Version**: Latest stable
- **Purpose**: Building responsive, interactive user interface
- **Key Features**:
  - Component-based architecture
  - Virtual DOM for performance
  - State management for real-time updates
  - Hooks for efficient component logic

#### UI Components
- **Forms**: Investment management, price alerts, user registration
- **Tables**: Portfolio display, transaction history
- **Charts**: Portfolio visualization
- **Dashboards**: Summary metrics and KPIs

### Backend Technologies

#### Django
- **Version**: 3.x+
- **Purpose**: RESTful API development and business logic
- **Key Features**:
  - Django ORM for database operations
  - Built-in authentication and authorization
  - RESTful API framework
  - Middleware for request/response processing
  - Admin interface for data management

#### Python
- **Version**: 3.8+
- **Purpose**: Application logic, API integrations
- **Libraries**:
  - `djangorestframework`: REST API development
  - `psycopg2`: PostgreSQL adapter
  - `requests`: HTTP library for API calls
  - `python-dotenv`: Environment variable management

### Database

#### Amazon RDS (PostgreSQL)
- **Database Engine**: PostgreSQL 12+
- **Purpose**: Reliable, scalable relational database
- **Features**:
  - Managed database service
  - Automatic backups
  - Multi-AZ deployment for high availability
  - Encryption at rest
  - Automated software patching

**Key Benefits of RDS**:
- Reduces operational overhead
- Provides reliable, scalable storage
- Optimized for total cost of ownership
- Built-in security and compliance

### Cloud Infrastructure

#### AWS Services

**Compute**
- **EC2**: Application hosting with auto-scaling capabilities
- **Lambda**: Serverless tax calculation service

**Database**
- **RDS**: Managed PostgreSQL database

**Networking**
- **API Gateway**: RESTful API management and routing
- **VPC**: Network isolation and security

**DevOps**
- **CloudWatch**: Monitoring and logging
- **IAM**: Identity and access management

### DevOps Tools

#### Docker
- **Purpose**: Application containerization
- **Benefits**:
  - Consistent environments (dev, staging, prod)
  - Simplified deployment
  - Resource efficiency
  - Easy scaling

#### GitHub Actions
- **Purpose**: CI/CD automation
- **Workflows**:
  - Code linting
  - Dependency installation
  - Build and test
  - Docker image creation
  - Deployment to EC2

## 🔌 API Integrations

### Custom APIs (Author-Built)

#### 1. Tax Calculation API

**Description**: Calculate tax on different types of income including investment income.

**Technology**: AWS Lambda + API Gateway

**Endpoint**: `POST /tax/calculate`

**Request Body**:
```json
{
  "income_type": "investment",
  "amount": 25000.00
}
```

**Response**:
```json
{
  "statusCode": 200,
  "body": {
    "tax_amount": 1250.00
  }
}
```

**Income Types Supported**:
- Employment income
- Self-employment income
- Investment income

**[View Full API Documentation](https://github.com/Ughanze23/tax-calculation-api)**

### Classmate APIs

#### 2. Currency Converter API (x23158131)

**Description**: Convert portfolio value between different currencies.

**Endpoint**: `GET /convert`

**Parameters**:
- `from`: Source currency code (e.g., EUR)
- `to`: Target currency code (e.g., USD)
- `amount`: Amount to convert

**Example Request**:
```
GET /convert?from=EUR&to=USD&amount=1000
```

**Response**:
```json
{
  "original_amount": 1000,
  "original_currency": "EUR",
  "converted_amount": 1089.50,
  "target_currency": "USD"
}
```

**[View API Documentation](https://github.com/classmate/currency-converter)**

#### 3. Email Notification API (x23122498)

**Description**: Send email notifications for price alerts.

**Endpoint**: `POST /send-email`

**Request Body**:
```json
{
  "userId": "1",
  "subject": "test",
  "message": "test",
  "email": "x23384069@student.ncirl.ie"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "message": "Email sent successfully"
  }
}
```

**Authentication**: Bearer token required

**[View API Documentation](https://github.com/classmate/email-api)**

### Public APIs

#### 4. Alpha Vantage API

**Description**: Stock prices and financial news data.

**Use Cases**:
- Real-time stock price fetching
- Historical price data
- Financial news aggregation

**Endpoints Used**:
- `TIME_SERIES_INTRADAY`: Real-time stock prices
- `NEWS_SENTIMENT`: Financial news and sentiment

**Example Implementation**:
```python
import requests

def get_stock_price(symbol):
    url = f"https://www.alphavantage.co/query"
    params = {
        "function": "TIME_SERIES_INTRADAY",
        "symbol": symbol,
        "interval": "5min",
        "apikey": API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()
```

**[Official Documentation](https://www.alphavantage.co/documentation/)**

#### 5. CoinMarketCap API

**Description**: Cryptocurrency prices and market data.

**Use Cases**:
- Real-time cryptocurrency prices
- Market capitalization data
- Historical price tracking

**Endpoints Used**:
- `/cryptocurrency/listings/latest`: Latest crypto prices
- `/cryptocurrency/quotes/latest`: Specific crypto data

**Example Implementation**:
```python
import requests

def get_crypto_price(symbol):
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    headers = {
        'X-CMC_PRO_API_KEY': API_KEY,
    }
    params = {
        'symbol': symbol,
        'convert': 'EUR'
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()
```

**[Official Documentation](https://coinmarketcap.com/api/documentation/v1/)**

### API Integration Architecture

```
┌──────────────────────────────────────────────────────────┐
│              React Frontend                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │ Investment │  │Price Alert │  │  Currency  │         │
│  │  Manager   │  │  Component │  │  Converter │         │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘         │
└────────┼───────────────┼───────────────┼────────────────┘
         │               │               │
         ▼               ▼               ▼
┌──────────────────────────────────────────────────────────┐
│              Django Backend (BFF)                         │
│  • Aggregates API calls                                   │
│  • Handles authentication                                 │
│  • Business logic layer                                   │
└─────┬──────────┬──────────┬──────────┬────────────┬──────┘
      │          │          │          │            │
      ▼          ▼          ▼          ▼            ▼
┌─────────┐ ┌─────────┐ ┌──────┐ ┌────────┐ ┌──────────┐
│  Tax    │ │Currency │ │Email │ │ Alpha  │ │CoinMarket│
│  API    │ │   API   │ │ API  │ │Vantage │ │   Cap    │
│(Lambda) │ │(x23158) │ │(x231)│ │  API   │ │   API    │
└─────────┘ └─────────┘ └──────┘ └────────┘ └──────────┘
```

## 💾 Database Design

### Entity Relationship Diagram

The application uses PostgreSQL on AWS RDS with the following core models:

#### User Model
```python
class User(AbstractUser):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### Stock Transaction Model
```python
class StockTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    units = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-transaction_date']
```

#### Crypto Transaction Model
```python
class CryptoTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    units = models.DecimalField(max_digits=18, decimal_places=8)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-transaction_date']
```

#### Price Alert Model
```python
class PriceAlert(models.Model):
    ALERT_TYPES = [
        ('ABOVE', 'Above'),
        ('BELOW', 'Below'),
    ]
    
    ASSET_TYPES = [
        ('STOCK', 'Stock'),
        ('CRYPTO', 'Cryptocurrency'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset_type = models.CharField(max_length=6, choices=ASSET_TYPES)
    ticker = models.CharField(max_length=10)
    target_price = models.DecimalField(max_digits=10, decimal_places=2)
    alert_type = models.CharField(max_length=5, choices=ALERT_TYPES)
    is_triggered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Database Features

- **ACID Compliance**: PostgreSQL ensures data integrity
- **Indexing**: Optimized queries on frequently accessed fields
- **Foreign Key Constraints**: Maintain referential integrity
- **Automatic Timestamps**: Track creation and modification times
- **Ordering**: Default ordering for better query performance

## 📁 Project Structure

```
MSC-Cloud-SCP-PROJECT/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
│       ├── deploy.yml          # Deployment workflow
│       └── test.yml            # Testing workflow
├── backend/                    # Django backend application
│   ├── api/                    # API endpoints
│   │   ├── __init__.py
│   │   ├── views.py            # API view functions
│   │   ├── serializers.py      # DRF serializers
│   │   └── urls.py             # URL routing
│   ├── models/                 # Database models
│   │   ├── __init__.py
│   │   ├── user.py             # User model
│   │   ├── stock.py            # Stock transaction model
│   │   ├── crypto.py           # Crypto transaction model
│   │   └── alert.py            # Price alert model
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── portfolio.py        # Portfolio calculations
│   │   ├── api_integration.py  # Third-party API calls
│   │   └── notifications.py    # Alert notification logic
│   ├── utils/                  # Utility functions
│   │   ├── __init__.py
│   │   └── helpers.py
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Main URL configuration
│   └── wsgi.py                 # WSGI application
├── frontend/                   # React frontend application
│   ├── public/                 # Static files
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Dashboard.js    # Main dashboard
│   │   │   ├── StockManager.js # Stock management
│   │   │   ├── CryptoManager.js# Crypto management
│   │   │   ├── PriceAlerts.js  # Alert management
│   │   │   ├── TaxCalculator.js# Tax calculator
│   │   │   └── CurrencyConverter.js
│   │   ├── services/           # API service layer
│   │   │   ├── api.js          # API client configuration
│   │   │   ├── auth.js         # Authentication service
│   │   │   └── portfolio.js    # Portfolio API calls
│   │   ├── utils/              # Utility functions
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── package.json            # Node dependencies
│   └── .env                    # Environment variables
├── .env                        # Environment variables (root)
├── Dockerfile                  # Docker container definition
├── docker-compose.yml          # Multi-container orchestration
├── requirements.txt            # Python dependencies
├── manage.py                   # Django management script
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

#### Required Software
- **Python**: 3.8 or higher
- **Node.js**: 14.x or higher
- **npm**: 6.x or higher
- **Docker**: 20.x or higher (optional, but recommended)
- **PostgreSQL**: 12+ (for local development)
- **Git**: For version control

#### AWS Requirements
- Active AWS account
- AWS CLI configured with credentials
- IAM permissions for:
  - EC2 (launch instances, security groups)
  - RDS (create database instances)
  - Lambda (create functions)
  - API Gateway (create APIs)
  - CloudWatch (monitoring)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Ughanze23/MSC-Cloud-SCP-PROJECT.git
cd MSC-Cloud-SCP-PROJECT
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration:
# DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
# SECRET_KEY=your-secret-key-here
# ALPHA_VANTAGE_API_KEY=your-api-key
# COINMARKETCAP_API_KEY=your-api-key
# TAX_API_URL=your-tax-api-url
# CURRENCY_API_URL=your-currency-api-url
# EMAIL_API_URL=your-email-api-url
```

#### 3. Database Setup

**Using PostgreSQL locally:**
```bash
# Create database
createdb portfolio_db

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

**Using AWS RDS:**
```bash
# Update DATABASE_URL in .env with RDS endpoint
# DATABASE_URL=postgresql://username:password@rds-endpoint:5432/dbname

# Run migrations
python manage.py migrate
```

#### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration:
# REACT_APP_API_URL=http://localhost:8000/api
# REACT_APP_ALPHA_VANTAGE_KEY=your-api-key
# REACT_APP_COINMARKETCAP_KEY=your-api-key
```

### Running Locally

#### Option 1: Manual Execution

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
# Backend runs on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Django Admin: http://localhost:8000/admin

#### Option 2: Using Docker (Recommended)

```bash
# Build and run containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

**Docker Configuration** (`docker-compose.yml`):
```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: portfolio_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/portfolio_db
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Testing

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test

# Run with coverage
python manage.py test --with-coverage
npm test -- --coverage
```

## 📦 Deployment

### AWS Deployment Architecture

The application is deployed on AWS with the following components:

```
Internet
   │
   ▼
┌──────────────────┐
│  Load Balancer   │ (Optional - for high availability)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   EC2 Instance   │
│  ┌────────────┐  │
│  │   Docker   │  │
│  │ Container  │  │
│  │ React+     │  │
│  │ Django     │  │
│  └────────────┘  │
└────────┬─────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌──────────────┐  ┌──────────────┐
│     RDS      │  │ API Gateway  │
│ PostgreSQL   │  │      +       │
└──────────────┘  │   Lambda     │
                  │  (Tax API)   │
                  └──────────────┘
```

### Deployment Steps

#### 1. Prepare AWS Resources

**Create RDS Database:**
```bash
aws rds create-db-instance \
    --db-instance-identifier portfolio-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password your-password \
    --allocated-storage 20
```

**Create EC2 Instance:**
```bash
aws ec2 run-instances \
    --image-id ami-xxxxxxxxx \
    --instance-type t3.micro \
    --key-name your-key-pair \
    --security-groups portfolio-sg
```

#### 2. Build and Push Docker Image

```bash
# Build Docker image
docker build -t portfolio-app:latest .

# Tag for ECR (if using AWS ECR)
docker tag portfolio-app:latest \
    your-account-id.dkr.ecr.region.amazonaws.com/portfolio-app:latest

# Push to ECR
docker push your-account-id.dkr.ecr.region.amazonaws.com/portfolio-app:latest
```

#### 3. Deploy to EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Pull Docker image
docker pull your-account-id.dkr.ecr.region.amazonaws.com/portfolio-app:latest

# Run container
docker run -d \
    -p 80:3000 \
    -e DATABASE_URL=your-rds-endpoint \
    -e SECRET_KEY=your-secret \
    --name portfolio-app \
    your-account-id.dkr.ecr.region.amazonaws.com/portfolio-app:latest
```

#### 4. Deploy Lambda Function (Tax API)

```bash
# Package Lambda function
cd lambda/tax-calculator
zip -r function.zip .

# Deploy to AWS Lambda
aws lambda create-function \
    --function-name tax-calculator \
    --runtime python3.8 \
    --role arn:aws:iam::account-id:role/lambda-role \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://function.zip
```

#### 5. Configure API Gateway

```bash
# Create API
aws apigateway create-rest-api --name portfolio-api

# Create resource and method
# Configure Lambda integration
# Deploy to stage
```

### Environment Variables

**Production `.env` file:**
```bash
# Django Settings
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

# Database
DATABASE_URL=postgresql://username:password@rds-endpoint:5432/dbname

# API Keys
ALPHA_VANTAGE_API_KEY=your-production-key
COINMARKETCAP_API_KEY=your-production-key

# Custom APIs
TAX_API_URL=https://api-gateway-url/prod/tax
CURRENCY_API_URL=https://currency-api-url
EMAIL_API_URL=https://email-api-url
EMAIL_API_TOKEN=your-bearer-token

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The project implements automated CI/CD using GitHub Actions:

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.8'
      
      - name: Install dependencies
        run: |
          pip install flake8 pylint
          pip install -r backend/requirements.txt
      
      - name: Lint with flake8
        run: |
          flake8 backend/ --count --select=E9,F63,F7,F82 --show-source --statistics
      
      - name: Lint with pylint
        run: |
          pylint backend/ --fail-under=7.0

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.8'
      
      - name: Install dependencies
        run: |
          pip install -r backend/requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          python manage.py test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      
      - name: Build Docker image
        run: |
          docker build -t portfolio-app:${{ github.sha }} .
      
      - name: Save Docker image
        run: |
          docker save portfolio-app:${{ github.sha }} -o portfolio-app.tar
      
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: docker-image
          path: portfolio-app.tar

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v2
        with:
          name: docker-image
      
      - name: Load Docker image
        run: docker load -i portfolio-app.tar
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Tag and push to ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: portfolio-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker tag portfolio-app:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag portfolio-app:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull ${{ steps.login-ecr.outputs.registry }}/portfolio-app:latest
            docker stop portfolio-app || true
            docker rm portfolio-app || true
            docker run -d \
              -p 80:3000 \
              --name portfolio-app \
              --env-file /home/ec2-user/.env \
              ${{ steps.login-ecr.outputs.registry }}/portfolio-app:latest
      
      - name: Health check
        run: |
          sleep 30
          curl -f http://${{ secrets.EC2_HOST }}/health || exit 1
```

### Pipeline Stages

1. **Lint**: Code quality checks with flake8 and pylint
2. **Test**: Run unit and integration tests
3. **Build**: Create Docker image and save as artifact
4. **Deploy**: Push to ECR and deploy to EC2 instance
5. **Health Check**: Verify deployment success

### Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
EC2_HOST
EC2_SSH_KEY
DOCKER_REGISTRY (optional)
```

## 📸 Screenshots

### Dashboard
![Portfolio Dashboard showing total portfolio value of €792,000.00 and 3 cryptocurrency holdings](screenshots/dashboard.png)

*Main dashboard displaying portfolio overview with total value and asset summary*

### Price Alerts
![Price alert email notification interface](screenshots/price-alert.png)

*Email notification triggered when price alert conditions are met*

### Financial News
![Financial news feed showing market updates](screenshots/financial-news.png)

*Real-time financial news integration via Alpha Vantage API*

### Database Models
![Django database models showing relationships](screenshots/database-models.png)

*Database schema showing User, StockTransaction, CryptoTransaction, and PriceAlert models*

## 🔮 Future Enhancements

### Planned Features

1. **Advanced Analytics**
   - Historical performance charts
   - ROI calculations
   - Portfolio diversification analysis
   - Risk assessment metrics

2. **Real-Time Price Notifications**
   - WebSocket integration for instant updates
   - Push notifications for mobile
   - Customizable notification channels

3. **Enhanced Tax Features**
   - Multi-jurisdiction tax calculations
   - Automated tax report generation
   - Export to tax software formats

4. **Social Features**
   - Share portfolio performance (anonymously)
   - Community investment insights
   - Follow successful investors

5. **Mobile Application**
   - Native iOS and Android apps
   - Offline mode with sync
   - Biometric authentication

6. **Advanced Trading Features**
   - Paper trading / simulation mode
   - Trading strategy backtesting
   - Automated trading rules

### Technical Improvements

1. **Microservices Decoupling**
   - Deploy React and Django separately
   - Independent scaling
   - Better fault isolation

2. **Caching Layer**
   - Redis for API response caching
   - Reduce third-party API calls
   - Improve response times

3. **Enhanced Security**
   - Multi-factor authentication (MFA)
   - API rate limiting
   - Advanced threat detection

4. **Performance Optimization**
   - CDN for static assets
   - Database query optimization
   - Lazy loading for UI components

## 📚 Documentation

### Available Resources

- **[Project Report](https://drive.google.com/file/d/1otEltqxjy81nIsm3MHuob09_DdSgd7VT/view?usp=drive_link)**: Complete academic documentation (Word Count: 1822)
- **[Tax API Documentation](https://github.com/Ughanze23/tax-calculation-api)**: Custom tax calculation API
- **[Live Application](http://ec2-deployment-url)**: Deployed application on AWS EC2
- **API Documentation**: Available at `/api/docs` endpoint
- **Architecture Diagrams**: Included in project report

### Key Documentation Sections

1. **Introduction**: Problem statement and objectives
2. **Requirements**: Functional and non-functional specifications
3. **Design & Architecture**: Cloud architecture and design patterns
4. **Implementation**: Technology choices and integration details
5. **CI/CD**: Deployment pipeline and automation
6. **Conclusion**: Findings, challenges, and learnings

### References

1. M. P. Arunachalam and S. Manager, "A COMPREHENSIVE APPROACH TO FINANCIAL PORTFOLIO MANAGEMENT WITH CLOUD INFRASTRUCTURE"
2. "Why Cloud Computing is Crucial for Modern Finance" - The Schlott Company
3. S. Li et al., "Understanding and addressing quality attributes of microservices architecture"
4. Sam Newman, "Building Microservices"
5. AWS RDS Documentation
6. Alpha Vantage API Documentation
7. CoinMarketCap API Documentation

## 🎓 Academic Context

### Course Information
- **Module**: Scalable Cloud Programming
- **Programme**: MSc in Cloud Computing
- **Institution**: National College of Ireland
- **Academic Year**: 2024/2025
- **Lecturer**: Vikas Sahni
- **Submission Date**: 02/04/2024

### AI Usage Acknowledgment

This project used Claude.ai (LLM) for:
- File import assistance
- API integration implementation
- Code troubleshooting and debugging

All AI usage has been properly documented in accordance with academic integrity policies. See AI Acknowledgement Supplement in project report for detailed usage.

### Evaluation Criteria

The project is evaluated on:
- ✅ Implementation of microservices architecture
- ✅ Integration with multiple third-party services
- ✅ Cloud deployment and scalability
- ✅ Security and data integrity
- ✅ Code quality and documentation
- ✅ CI/CD pipeline implementation
- ✅ User experience and interface design

## 🤝 Contributing

While this is an academic project, feedback and suggestions are welcome:

1. **Report Issues**: Use GitHub Issues for bug reports
2. **Suggest Features**: Open a discussion for feature requests
3. **Code Review**: Provide constructive feedback on code quality
4. **Documentation**: Help improve documentation clarity

## 📄 License

This project is submitted as part of academic coursework for the MSc in Cloud Computing program at National College of Ireland. All rights reserved by the author for academic purposes.

## 👨‍💻 Author

**Ikenna Ughanze Polycarp**
- **Student ID**: 23384069
- **Email**: x23384069@student.ncirl.ie
- **GitHub**: [@Ughanze23](https://github.com/Ughanze23)
- **Institution**: National College of Ireland
- **Programme**: MSc in Cloud Computing

## 🙏 Acknowledgments

- **Vikas Sahni**: Course lecturer for guidance and feedback
- **Classmates**: 
  - x23158131 for Currency Converter API
  - x23122498 for Email Notification API
- **National College of Ireland**: For providing educational resources
- **AWS**: For educational credits and comprehensive documentation
- **Alpha Vantage & CoinMarketCap**: For providing free-tier API access
- **Open-Source Community**: For excellent tools and libraries

## 📞 Support

For questions or issues:
- **GitHub Issues**: [Report bugs or request features](https://github.com/Ughanze23/MSC-Cloud-SCP-PROJECT/issues)
- **Email**: x23384069@student.ncirl.ie
- **Documentation**: Refer to project report and inline documentation

---

**Project Highlights:**
- ✅ Microservices architecture with 5+ API integrations
- ✅ Full-stack React + Django application
- ✅ AWS deployment (EC2, RDS, Lambda, API Gateway)
- ✅ Custom tax calculation API
- ✅ Real-time price alerts via email
- ✅ Multi-currency portfolio valuation
- ✅ Automated CI/CD pipeline with GitHub Actions
- ✅ Comprehensive documentation and testing
- ✅ >99% uptime target with auto-scaling
- ✅ Production-ready code quality

**Technologies:**
- Frontend: React.js (71.2%)
- Backend: Python/Django (25.1%)
- Database: PostgreSQL on AWS RDS
- Cloud: AWS (EC2, Lambda, API Gateway, RDS)
- DevOps: Docker, GitHub Actions
- APIs: Alpha Vantage, CoinMarketCap, Custom APIs

This project demonstrates enterprise-level cloud engineering practices suitable for production financial applications, showcasing expertise in full-stack development, microservices architecture, and cloud-native deployment.

# Task Manager Application

A full-stack task management application with user authentication, real-time task tracking, and a modern responsive UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Security](#security)
- [Contributing](#contributing)

##  Features

### Authentication
- User registration with email validation
- Secure login with JWT authentication
- Password hashing using bcrypt
- Forgot password functionality with password reset
- Token-based authorization

### Task Management
- Create, read, update, and delete tasks
- Task filtering and sorting
- User-specific task management
- Real-time task status updates

### User Interface
- Clean and modern dark-themed UI
- Responsive design for all devices
- Form validation and error handling
- User-friendly dashboard

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Styling**: CSS (Dark theme)
- **Package Manager**: npm

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLAlchemy ORM
- **Authentication**: OAuth2 with JWT
- **Password Security**: Passlib with bcrypt
- **CORS**: Enabled for frontend integration
- **Server**: Uvicorn

##  Project Structure

```
Task manager/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── forgotPassword.jsx
│   │   │   └── dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   └── task.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── security/
│   │   │   ├── authentication.py
│   │   │   ├── config.py
│   │   │   ├── hashing.py
│   │   │   └── token.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .venv/
│
└── README.md
```

##  Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv .venv
```

3. Activate the virtual environment:

**Windows:**
```bash
.venv\Scripts\activate
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

##  Configuration

### Backend Configuration

The backend configuration can be found in `backend/src/security/config.py`. Key settings include:

- **API Title**: Task Manager API
- **CORS Origins**: `http://localhost:5173`, `http://127.0.0.1:5173`
- **Database**: SQLite (default)

### Frontend Configuration

The API client is configured in `frontend/src/services/api.js`:

```javascript
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
```

## ▶️ Running the Application

### Start the Backend Server

From the `backend` directory with virtual environment activated:

```bash
uvicorn src.main:app --reload --port 8000
```

The API will be available at: `http://127.0.0.1:8000`

### Start the Frontend Server

From the `frontend` directory:

```bash
npm run dev
```

The application will be available at: `http://localhost:5173` or `http://127.0.0.1:5173`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "message": "User registered successfully"
}
```

#### Login
```
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=email@example.com&password=password

Response: 200 OK
{
  "access_token": "string",
  "token_type": "bearer"
}
```

#### Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "string"
}

Response: 200 OK
{
  "message": "Password reset email would be sent"
}
```

#### Reset Password
```
POST /auth/reset-password
Content-Type: application/json

{
  "email": "string",
  "new_password": "string"
}

Response: 200 OK
{
  "message": "Password reset successfully"
}
```

### Task Endpoints

Detailed task endpoints documentation should be added as per your implementation.

##  Usage Guide

### User Registration
1. Navigate to the application home page
2. Click "Create Account" or go to `/register`
3. Fill in the registration form with username, email, and password
4. Click "Register"
5. You will be redirected to the login page after successful registration

### User Login
1. Go to the login page (`/login`)
2. Enter your email and password
3. Click "Login"
4. Upon successful authentication, you will be redirected to the dashboard
5. Your authentication token will be stored in `localStorage`

### Forgotten Password
1. On the login page, click "Forgot Password?"
2. Enter your registered email address
3. Follow the password reset process
4. Set your new password (minimum 6 characters)
5. You will be redirected to login with your new password

### Task Management
1. After logging in, access the dashboard
2. Create new tasks with descriptions
3. Mark tasks as complete/incomplete
4. Edit or delete existing tasks
5. View all your tasks in real-time

##  Security

### Password Security
- Passwords are hashed using bcrypt before storage
- Never stored or transmitted in plain text
- Password validation on all authentication endpoints

### Authentication
- JWT (JSON Web Tokens) for stateless authentication
- Access tokens stored securely in browser localStorage
- CORS protection enabled

### Best Practices
- Always use HTTPS in production
- Set environment variables for sensitive configuration
- Regularly update dependencies
- Implement rate limiting on authentication endpoints

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is open source and available under the MIT License.

##  Support

For support, questions, or issues, please create an issue in the repository or contact the development team.

---

**Last Updated**: May 2026
**Version**: 1.0.0

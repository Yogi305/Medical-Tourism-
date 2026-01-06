# VV Medical Tourism Platform

A comprehensive medical tourism platform connecting patients with world-class treatments in India. This project features a modern React frontend and a robust FastAPI backend.

## 🚀 Tech Stack

### Frontend
- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite (Async)
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Key Libraries**:
  - `aiosqlite`: Asynchronous SQLite support
  - `fastapi-mail`: Email notification handling
  - `slowapi`: Rate limiting for API security
  - `pydantic-settings`: Configuration management

## 🗄️ Database & Backend Architecture

The backend is built with **FastAPI** and uses **SQLModel** for defining the database schema and interacting with the **SQLite** database asynchronously.

### Database Schema (`PatientIntake`)
The core model `PatientIntake` captures comprehensive patient details:
- **Personal Info**: Name, age, gender, contact details (email, phone, address).
- **Medical Concern**: Primary condition, duration, diagnosis details, symptoms, and medical reports.
- **Treatment History**: Previous treatments, medications, and allergies.
- **Travel Configuration**: Travel dates, assistance needs, and additional notes.
- **File Uploads**: Stores paths to uploaded medical documents.

### Key Features
- **Async Database Operations**: Fully asynchronous DB interactions using `aiosqlite` for high performance.
- **Data Validation**: Strict validation using Pydantic models to ensure data integrity.
- **Security**: Implemented rate limiting to prevent abuse.
- **media Handling**: dedicated `uploads` directory for secure storage of patient documents.

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js & npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add necessary configuration (EMAIL_USERNAME, EMAIL_PASSWORD, etc.).
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.
   Interactive API docs: `http://localhost:8000/docs`.

### Frontend Setup
1. Navigate to the project root (if not already there):
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:5173` (or similar).

## 📄 License
[MIT License](LICENSE)

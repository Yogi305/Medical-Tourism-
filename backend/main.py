import os
from datetime import datetime
from typing import List
from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from contextlib import asynccontextmanager
import shutil
import json
import sys

# Add current directory to sys.path to fix imports when running from root
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Now we can import local modules
from database import init_db, get_session
from models import PatientIntake, PatientIntakeBase

# Setup upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow Netlify frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email Configuration
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
from dotenv import load_dotenv

load_dotenv()
print(f"DEBUG: Loaded MAIL_USERNAME: {os.getenv('MAIL_USERNAME')}")

class EmailSchema(BaseModel):
    email: List[EmailStr]

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "user@example.com"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "password"),
    MAIL_FROM = os.getenv("MAIL_FROM", "noreply@example.com"),
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_FROM_NAME = "VV Medical Tourism", # Custom Sender Name
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

@app.post("/api/intake", status_code=status.HTTP_201_CREATED)
async def create_patient_intake(
    background_tasks: BackgroundTasks,
    data: str = Form(...), 
    files: List[UploadFile] = File(None),
    session: AsyncSession = Depends(get_session)
):
    try:
        # 1. Parse JSON data manually
        import json
        json_data = json.loads(data)
        patient_data = PatientIntakeBase(**json_data) 
        
        # 2. Validate Files
        saved_file_paths = []
        if files:
            for file in files:
                if file.content_type not in ["application/pdf", "image/jpeg", "image/png"]:
                     # Skip invalid files or raise error
                     continue
                
                file_path = os.path.join(UPLOAD_DIR, f"{datetime.now().timestamp()}_{file.filename}")
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                saved_file_paths.append(file_path)

        # 3. Save to DB
        db_intake = PatientIntake.from_orm(patient_data)
        db_intake.file_paths = ",".join(saved_file_paths) if saved_file_paths else None
        
        session.add(db_intake)
        await session.commit()
        await session.refresh(db_intake)

        # 4. Send Email (Background Task)
        
        # Helper to format date
        def format_date_str(date_str):
            if not date_str:
                return "Not specified"
            try:
                # Handle ISO format with potential Z
                dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                return dt.strftime("%B %d, %Y") # e.g. January 01, 2026
            except ValueError:
                return date_str

        formatted_from = format_date_str(patient_data.travel_date_from)
        formatted_to = format_date_str(patient_data.travel_date_to)

        # Prepare email body
        email_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #2c7a7b; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">Enquiry Form Received</h2>
                    </div>
                    <div style="padding: 20px;">
                        <h3 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 10px;">Personal Information</h3>
                        <p><strong>Name:</strong> {patient_data.full_name}</p>
                        <p><strong>Age:</strong> {patient_data.age}</p>
                        <p><strong>Gender:</strong> {patient_data.gender}</p>
                        <p><strong>Country:</strong> {patient_data.country}</p>
                        <p><strong>City:</strong> {patient_data.city}</p>
                        <p><strong>Phone:</strong> {patient_data.phone}</p>
                        <p><strong>Email:</strong> <a href="mailto:{patient_data.email}">{patient_data.email}</a></p>

                        <h3 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 10px; margin-top: 25px;">Medical Concern</h3>
                        <p><strong>Primary Condition:</strong><br>{patient_data.primary_condition}</p>
                        <p><strong>Duration:</strong> {patient_data.condition_duration}</p>
                        <p><strong>Diagnosed by Doctor:</strong> {patient_data.diagnosed_by_doctor}</p>
                        <p><strong>Diagnosis Name:</strong> {patient_data.diagnosis_name or 'N/A'}</p>
                        <p><strong>Current Symptoms:</strong><br>{patient_data.current_symptoms}</p>
                        <p><strong>Has Medical Reports:</strong> {patient_data.has_medical_reports}</p>

                        <h3 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 10px; margin-top: 25px;">Treatment History</h3>
                        <p><strong>Previous Treatment:</strong> {patient_data.previous_treatment}</p>
                        <p><strong>Treatment Details:</strong><br>{patient_data.previous_treatment_details or 'N/A'}</p>
                        <p><strong>Current Medications:</strong><br>{patient_data.current_medications or 'N/A'}</p>
                        <p><strong>Allergies:</strong> {patient_data.known_allergies or 'N/A'}</p>

                        <h3 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 10px; margin-top: 25px;">Travel Preferences</h3>
                        <p><strong>Dates:</strong> {formatted_from} to {formatted_to}</p>
                        <p><strong>Assistance Needed:</strong> {patient_data.travel_assistance}</p>
                        <p><strong>Additional Notes:</strong><br>{patient_data.additional_notes or 'N/A'}</p>
                        
                        <p style="margin-top: 30px; font-size: 0.9em; color: #666; font-style: italic;">
                            Note: Any uploaded documents are attached to this email.
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        message = MessageSchema(
            subject=f"Enquiry Form: {patient_data.full_name} ({patient_data.country})",
            recipients=[os.getenv("MAIL_FROM")], 
            body=email_body,
            subtype=MessageType.html,
            attachments=saved_file_paths if saved_file_paths else []
        )
        
        # Wrapper to handle email errors gracefully
        async def send_email_safe(message, conf):
            try:
                fm = FastMail(conf)
                await fm.send_message(message)
                print("Email sent successfully")
            except Exception as e:
                print(f"FAILED TO SEND EMAIL: {e}")
                # We do NOT raise the exception here, so the server keeps running

        background_tasks.add_task(send_email_safe, message, conf)

        return {"message": "Intake submitted successfully", "id": db_intake.id}

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except Exception as e:
        print(f"Error: {e}") 
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Patient Intake API is running"}

from typing import Optional
from sqlmodel import SQLModel, Field
from pydantic import EmailStr, validator
from datetime import datetime

class PatientIntakeBase(SQLModel):
    full_name: str = Field(min_length=2, max_length=100)
    age: int = Field(ge=1, le=120)
    gender: str
    country: str = Field(min_length=2)
    city: str = Field(min_length=2)
    phone: str = Field(min_length=8)
    email: EmailStr
    
    # Medical Concern
    primary_condition: str = Field(min_length=10)
    condition_duration: str
    diagnosed_by_doctor: str
    diagnosis_name: Optional[str] = None
    current_symptoms: str = Field(min_length=10)
    has_medical_reports: str
    
    # Treatment History
    previous_treatment: str
    previous_treatment_details: Optional[str] = None
    current_medications: Optional[str] = None
    known_allergies: Optional[str] = None
    
    # Travel Config
    travel_assistance: str
    additional_notes: Optional[str] = None
    
    # Travel Dates (as ISO strings for simplicity in transport)
    travel_date_from: Optional[str] = None
    travel_date_to: Optional[str] = None

class PatientIntake(PatientIntakeBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    file_paths: Optional[str] = Field(default=None, description="Comma separated paths to uploaded files")

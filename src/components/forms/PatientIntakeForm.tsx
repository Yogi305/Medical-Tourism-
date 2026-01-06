import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  User,
  Stethoscope,
  ClipboardList,
  Plane,
  Upload,
  CalendarIcon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2
} from "lucide-react";

const formSchema = z.object({
  // Section 1: Personal Information
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  age: z.number().min(1, "Age is required").max(120),
  gender: z.string().min(1, "Please select your gender"),
  country: z.string().min(2, "Country is required").max(100),
  city: z.string().min(2, "City is required").max(100),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  email: z.string().email("Please enter a valid email address"),

  // Section 2: Medical Concern
  primaryCondition: z.string().min(10, "Please describe your condition in detail"),
  conditionDuration: z.string().min(1, "Please select how long you've had this condition"),
  diagnosedByDoctor: z.string().min(1, "Please select an option"),
  diagnosisName: z.string().optional(),
  currentSymptoms: z.string().min(10, "Please describe your current symptoms"),
  hasMedicalReports: z.string().min(1, "Please select an option"),

  // Section 3: Treatment History
  previousTreatment: z.string().min(1, "Please select an option"),
  previousTreatmentDetails: z.string().optional(),
  currentMedications: z.string().optional(),
  knownAllergies: z.string().optional(),

  // Section 4: Travel Preferences
  travelAssistance: z.string().min(1, "Please select an option"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const stepsFields: Record<number, (keyof FormData)[]> = {
  1: ["fullName", "age", "gender", "country", "city", "phone", "email"],
  2: ["primaryCondition", "conditionDuration", "diagnosedByDoctor", "diagnosisName", "currentSymptoms", "hasMedicalReports"],
  3: ["previousTreatment", "previousTreatmentDetails", "currentMedications", "knownAllergies"],
  4: ["travelAssistance", "additionalNotes"],
};

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Medical Concern", icon: Stethoscope },
  { id: 3, title: "Treatment History", icon: ClipboardList },
  { id: 4, title: "Travel Preferences", icon: Plane },
];

const PatientIntakeForm = () => {
  const formTopRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [travelDateFrom, setTravelDateFrom] = useState<Date>();
  const [travelDateTo, setTravelDateTo] = useState<Date>();
  const [isFromDateOpen, setIsFromDateOpen] = useState(false);
  const [isToDateOpen, setIsToDateOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: undefined,
      gender: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      primaryCondition: "",
      conditionDuration: "",
      diagnosedByDoctor: "",
      diagnosisName: "",
      currentSymptoms: "",
      hasMedicalReports: "",
      previousTreatment: "",
      previousTreatmentDetails: "",
      currentMedications: "",
      knownAllergies: "",
      travelAssistance: "",
      additionalNotes: "",
    },
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = form;

  const diagnosedByDoctor = watch("diagnosedByDoctor");
  const hasMedicalReports = watch("hasMedicalReports");
  const previousTreatment = watch("previousTreatment");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "image/jpeg" ||
          file.type === "image/png"
      );
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all form fields (JSON stringify the data object for Pydantic parsing)
      formData.append("data", JSON.stringify({
        ...data,
        travel_date_from: travelDateFrom?.toISOString(),
        travel_date_to: travelDateTo?.toISOString(),
        // Map frontend camelCase to backend snake_case if strictly needed, 
        // but Pydantic aliases or matching names is better. 
        // Our models.py uses snake_case, so we should map here or update validation.
        // Let's map manually to be safe since we defined models in snake_case.
        full_name: data.fullName,
        primary_condition: data.primaryCondition,
        condition_duration: data.conditionDuration,
        diagnosed_by_doctor: data.diagnosedByDoctor,
        diagnosis_name: data.diagnosisName,
        current_symptoms: data.currentSymptoms,
        has_medical_reports: data.hasMedicalReports,
        previous_treatment: data.previousTreatment,
        previous_treatment_details: data.previousTreatmentDetails,
        current_medications: data.currentMedications,
        known_allergies: data.knownAllergies,
        travel_assistance: data.travelAssistance,
        additional_notes: data.additionalNotes,
        // basic fields
        age: data.age,
        gender: data.gender,
        country: data.country,
        city: data.city,
        phone: data.phone,
        email: data.email,
      }));

      // Append files
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/intake", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Submission failed");
      }

      const result = await response.json();
      console.log("Server Response:", result);

      setIsSubmitting(false);
      setIsSubmitted(true);

      toast({
        title: "Enquiry Submitted Successfully!",
        description: "Our medical team will review your case and contact you within 24-48 hours.",
      });

    } catch (error) {
      console.error("Submission Error:", error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  const nextStep = async () => {
    const fields = stepsFields[currentStep];
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      // Scroll to the top of the form container with a slight offset
      if (formTopRef.current) {
        const yOffset = -100; // Offset to account for fixed headers if any
        const y = formTopRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 animate-scale-in">
        <div className="w-20 h-20 bg-medical-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-medical-success" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
          Thank You for Your Enquiry!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Our medical team has received your information and will review your case.
          Expect a detailed response with treatment options and cost estimates within 24-48 hours.
        </p>
        <div className="bg-secondary/50 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong>What happens next?</strong><br />
            1. Our specialists review your medical reports<br />
            2. We suggest suitable doctors and hospitals<br />
            3. You receive a detailed treatment plan with costs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={formTopRef} className="max-w-3xl mx-auto scroll-mt-24">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    currentStep === step.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                      : currentStep > step.id
                        ? "bg-medical-success text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium hidden sm:block",
                    currentStep === step.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-full h-1 mx-2 rounded-full transition-all duration-300 hidden sm:block",
                    currentStep > step.id ? "bg-medical-success" : "bg-secondary"
                  )}
                  style={{ width: "60px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("Form Validation Errors:", errors);
        toast({
          variant: "destructive",
          title: "Please complete all required fields",
          description: "Check previous steps for missing information.",
        });
      })} className="space-y-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-semibold text-foreground">Personal Information</h3>
              <p className="text-sm text-muted-foreground mt-1">Tell us about yourself</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  {...register("age", { valueAsNumber: true })}
                  className={errors.age ? "border-destructive" : ""}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => setValue("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  placeholder="Your country"
                  {...register("country")}
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  {...register("city")}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (WhatsApp preferred) *</Label>
                <Input
                  id="phone"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medical Concern */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-semibold text-foreground">Medical Concern</h3>
              <p className="text-sm text-muted-foreground mt-1">Tell us about your medical condition</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryCondition">Primary Ailment / Condition *</Label>
                <Textarea
                  id="primaryCondition"
                  placeholder="Please describe your primary medical condition or ailment in detail..."
                  rows={4}
                  {...register("primaryCondition")}
                  className={errors.primaryCondition ? "border-destructive" : ""}
                />
                {errors.primaryCondition && (
                  <p className="text-sm text-destructive">{errors.primaryCondition.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>How long have you had this condition? *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("conditionDuration", value)}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { value: "less-than-1-month", label: "Less than 1 month" },
                    { value: "1-6-months", label: "1–6 months" },
                    { value: "6-12-months", label: "6–12 months" },
                    { value: "more-than-1-year", label: "More than 1 year" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.conditionDuration && (
                  <p className="text-sm text-destructive">{errors.conditionDuration.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Have you been diagnosed by a doctor? *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("diagnosedByDoctor", value)}
                  className="flex gap-4"
                >
                  {[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "not-sure", label: "Not Sure" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value={option.value} id={`diagnosed-${option.value}`} />
                      <Label htmlFor={`diagnosed-${option.value}`} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {diagnosedByDoctor === "yes" && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="diagnosisName">Diagnosis Name</Label>
                  <Input
                    id="diagnosisName"
                    placeholder="Enter the diagnosis name"
                    {...register("diagnosisName")}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentSymptoms">Describe Current Symptoms *</Label>
                <Textarea
                  id="currentSymptoms"
                  placeholder="Please describe your current symptoms in detail..."
                  rows={4}
                  {...register("currentSymptoms")}
                  className={errors.currentSymptoms ? "border-destructive" : ""}
                />
                {errors.currentSymptoms && (
                  <p className="text-sm text-destructive">{errors.currentSymptoms.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Do you have medical reports? *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("hasMedicalReports", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="yes" id="reports-yes" />
                    <Label htmlFor="reports-yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="no" id="reports-no" />
                    <Label htmlFor="reports-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {hasMedicalReports === "yes" && (
                <div className="space-y-3 animate-fade-in">
                  <Label>Upload Medical Documents (PDF, JPG, PNG)</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG or PNG (max 10MB each)
                      </p>
                    </label>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <span className="text-sm truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Treatment History */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-semibold text-foreground">Treatment History</h3>
              <p className="text-sm text-muted-foreground mt-1">Tell us about any previous treatments</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Have you taken treatment before for this condition? *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("previousTreatment", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="yes" id="treatment-yes" />
                    <Label htmlFor="treatment-yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="no" id="treatment-no" />
                    <Label htmlFor="treatment-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {previousTreatment === "yes" && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="previousTreatmentDetails">Previous Treatment Details</Label>
                  <Textarea
                    id="previousTreatmentDetails"
                    placeholder="Please describe the treatments you've had before..."
                    rows={4}
                    {...register("previousTreatmentDetails")}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications (if any)</Label>
                <Textarea
                  id="currentMedications"
                  placeholder="List any medications you are currently taking..."
                  rows={3}
                  {...register("currentMedications")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="knownAllergies">Known Allergies (if any)</Label>
                <Input
                  id="knownAllergies"
                  placeholder="E.g., Penicillin, Latex, etc."
                  {...register("knownAllergies")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Travel Preferences */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-semibold text-foreground">Travel Preferences</h3>
              <p className="text-sm text-muted-foreground mt-1">Help us plan your visit to Chennai</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Preferred Travel Date Range to Chennai</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">From Date</Label>
                    <Popover open={isFromDateOpen} onOpenChange={setIsFromDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !travelDateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {travelDateFrom ? format(travelDateFrom, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={travelDateFrom}
                          onSelect={(date) => {
                            setTravelDateFrom(date);
                            setIsFromDateOpen(false);
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">To Date</Label>
                    <Popover open={isToDateOpen} onOpenChange={setIsToDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !travelDateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {travelDateTo ? format(travelDateTo, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={travelDateTo}
                          onSelect={(date) => {
                            setTravelDateTo(date);
                            setIsToDateOpen(false);
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Do you need travel assistance? *</Label>
                <p className="text-sm text-muted-foreground">
                  (Visa support, flight booking, airport pickup, accommodation)
                </p>
                <RadioGroup
                  onValueChange={(value) => setValue("travelAssistance", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="yes" id="assist-yes" />
                    <Label htmlFor="assist-yes" className="cursor-pointer">Yes, I need assistance</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                    <RadioGroupItem value="no" id="assist-no" />
                    <Label htmlFor="assist-no" className="cursor-pointer">No, I'll manage myself</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any other information you'd like to share..."
                  rows={4}
                  {...register("additionalNotes")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 pt-6 border-t border-border">
          {Object.keys(errors).length > 0 && (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
              <p className="font-semibold">Validation Errors:</p>
              <ul className="list-disc pl-5">
                {Object.entries(errors).map(([key, error]) => (
                  <li key={key}>
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>: {error?.message?.toString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button type="button" variant="cta" onClick={nextStep}>
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" variant="hero" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Free Medical Review
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientIntakeForm;

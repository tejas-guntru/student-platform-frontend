"use client";

import { useState, useRef } from "react";
import { CandidateData } from "../../../types/hiring";
import { useCandidateProfile } from "@/context/CandidateProfileContext";
import {
  Upload,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  Link,
  Plus,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Sparkles,
  Building,
  Shield,
  Target,
  Clock,
} from "lucide-react";
import Toast from "../Toast";

export default function CandidateForm() {
  const { profile, saveProfile } = useCandidateProfile();

  const [formData, setFormData] = useState<CandidateData>({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    location: profile.location || "",
    targetedJob: profile.targetedJob || "",
    experience: profile.experience || 0,
    linkedinProfile: profile.linkedinProfile || "",
    resume: null,
    graduationYear: profile.graduationYear || new Date().getFullYear(),
    degree: profile.degree || "",
    university: profile.university || "",
    skills: profile.skills || [],
    expectedSalary: profile.expectedSalary || "",
    availability: profile.availability || "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Save profile data to context/localStorage
    saveProfile(formData);

    // Handle form submission logic here
    setToast({
      message:
        "Professional profile created successfully! You can now apply for positions with this information.",
      type: "success",
    });
  };

  const nextStep = () => {
    // enforce at least one skill
    if (currentStep === 3 && formData.skills.length === 0) {
      setToast({
        message:
          "Please add at least one professional skill before proceeding.",
        type: "error",
      });
      return;
    }
    // validate visible fields
    if (formRef.current?.checkValidity()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      formRef.current?.reportValidity();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: "Personal Information", icon: User, color: "#093697" },
    {
      number: 2,
      title: "Professional Background",
      icon: Briefcase,
      color: "#093697",
    },
    {
      number: 3,
      title: "Education & Expertise",
      icon: GraduationCap,
      color: "#093697",
    },
    { number: 4, title: "Career Preferences", icon: Target, color: "#093697" },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto p-8">
        {/* Professional Progress Tracker */}

        {/* Professional Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative overflow-hidden">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 mx-4 md:mx-8">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  backgroundColor: "#093697",
                }}
              ></div>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center relative bg-white flex-1 min-w-0"
                  style={{
                    paddingLeft: index === 0 ? "0" : "8px",
                    paddingRight: index === steps.length - 1 ? "0" : "8px",
                  }}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? "text-white border-green-600"
                        : isActive
                          ? "text-white border-blue-600"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                    style={{
                      backgroundColor: isCompleted
                        ? "#10b981"
                        : isActive
                          ? "#093697"
                          : "white",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <Icon className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </div>
                  <div
                    className={`mt-2 md:mt-3 text-center ${isActive ? "text-black" : "text-gray-600"}`}
                  >
                    <div className="text-xs md:text-sm font-semibold leading-tight">
                      {step.title}
                    </div>
                    <div className="text-xs mt-1 hidden md:block">
                      Step {step.number}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Provide your basic professional details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>All information is kept strictly confidential</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <User className="w-4 h-4" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <User className="w-4 h-4" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Mail className="w-4 h-4" />
                      Professional Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      placeholder="your.professional.email@company.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <Phone className="w-4 h-4" />
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <MapPin className="w-4 h-4" />
                        Current Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="City, State/Country"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <div className="p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black">
                        Professional Background
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Share your career objectives and experience
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Target className="w-4 h-4" />
                      Target Position/Role *
                    </label>
                    <input
                      type="text"
                      name="targetedJob"
                      value={formData.targetedJob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Calendar className="w-4 h-4" />
                      Professional Experience *
                    </label>
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select your experience level</option>
                      <option value={0}>Entry Level (0-1 years)</option>
                      <option value={2}>Junior (2-3 years)</option>
                      <option value={4}>Mid-Level (4-6 years)</option>
                      <option value={7}>Senior (7-10 years)</option>
                      <option value={11}>Lead/Principal (10+ years)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Link className="w-4 h-4" />
                      LinkedIn Profile *
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      required
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      placeholder="https://linkedin.com/in/your-professional-profile"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Upload className="w-4 h-4" />
                      Professional Resume/CV *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        {formData.resume ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">
                              {formData.resume.name}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 font-medium">
                              Upload your resume
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, or DOCX format (Max 5MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education & Expertise */}
            {currentStep === 3 && (
              <div className="p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black">
                        Education & Expertise
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Detail your academic background and professional skills
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <GraduationCap className="w-4 h-4" />
                        Highest Degree *
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Bachelor of Technology, Master of Science, MBA"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <Calendar className="w-4 h-4" />
                        Graduation Year *
                      </label>
                      <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        required
                      >
                        {Array.from(
                          { length: 25 },
                          (_, i) => new Date().getFullYear() - i,
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Building className="w-4 h-4" />
                      Institution/University *
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your university or institution name"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Sparkles className="w-4 h-4" />
                      Professional Skills *
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="Type a skill and click Add (e.g., React, Python, Project Management)"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-6 py-3 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-md flex items-center gap-2"
                        style={{ backgroundColor: "#093697" }}
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>

                    {formData.skills.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-sm font-semibold text-black mb-3">
                          Added Skills ({formData.skills.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-black"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-gray-500 hover:text-red-600 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.skills.length === 0 && (
                      <p className="text-sm text-gray-500">
                        Please add at least one professional skill
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Career Preferences */}
            {currentStep === 4 && (
              <div className="p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black">
                        Career Preferences
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Specify your salary expectations and availability
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <DollarSign className="w-4 h-4" />
                        Expected Annual Salary *
                      </label>
                      <select
                        name="expectedSalary"
                        required
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">
                          Select your expected salary range
                        </option>
                        <option value="0-5">0-5 LPA (Entry Level)</option>
                        <option value="5-10">5-10 LPA (Junior Level)</option>
                        <option value="10-15">10-15 LPA (Mid Level)</option>
                        <option value="15-25">15-25 LPA (Senior Level)</option>
                        <option value="25-40">25-40 LPA (Lead Level)</option>
                        <option value="40+">40+ LPA (Executive Level)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-black">
                        <Clock className="w-4 h-4" />
                        Availability to Join *
                      </label>
                      <select
                        name="availability"
                        required
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select your availability</option>
                        <option value="immediate">Immediate (0-15 days)</option>
                        <option value="1month">Within 1 Month</option>
                        <option value="2months">Within 2 Months</option>
                        <option value="3months">Within 3 Months</option>
                        <option value="flexible">Flexible Timeline</option>
                      </select>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <CheckCircle2
                        className="w-5 h-5"
                        style={{ color: "#093697" }}
                      />
                      Profile Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Full Name:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Email:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Target Role:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.targetedJob}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Experience:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.experience} years
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Education:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.degree} ({formData.graduationYear})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            University:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.university}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Skills:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.skills.length} skills
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Expected Salary:
                          </span>
                          <span className="font-semibold text-black">
                            {formData.expectedSalary} LPA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Navigation */}

            {/* Professional Navigation */}
            <div className="px-4 md:px-10 py-6 bg-gray-50 border-t border-gray-200">
              {/* Mobile Layout - Stacked */}
              <div className="flex flex-col gap-4 md:hidden">
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Step {currentStep} of {steps.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg font-bold transition-all duration-200 hover:shadow-md"
                      style={{ backgroundColor: "#093697" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.backgroundColor =
                          "#072a7a")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.backgroundColor =
                          "#093697")
                      }
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all duration-200 hover:shadow-md"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Submit Professional Profile
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      currentStep === 1
                        ? "text-gray-400 cursor-not-allowed bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Step
                  </button>
                </div>
              </div>

              {/* Desktop Layout - Horizontal */}
              <div className="hidden md:flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Step {currentStep} of {steps.length}
                  </span>
                </div>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3 text-white rounded-lg font-bold transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: "#093697" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.backgroundColor =
                        "#072a7a")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.backgroundColor =
                        "#093697")
                    }
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all duration-200 hover:shadow-md"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Submit Professional Profile
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

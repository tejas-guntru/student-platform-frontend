export interface InstructorProfileResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  organization: string | null;
  designation: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInstructorProfileRequest {
  fullName: string;
  phone: string | null;
  organization: string | null;
  designation: string | null;
  bio: string | null;
}
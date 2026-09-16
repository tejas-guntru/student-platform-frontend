export interface StudentProfile {
  id: string;
  email?: string;

  fullName: string | null;
  phone: string | null;

  degree: string | null;
  branch: string | null;

  graduationYear: number | null;

  city: string | null;

  preferredRole: string | null;

  bio: string | null;

  collegeId: string | null;
  collegeName: string | null;
}

export interface UpdateStudentProfileRequest {
  fullName: string;
  phone: string | null;

  degree: string | null;
  branch: string | null;

  graduationYear: number | null;

  city: string | null;

  preferredRole: string | null;

  bio: string | null;

  collegeId?: string | null;
}
export type SkillProficiency =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export type AssessmentAttemptStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "GRADED";

export type TaskSubmissionStatus =
  | "SUBMITTED"
  | "REVIEWED";

export type CourseStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type CodingPlatform =
  | "CODEFORCES"
  | "LEETCODE"
  | "CODECHEF";

export interface InstructorStudentSkill {
  skillId: string;
  skillName: string;
  proficiency: SkillProficiency;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorStudentProject {
  projectId: string;
  title: string;
  description: string | null;
  techStack: string | null;
  githubUrl: string | null;
  projectUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorStudentExperience {
  experienceId: string;
  companyName: string;
  roleTitle: string;
  employmentType: string | null;
  location: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorStudentCodingProfile {
  id: string;
  platform: CodingPlatform;
  username: string;
  profileUrl: string | null;

  verificationStatus:
    | "UNVERIFIED"
    | "VERIFIED";

  syncStatus:
    | "PENDING"
    | "SUCCESS"
    | "FAILED";

  currentRating: number | null;
  maxRating: number | null;
  problemsSolved: number | null;
  contestCount: number | null;

  platformRank: string | null;
  platformTitle: string | null;

  lastSyncedAt: string | null;
}

export interface InstructorStudentAssessment {
  assessmentId: string;
  title: string;
  totalMarks: number;

  attemptId: string;
  attemptStatus: AssessmentAttemptStatus;
  score: number | null;

  startedAt: string;
  submittedAt: string | null;
  gradedAt: string | null;
}

export interface InstructorStudentTask {
  taskId: string;
  title: string;
  dueAt: string | null;

  submissionId: string | null;
  submissionStatus: TaskSubmissionStatus | null;
  feedback: string | null;

  submittedAt: string | null;
  reviewedAt: string | null;
}

export interface InstructorStudentCourse {
  courseId: string;
  title: string;
  status: CourseStatus;

  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export interface InstructorStudentOverviewResponse {
  studentId: string;
  batchId: string;

  email: string;
  fullName: string;
  phone: string | null;

  degree: string | null;
  branch: string | null;
  graduationYear: number | null;

  city: string | null;
  preferredRole: string | null;
  bio: string | null;

  collegeId: string | null;
  collegeName: string | null;

  joinedAt: string;

  skills: InstructorStudentSkill[];
  projects: InstructorStudentProject[];

  experiences: InstructorStudentExperience[];
  codingProfiles: InstructorStudentCodingProfile[];
  assessments: InstructorStudentAssessment[];
  tasks: InstructorStudentTask[];
  courses: InstructorStudentCourse[];
}
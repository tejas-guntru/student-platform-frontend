export type CourseStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type LessonType =
  | "TEXT"
  | "VIDEO"
  | "DOCUMENT"
  | "LINK"
  | "MIXED";

export interface CreateCourseRequest {
  title: string;
  description: string | null;
}

export interface UpdateCourseRequest {
  title: string;
  description: string | null;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseModuleRequest {
  title: string;
  description: string | null;
}

export interface UpdateCourseModuleRequest {
  title: string;
  description: string | null;
}

export interface CourseModuleResponse {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReorderCourseModulesRequest {
  moduleIds: string[];
}

export interface CreateLessonRequest {
  title: string;
  content: string | null;
  lessonType: LessonType;
  resourceUrl: string | null;
}

export interface UpdateLessonRequest {
  title: string;
  content: string | null;
  lessonType: LessonType;
  resourceUrl: string | null;
}

export interface LessonResponse {
  id: string;
  moduleId: string;
  title: string;
  content: string | null;
  lessonType: LessonType;
  resourceUrl: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReorderLessonsRequest {
  lessonIds: string[];
}

export interface CourseAssignmentResponse {
  id: string;
  courseId: string;
  batchId: string;
  assignedAt: string;
}

export interface InstructorStudentProgressResponse {
  studentId: string;
  studentName: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export interface StudentCourseResponse {
  courseId: string;
  title: string;
  description: string | null;
  status: CourseStatus;
}

export interface StudentCourseModuleResponse {
  id: string;
  title: string;
  description: string | null;
  position: number;
}

export interface StudentLessonResponse {
  id: string;
  moduleId: string;
  title: string;
  content: string | null;
  lessonType: LessonType;
  resourceUrl: string | null;
  position: number;
  completed: boolean;
}

export interface StudentCourseProgressResponse {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

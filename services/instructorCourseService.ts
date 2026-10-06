import { api } from "@/lib/api";

import type {
  CourseAssignmentResponse,
  CourseModuleResponse,
  CourseResponse,
  CreateCourseModuleRequest,
  CreateCourseRequest,
  CreateLessonRequest,
  InstructorStudentProgressResponse,
  LessonResponse,
  ReorderCourseModulesRequest,
  ReorderLessonsRequest,
  UpdateCourseModuleRequest,
  UpdateCourseRequest,
  UpdateLessonRequest,
} from "@/types/course";

const BASE_URL = "/api/v1/instructor/courses";

export async function createCourse(
  request: CreateCourseRequest
): Promise<CourseResponse> {
  const response = await api.post<CourseResponse>(
    BASE_URL,
    request
  );

  return response.data;
}

export async function getMyCourses(): Promise<
  CourseResponse[]
> {
  const response =
    await api.get<CourseResponse[]>(BASE_URL);

  return response.data;
}

export async function getCourse(
  courseId: string
): Promise<CourseResponse> {
  const response =
    await api.get<CourseResponse>(
      `${BASE_URL}/${courseId}`
    );

  return response.data;
}

export async function updateCourse(
  courseId: string,
  request: UpdateCourseRequest
): Promise<CourseResponse> {
  const response =
    await api.put<CourseResponse>(
      `${BASE_URL}/${courseId}`,
      request
    );

  return response.data;
}

export async function publishCourse(
  courseId: string
): Promise<CourseResponse> {
  const response =
    await api.post<CourseResponse>(
      `${BASE_URL}/${courseId}/publish`
    );

  return response.data;
}

export async function archiveCourse(
  courseId: string
): Promise<CourseResponse> {
  const response =
    await api.post<CourseResponse>(
      `${BASE_URL}/${courseId}/archive`
    );

  return response.data;
}

// =========================================================
// MODULES
// =========================================================

export async function createCourseModule(
  courseId: string,
  request: CreateCourseModuleRequest
): Promise<CourseModuleResponse> {
  const response =
    await api.post<CourseModuleResponse>(
      `${BASE_URL}/${courseId}/modules`,
      request
    );

  return response.data;
}

export async function getCourseModules(
  courseId: string
): Promise<CourseModuleResponse[]> {
  const response =
    await api.get<CourseModuleResponse[]>(
      `${BASE_URL}/${courseId}/modules`
    );

  return response.data;
}

export async function updateCourseModule(
  courseId: string,
  moduleId: string,
  request: UpdateCourseModuleRequest
): Promise<CourseModuleResponse> {
  const response =
    await api.put<CourseModuleResponse>(
      `${BASE_URL}/${courseId}/modules/${moduleId}`,
      request
    );

  return response.data;
}

export async function deleteCourseModule(
  courseId: string,
  moduleId: string
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${courseId}/modules/${moduleId}`
  );
}

export async function reorderCourseModules(
  courseId: string,
  request: ReorderCourseModulesRequest
): Promise<CourseModuleResponse[]> {
  const response =
    await api.put<CourseModuleResponse[]>(
      `${BASE_URL}/${courseId}/modules/reorder`,
      request
    );

  return response.data;
}

// =========================================================
// LESSONS
// =========================================================

export async function createLesson(
  courseId: string,
  moduleId: string,
  request: CreateLessonRequest
): Promise<LessonResponse> {
  const response =
    await api.post<LessonResponse>(
      `${BASE_URL}/${courseId}/modules/${moduleId}/lessons`,
      request
    );

  return response.data;
}

export async function getModuleLessons(
  courseId: string,
  moduleId: string
): Promise<LessonResponse[]> {
  const response =
    await api.get<LessonResponse[]>(
      `${BASE_URL}/${courseId}/modules/${moduleId}/lessons`
    );

  return response.data;
}

export async function updateLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  request: UpdateLessonRequest
): Promise<LessonResponse> {
  const response =
    await api.put<LessonResponse>(
      `${BASE_URL}/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      request
    );

  return response.data;
}

export async function deleteLesson(
  courseId: string,
  moduleId: string,
  lessonId: string
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${courseId}/modules/${moduleId}/lessons/${lessonId}`
  );
}

export async function reorderLessons(
  courseId: string,
  moduleId: string,
  request: ReorderLessonsRequest
): Promise<LessonResponse[]> {
  const response =
    await api.put<LessonResponse[]>(
      `${BASE_URL}/${courseId}/modules/${moduleId}/lessons/reorder`,
      request
    );

  return response.data;
}

// =========================================================
// BATCH ASSIGNMENTS
// =========================================================

export async function assignCourseToBatch(
  courseId: string,
  batchId: string
): Promise<CourseAssignmentResponse> {
  const response =
    await api.post<CourseAssignmentResponse>(
      `${BASE_URL}/${courseId}/batches/${batchId}`
    );

  return response.data;
}

export async function getBatchCourseAssignments(
  batchId: string
): Promise<CourseAssignmentResponse[]> {
  const response =
    await api.get<CourseAssignmentResponse[]>(
      `${BASE_URL}/batches/${batchId}`
    );

  return response.data;
}

export async function getCourseBatchAssignments(
  courseId: string
): Promise<CourseAssignmentResponse[]> {
  const response =
    await api.get<CourseAssignmentResponse[]>(
      `${BASE_URL}/${courseId}/batches`
    );

  return response.data;
}

export async function unassignCourseFromBatch(
  courseId: string,
  batchId: string
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${courseId}/batches/${batchId}`
  );
}

// =========================================================
// PROGRESS
// =========================================================

export async function getBatchCourseProgress(
  courseId: string,
  batchId: string
): Promise<InstructorStudentProgressResponse[]> {
  const response =
    await api.get<
      InstructorStudentProgressResponse[]
    >(
      `${BASE_URL}/${courseId}/batches/${batchId}/progress`
    );

  return response.data;
}
import { api } from "@/lib/api";

import type {
  StudentCourseModuleResponse,
  StudentCourseProgressResponse,
  StudentCourseResponse,
  StudentLessonResponse,
} from "@/types/course";

const BASE_URL =
  "/api/v1/student/courses";

export async function getMyCourses() {
  const response = await api.get<
    StudentCourseResponse[]
  >(BASE_URL);

  return response.data;
}

export async function getStudentCourse(
  courseId: string
) {
  const response =
    await api.get<StudentCourseResponse>(
      `${BASE_URL}/${courseId}`
    );

  return response.data;
}

export async function getStudentCourseModules(
  courseId: string
) {
  const response = await api.get<
    StudentCourseModuleResponse[]
  >(`${BASE_URL}/${courseId}/modules`);

  return response.data;
}

export async function getStudentModuleLessons(
  courseId: string,
  moduleId: string
) {
  const response = await api.get<
    StudentLessonResponse[]
  >(
    `${BASE_URL}/${courseId}/modules/${moduleId}/lessons`
  );

  return response.data;
}

export async function completeLesson(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  await api.post(
    `${BASE_URL}/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`
  );
}

export async function uncompleteLesson(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  await api.delete(
    `${BASE_URL}/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`
  );
}

export async function getStudentCourseProgress(
  courseId: string
) {
  const response =
    await api.get<StudentCourseProgressResponse>(
      `${BASE_URL}/${courseId}/progress`
    );

  return response.data;
}
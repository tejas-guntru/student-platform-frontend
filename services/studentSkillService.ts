import { api } from "@/lib/api";

import type {
  StudentSkill,
  StudentSkillRequest,
} from "@/types/studentSkill";


// =========================================================
// GET
// =========================================================

export const getMySkills =
  async (): Promise<StudentSkill[]> => {

    const response =
      await api.get<StudentSkill[]>(
        "/api/v1/students/me/skills"
      );

    return response.data;
  };


// =========================================================
// CREATE
// =========================================================

export const createSkill =
  async (
    request: StudentSkillRequest
  ): Promise<StudentSkill> => {

    const response =
      await api.post<StudentSkill>(
        "/api/v1/students/me/skills",
        request
      );

    return response.data;
  };


// =========================================================
// UPDATE
// =========================================================

export const updateSkill =
  async (
    skillId: string,
    request: StudentSkillRequest
  ): Promise<StudentSkill> => {

    const response =
      await api.put<StudentSkill>(
        `/api/v1/students/me/skills/${skillId}`,
        request
      );

    return response.data;
  };


// =========================================================
// DELETE
// =========================================================

export const deleteSkill =
  async (
    skillId: string
  ): Promise<void> => {

    await api.delete(
      `/api/v1/students/me/skills/${skillId}`
    );
  };
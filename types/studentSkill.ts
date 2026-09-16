export type SkillProficiency =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";


export interface StudentSkill {
  skillId: string;

  skillName: string;

  proficiency: SkillProficiency;

  createdAt: string;

  updatedAt: string;
}


export interface StudentSkillRequest {
  skillName: string;

  proficiency: SkillProficiency;
}
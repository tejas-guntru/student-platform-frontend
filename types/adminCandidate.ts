export interface AdminCandidateSkill {
  skillId: string;
  skillName: string;
  proficiency: string;
}


export interface AdminCandidateProject {
  projectId: string;
  title: string;
  description: string | null;
  techStack: string | null;
  githubUrl: string | null;
  projectUrl: string | null;
  startDate: string | null;
  endDate: string | null;
}


export interface AdminCandidateExperience {
  experienceId: string;
  companyName: string;
  roleTitle: string;
  employmentType: string;
  location: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
}


export interface AdminCandidateCodingProfile {
  profileId: string;
  platform: string;
  username: string;
  profileUrl: string | null;
  verificationStatus: string;
  syncStatus: string;

  currentRating: number | null;
  maxRating: number | null;
  problemsSolved: number | null;
  contestCount: number | null;

  platformRank: string | null;
  platformTitle: string | null;

  lastSyncedAt: string | null;
}


export interface AdminCandidateRanking {
  codeforcesScore: number | null;
  leetcodeScore: number | null;
  codechefScore: number | null;
  overallScore: number | null;

  globalRank: number | null;
  collegeRank: number | null;
  graduationYearRank: number | null;
}


export interface AdminCandidate {
  studentId: string;

  fullName: string;
  email: string;

  phone: string | null;

  degree: string | null;
  branch: string | null;

  graduationYear: number | null;

  city: string | null;

  preferredRole: string | null;

  bio: string | null;

  collegeId: string | null;
  collegeName: string | null;

  skills: AdminCandidateSkill[];

  projects: AdminCandidateProject[];

  experiences: AdminCandidateExperience[];

  codingProfiles: AdminCandidateCodingProfile[];

  ranking: AdminCandidateRanking | null;
}
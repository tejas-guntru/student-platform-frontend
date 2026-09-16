export interface LeaderboardEntry {
  studentId: string;

  fullName: string | null;

  collegeName: string | null;

  graduationYear: number | null;

  codeforcesScore: number | null;

  leetcodeScore: number | null;

  codechefScore: number | null;

  overallScore: number | null;

  globalRank: number | null;

  collegeRank: number | null;

  graduationYearRank: number | null;
}


export interface LeaderboardPageResponse {
  content: LeaderboardEntry[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;
}
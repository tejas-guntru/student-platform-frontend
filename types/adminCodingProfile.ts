export type AdminCodingPlatform =
  | "CODEFORCES"
  | "LEETCODE"
  | "CODECHEF";

export type AdminVerificationStatus =
  | "VERIFIED"
  | "UNVERIFIED";

export type AdminSyncStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";


export interface AdminCodingProfile {
  profileId?: string;
  id?: string;

  studentId?: string;

  studentName?: string | null;
  fullName?: string | null;

  studentEmail?: string | null;
  email?: string | null;

  collegeName?: string | null;

  graduationYear?: number | null;

  platform: AdminCodingPlatform;

  username: string;

  profileUrl?: string | null;

  verificationStatus: AdminVerificationStatus;

  syncStatus?: AdminSyncStatus;

  currentRating?: number | null;

  maxRating?: number | null;

  problemsSolved?: number | null;

  contestCount?: number | null;

  platformRank?: string | null;

  platformTitle?: string | null;

  lastSyncedAt?: string | null;
}
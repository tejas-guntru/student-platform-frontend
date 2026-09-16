export type CodingPlatform =
  | "CODEFORCES"
  | "LEETCODE"
  | "CODECHEF";

export type VerificationStatus =
  | "UNVERIFIED"
  | "VERIFIED";

export type SyncStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";


export interface CodingProfile {
  id: string;

  platform: CodingPlatform;

  username: string;

  profileUrl: string | null;

  verificationStatus: VerificationStatus;

  syncStatus: SyncStatus;

  currentRating: number | null;

  maxRating: number | null;

  problemsSolved: number | null;

  contestCount: number | null;

  platformRank: string | null;

  platformTitle: string | null;

  lastSyncedAt: string | null;
}


export interface CodingUsernameRequest {
  username: string;
}
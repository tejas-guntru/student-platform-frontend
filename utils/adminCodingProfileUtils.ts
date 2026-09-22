import type {
  AdminCodingPlatform,
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

export type CodingVerificationFilter =
  | "ALL"
  | "VERIFIED"
  | "UNVERIFIED";

export function getCodingProfileId(
  profile: AdminCodingProfile
) {
  return (
    profile.profileId ||
    profile.id ||
    null
  );
}

export function getCodingStudentName(
  profile: AdminCodingProfile
) {
  return (
    profile.studentName ||
    profile.fullName ||
    "Student"
  );
}

export function formatCodingPlatform(
  platform: AdminCodingPlatform
) {
  switch (platform) {
    case "CODEFORCES":
      return "Codeforces";

    case "LEETCODE":
      return "LeetCode";

    case "CODECHEF":
      return "CodeChef";

    default:
      return platform;
  }
}
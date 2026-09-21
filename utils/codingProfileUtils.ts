import type {
  CodingPlatform,
} from "@/types/codingProfile";

export function platformName(
  platform: CodingPlatform
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
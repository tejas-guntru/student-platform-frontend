import type {
  CodingPlatform,
} from "@/types/codingProfile";

export interface PlatformConfig {
  platform: CodingPlatform;
  name: string;
  description: string;
  placeholder: string;
}

export const codingPlatforms:
  PlatformConfig[] = [
    {
      platform: "CODEFORCES",
      name: "Codeforces",
      description:
        "Connect your Codeforces account and sync competitive programming statistics.",
      placeholder:
        "Codeforces username",
    },
    {
      platform: "LEETCODE",
      name: "LeetCode",
      description:
        "Connect your LeetCode account and sync contest and problem-solving statistics.",
      placeholder:
        "LeetCode username",
    },
    {
      platform: "CODECHEF",
      name: "CodeChef",
      description:
        "Connect your CodeChef account and sync competitive programming statistics.",
      placeholder:
        "CodeChef username",
    },
  ];
import type {
  EmploymentType,
} from "@/types/studentExperience";

export function formatEmploymentType(
  value: EmploymentType
) {
  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}

export function formatMonth(
  value: string
) {
  const date =
    new Date(
      `${value}T00:00:00`
    );

  return date.toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  );
}
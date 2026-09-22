export function formatCandidateRank(
  value: number | null | undefined
) {
  if (
    value === null ||
    value === undefined ||
    value <= 0
  ) {
    return "-";
  }

  return `#${value}`;
}

export function formatCandidateScore(
  value: number | null | undefined
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "-";
  }

  return value.toFixed(2);
}

export function formatCandidateText(
  value: string
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

export function formatCandidateDate(
  value: string
) {
  return new Date(
    `${value}T00:00:00`
  ).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  );
}
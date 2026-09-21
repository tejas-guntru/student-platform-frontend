export function formatDate(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}
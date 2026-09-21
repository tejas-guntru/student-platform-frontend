export function formatRank(
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

export function formatScore(
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
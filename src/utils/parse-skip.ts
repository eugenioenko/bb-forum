export function parseSkip(skip: unknown): number {
  const parsed = Number(skip);
  return isNaN(parsed) ? 0 : Math.floor(parsed);
}

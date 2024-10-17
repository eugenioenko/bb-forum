export function dateDiffInDays(date1: Date, date2: Date) {
  const diffInMs = date2.getTime() - date1.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
}

import { isValid, parseJSON, format } from "date-fns";

export function formatDate(
  date: Date | string,
  formatStr: string = "iii LLL dd, yyyy  hh:mm aaa"
): string {
  let dateToFormat: Date;

  if (typeof date === "string") {
    dateToFormat = parseJSON(date);
  } else if (isValid(date)) {
    dateToFormat = date;
  } else {
    throw new Error("Invalid date type");
  }

  return format(dateToFormat, formatStr);
}

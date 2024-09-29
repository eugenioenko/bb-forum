/**
 * Converts the input string to a positive integer number or 0
 *
 * @param {string} input - The input string to be converted to a number.
 * @returns {number} - Positive integer number or 0
 */
export function positiveIntegerOrZero(
  input: string | undefined | null
): number {
  if (!input) {
    return 0;
  }
  const parsedNumber = Number(input);
  return isNaN(parsedNumber) ? 0 : Math.abs(Math.floor(parsedNumber));
}

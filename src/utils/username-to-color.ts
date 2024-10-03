export function usernameToColor(name: string): string {
  let result = 0;
  for (let i = 0; i < name.length; ++i) {
    result = result ^ (Math.pow(i, 2) * name.charCodeAt(i));
  }
  result = result % 360;
  return `hsl(${result} 30% 40%)`;
}

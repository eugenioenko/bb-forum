import { useAppStore } from "@/stores/app.store";

const themeNames = [
  ["theme-light", "Light"],
  ["theme-dark", "Dark"],
  ["theme-high-contrast-light", "High Contrast Light"],
  ["theme-high-contrast-dark", "Hight Contrast Dark"],
  ["theme-urban-light", "Urban Light"],
  ["theme-urban-dark", "Urban Dark"],
  ["theme-rainy-day", "Rainy Day Light"],
  ["theme-woodland-trail", "Woodland Trail Light"],
  ["theme-detroit-dark", "Detroit Dark"],
  ["theme-twilight-light", "Twilight Light"],
  ["theme-twilight-dark", "Twilight Dark"],
  ["theme-bohemia-dark", "Bohemia Dark"],
  ["theme-sunset", "Sunset Light"],
  ["theme-ocean-breeze", "Ocean Breeze Light"],
  ["theme-mountain-peak", "Mountain Peak Light"],
  ["theme-golden-hour", "Golden Hour Dark"],
  ["theme-harbor-lights", "Harbor Lights Light"],
  ["theme-moonlit-sky", "Moonlit Sky Light"],
];
export const ThemeSelector = () => {
  const appState = useAppStore();

  const setTheme = (theme: string) => {
    document.body.className = theme;
    appState.setTheme(theme);
  };
  return (
    <select
      value={appState.theme || ""}
      onChange={(e) => setTheme(e.currentTarget.value)}
    >
      {themeNames.map((theme) => (
        <option key={theme[0]} value={theme[0]}>
          {theme[1]}
        </option>
      ))}
    </select>
  );
};

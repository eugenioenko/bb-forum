import { useAppStore } from "@/stores/app.store";

const themeNames = [
  "theme-light",
  "theme-dark",
  "theme-solarize-light",
  "theme-solarize-dark",
  "theme-urban-light",
  "theme-urban-dark",
  "theme-jungle-light",
  "theme-jungle-dark",
  "theme-forest-light",
  "theme-forest-dark",
  "theme-ocean-light",
  "theme-ocean-dark",
  "theme-detroit-light",
  "theme-detroitP-dark",
  "theme-ny-light",
  "theme-ny-dark",
  "theme-canada-light",
  "theme-canada-dark",
  "theme-twilight-light",
  "theme-twilight-dark",
  "theme-sunset-light",
  "theme-sunset-dark",
  "theme-bohemia-dark",
  "theme-high-contrast-light",
  "theme-high-contrast-dark",

  "theme-sunset",
  "theme-ocean-breeze",
  "theme-midnight-city",
  "theme-mountain-peak",
  "theme-forest-mist",
  "theme-desert-dusk",
  "theme-urban-jungle",
  "theme-golden-hour",
  "theme-winter-chill",
  "theme-sunrise-glow",
  "theme-neon-lights",
  "theme-woodland-trail",
  "theme-beachfront",
  "theme-canyon-ridge",
  "theme-autumn-harvest",
  "theme-harbor-lights",
  "theme-moonlit-sky",
  "theme-rainy-day",
  "theme-metro-vibes",
  "theme-summer-breeze",
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
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

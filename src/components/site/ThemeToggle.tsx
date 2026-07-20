import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavOverHero } from "@/lib/useNavOverHero";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const stored = localStorage.getItem("idca-theme");
  if (stored === "light" || stored === "dark") return stored;
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("idca-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const overHero = useNavOverHero();

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
        overHero
          ? "border-foam/30 text-foam hover:bg-foam/10"
          : "border-border text-heading hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

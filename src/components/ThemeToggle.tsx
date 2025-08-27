"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      {mounted && (
        theme === "dark" ? (
          <>
            <FaSun /> Claro
          </>
        ) : (
          <>
            <FaMoon /> Oscuro
          </>
        )
      )}
    </button>
  );
}
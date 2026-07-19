import { useEffect, useState } from "react";

export default function LangToggle({ dark = false }: { dark?: boolean }) {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    const stored = (localStorage.getItem("idca-lang") as "id" | "en") || "id";
    setLang(stored);
    document.documentElement.dataset.lang = stored;
  }, []);

  function toggle(next: "id" | "en") {
    setLang(next);
    document.documentElement.dataset.lang = next;
    localStorage.setItem("idca-lang", next);
  }

  const base = "px-2.5 py-1 text-xs font-semibold tracking-wide rounded-full transition-colors";
  const activeCls = dark ? "bg-foam text-abyss" : "bg-heading text-background";
  const inactiveCls = dark
    ? "text-foam/60 hover:text-foam"
    : "text-muted-foreground hover:text-heading";

  return (
    <div
      className={`flex items-center gap-1 rounded-full border p-0.5 ${
        dark ? "border-foam/25" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => toggle("id")}
        className={`${base} ${lang === "id" ? activeCls : inactiveCls}`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => toggle("en")}
        className={`${base} ${lang === "en" ? activeCls : inactiveCls}`}
      >
        EN
      </button>
    </div>
  );
}

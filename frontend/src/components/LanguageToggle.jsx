import { useLanguage } from "../lib/LanguageContext";

// Fixed, always-on-top so it reaches every route — including the ones with
// no Navbar (HomePage, VotePage, ResultsPage) — without wiring it into each
// page individually. Own opaque background keeps it legible over both the
// light and dark page backgrounds in this app.
export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-navy-950/95 p-1 text-xs font-semibold text-white/60 shadow-xl shadow-black/20 backdrop-blur-md"
      role="group"
      aria-label={t("lang.toggleLabel")}
    >
      <span className="pl-2 pr-0.5 text-sm" aria-hidden="true">🌐</span>
      <button
        type="button"
        onClick={() => setLang("mn")}
        aria-pressed={lang === "mn"}
        className={`rounded-full px-2.5 py-1.5 transition-colors duration-200 ${
          lang === "mn" ? "bg-white text-navy-950" : "hover:text-white"
        }`}
      >
        MN
      </button>
      <button
        type="button"
        onClick={() => setLang("ko")}
        aria-pressed={lang === "ko"}
        className={`rounded-full px-2.5 py-1.5 transition-colors duration-200 ${
          lang === "ko" ? "bg-white text-navy-950" : "hover:text-white"
        }`}
      >
        한국어
      </button>
    </div>
  );
}

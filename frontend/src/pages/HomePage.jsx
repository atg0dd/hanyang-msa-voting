import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import "../styles/transitions.css";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white flex items-center justify-center px-4 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center py-8 sm:py-16">
        <h1 className="font-display text-2xl font-semibold sm:text-4xl md:text-5xl leading-tight">
          Сонгууль Эхэлхэд
        </h1>
        <p className="mt-3 sm:mt-4 max-w-md text-sm sm:text-base text-white/60">
          2026 оны Ханьян ERICA Монгол Оюутны Холбооны Сонгууль
        </p>
        <div className="mt-8 sm:mt-12">
          <CountdownTimer />
        </div>
        <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="rounded-full bg-white/20 backdrop-blur-xl border border-white/30 px-4 sm:px-5 py-2 sm:py-2.5 text-white/80">
            📅 8-24 – 26, 2026
          </div>
          <div className="rounded-full bg-white/20 backdrop-blur-xl border border-white/30 px-4 sm:px-5 py-2 sm:py-2.5 text-white/80">
            🕐 09:00 – 18:00 KST
          </div>
        </div>
        <div className="mt-10 sm:mt-12">
          <Link
            to="/candidates"
            className="group rounded-full bg-white/20 backdrop-blur-xl border border-white/30 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white/90 font-semibold hover:bg-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out inline-flex items-center gap-2 active:scale-95"
          >
            Нэр дэвшигчидтэй танилцах
            <span className="group-hover:translate-x-1 transition-transform duration-300">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
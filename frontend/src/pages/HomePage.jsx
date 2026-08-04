import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import { ArrowRight } from "../components/icons";
import "../styles/transitions.css";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-600/25 blur-[110px] sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-purple-600/20 blur-[110px] sm:h-96 sm:w-96" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-white/70 sm:left-8 sm:top-8">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 text-sm">🗳️</span>
        MSA Elections
      </div>

      <div className="transition-in relative mx-auto flex max-w-2xl flex-col items-center py-8 text-center sm:py-16">
        <h1 className="font-display text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Сонгууль Эхэлхэд
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/60 sm:mt-4 sm:text-base">
          2026 оны Ханьян ERICA Монгол Оюутны Холбооны Сонгууль
        </p>

        <div className="mt-8 sm:mt-12">
          <CountdownTimer />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs sm:mt-12 sm:gap-3 sm:text-sm">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 backdrop-blur-md sm:px-5 sm:py-2.5">
            📅 8-24 – 26, 2026
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 backdrop-blur-md sm:px-5 sm:py-2.5">
            🕐 09:00 – 18:00 KST
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <Link
            to="/home"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy-950 shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-2xl active:translate-y-0 sm:px-8 sm:text-base"
          >
            Нэр дэвшигчидтэй танилцах
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

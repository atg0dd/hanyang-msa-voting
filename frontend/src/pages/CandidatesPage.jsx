import { Link } from "react-router-dom";
import { ArrowLeft } from "../components/icons";
import TeamCard from "../components/TeamCard";
import Reveal from "../components/Reveal";
import { teams } from "../data/teams";
import "../styles/transitions.css";

export default function CandidatesPage() {
  return (
    <div>
      <div className="border-b border-navy-900/10 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-2 text-xs sm:text-sm">
          <Link to="/home" className="group flex items-center gap-1 sm:gap-1.5 text-navy-900/60 hover:text-navy-900 transition-colors duration-300 whitespace-nowrap">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
            <span className="hidden sm:inline">Үндсэн хуудас руу буцах</span>
            <span className="sm:hidden">Буцах</span>
          </Link>
          <span className="font-semibold text-navy-900 text-right">Нэр дэвшигчидтэй танилцах</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16 transition-in">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900">
            Нэр дэвшигчидтэй танилцах
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-navy-900/60">
            Сонгуулийн бүрэлдэхүүнийг бүхэлд нь гадна томилсон. Та итгэж буй баг сонгоно уу.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <Reveal key={team.id} delay={i * 100}>
              <TeamCard team={team} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

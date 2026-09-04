import { Link } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import FaqItem from "../components/FaqItem";
import Reveal from "../components/Reveal";
import { IdCard, ClipboardList, ShieldCheck, ArrowRight } from "../components/icons";
import { getTeams } from "../lib/api";
import { useApi } from "../hooks/useApi";

const faqs = [
  {
    q: "MSA сонгуульд хэн санал өгөх эрхтэй вэ?",
    a: "ERICA-д бүртгэлтэй, идэвхтэй суралцаж буй бүх оюутан @hanyang.ac.kr имэйлээр баталгаажуулан нэг удаа санал өгөх эрхтэй.",
  },
  { 
    q: "Саналаа хэрхэн өгөх вэ?",
    a: "Та нэр дэвшигчидтэй мөн тэдний мөрийн хөтөлбөртэй танилцаж Санал Өгөх товчин дээр дарж оюутны мэйл хаягаар өөрийгөө баталгаажуулснаар саналаа өгөх боломжтой.",
  },
  {
    q: "Илгээсэн саналаа дараа нь өөрчлөх боломжтой юу?",
    a: "Үгүй. Нэг оюутан зөвхөн нэг удаа санал өгөх бөгөөд илгээсний дараа өөрчлөх боломжгүй тул сонголтоо анхааралтай хийнэ үү.",
  },
  {
    q: "Сонгуулийн үр дүнг хэзээ зарлах вэ?",
    a: "Сонгуулийн үр дүнг сонгууль явагдаж байх үед ч шалгах боломжтой бөгөөд эцсийн үр дүн сонгууль дууссан тэр даруй гарах болно.",
  },
  {
    q: "Миний санал нууц бөгөөд аюулгүй юу?",
    a: "Тийм ээ. Бүх санал эцсээ хүртэл шифрлэгдэж, нэрээ нууцалсан байдлаар тоологдоно. Хэн аль багт санал өгсөнийг шалгах боломжтгүй бөгөөд MSA удирдлага болон бусад ямар ч этгээд саналыг шудрага бусаар өөрчлөх боломжтгүй",
  },
  {
    q: "Санал өгөх явцад техникийн асуудал тулгарвал яах вэ?",
    a: "Санал хураалтын 2 өдрийн турш тусламжийн үйлчилгээ бэлэн байх бөгөөд msa_erica инстаграм хуудсаар холбогдоно уу.",
  },
];

const steps = [
  { icon: IdCard, label: "1-р алхам: Оюутны мэйлээр өөрийгөө баталгаажуулах" },
  { icon: ClipboardList, label: "2-р алхам: Нэр дэвшигчдийн мөрийн хөтөлбөртэй танилцах" },
  { icon: ShieldCheck, label: "3-р алхам: Саналаа илгээх" },
];

export default function HomeLandingPage() {
  const { data: teams, loading, error } = useApi(getTeams, []);

  const stats = [
    { value: loading ? "—" : String(teams?.length ?? 0), label: "Нэр дэвшсэн баг" },
    { value: "150+", label: "Бүртгэлтэй оюутан" },
    { value: "2 өдөр", label: "Санал хураах хугацаа" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-[#EEF1FD] to-[#F7F8FC] px-6 py-16 text-center sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blue-300/30 blur-[100px]" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-purple-300/25 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            2026 ОНЫ ОЮУТНЫ ХОЛБООНЫ СОНГУУЛЬ
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-5xl">
            Таны Санал Монгол Оюутнуудын Ирээдүй 
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-navy-900/60 sm:text-base">
            Нэр дэвшигчдийн мөрийн хөтөлбөртэй танилцаж, сонгуулийн зорилтуудыг судалж, аюулгүйгээр
            саналаа өгнө үү. 
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/candidates"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-navy-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-2xl active:translate-y-0 sm:px-8 sm:text-base"
            >
              Нэр дэвшигчидтэй танилцах
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/results"
              className="rounded-full border border-navy-900/15 bg-white px-7 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900/5 hover:shadow-md active:translate-y-0 sm:px-8 sm:text-base"
            >
              Үр дүнг харах
            </Link>
          </div>

          <div className="mt-14 flex items-center justify-center divide-x divide-navy-900/10">
            {stats.map((s) => (
              <div key={s.label} className="px-6 first:pl-0 last:pr-0 sm:px-10">
                <p className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-navy-900/50 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the candidates */}
      <section id="candidates" className="bg-[#F0F2FA] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              {loading ? "Ачааллаж байна…" : `${teams?.length ?? 0} баг өрсөлдөж байна`}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
              Нэр дэвшигчидтэй танилцах
            </h2>
            <p className="mt-2 text-sm text-navy-900/60 sm:text-base">
              Баг тус бүр Ерөнхийлөгч, Дэд ерөнхийлөгчөөс бүрдсэн хос болон өрсөлдөж байна. Итгэдэг багаа
              сонгож дэмжээрэй.
            </p>
    
          </Reveal>
          {loading ? (
            <p className="mt-10 text-center text-sm text-navy-900/40">Ачааллаж байна…</p>
          ) : error ? (
            <p className="mt-10 text-center text-sm text-red-500">Мэдээлэл ачаалахад алдаа гарлаа.</p>
          ) : (
            <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, i) => (
                <Reveal key={team.id} delay={i * 100}>
                  <TeamCard team={team} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Need help voting */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-card lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Гарын авлага
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
              Санал өгөхөд тусламж хэрэгтэй юу?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-900/60">
              Та сонгосон багтаа дараах алхмаар өөрийн саналыг өгөх боломжтой.
            </p>
            <ul className="mt-6 space-y-4">
              {steps.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <s.icon size={17} />
                  </span>
                  <span className="text-sm font-medium text-navy-900">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900 lg:flex">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-blue-500/30 blur-[90px]" />
              <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-purple-500/20 blur-[90px]" />
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              <span className="relative text-5xl">🗳️</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-[#F0F2FA] px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Асуулт байна уу?
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
            Түгээмэл асуултууд
          </h2>
          <p className="mt-2 text-sm text-navy-900/60">
            Сонгуулийн үйл явцын талаар мэдэх шаардлагатай бүх зүйл.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl space-y-3" delay={100}>
          {faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </Reveal>

        <Reveal
          className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl bg-blue-50 px-6 py-6 sm:flex-row"
          delay={150}
        >
          <div className="text-center sm:text-left">
            <p className="font-semibold text-navy-900">Асуулт байсаар байна уу?</p>
            <p className="mt-1 text-sm text-navy-900/60">
              Манай багийн гишүүд санал хураалтын турш танд туслахад бэлэн байна.
            </p>
          </div>
          <a
            href="https://www.instagram.com/msa_erica/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-lg active:translate-y-0"
          >
            Тусламж авах
          </a>
        </Reveal>
      </section>
    </div>
  );
}

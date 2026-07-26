import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import TeamCard from "../components/TeamCard";
import FaqItem from "../components/FaqItem";
import { teams } from "../data/teams";

const faqs = [
  {
    q: "Who is eligible to vote in the MSA election?",
    a: "All currently enrolled Hanyang University ERICA students with an active @hanyang.ac.kr email are eligible to vote, once per student.",
  },
  {
    q: "How do I verify my identity before voting?",
    a: "You'll enter your @hanyang.ac.kr email and confirm a 6-digit code sent to it before your vote is recorded.",
  },
  {
    q: "Can I change my vote after submitting?",
    a: "No. Once your ballot is encrypted and recorded, it cannot be changed or resubmitted, to protect the integrity of the count.",
  },
  {
    q: "When are the election results announced?",
    a: "Results will be published within 24 hours of the voting period closing on Day 3. You will receive an email notification and can also view live tallies on the Election Dashboard.",
  },
  {
    q: "Is my vote anonymous and secure?",
    a: "Yes. All votes are end-to-end encrypted and anonymized before counting. Neither the MSA administration nor any third party can link a submitted ballot back to an individual voter.",
  },
  {
    q: "What if I experience a technical issue while voting?",
    a: "Contact the MSA Elections support team via the Contact Support link in the footer, or visit the student affairs office in Building 1. Support is available during all three days of the voting period.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero with countdown */}
      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">
            The election begins in
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/60">
            Cast your vote for the 2026 Hanyang ERICA Student Association.
          </p>
          <div className="mt-8">
            <CountdownTimer />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span>Aug 4 – 6, 2026, 09:00 – 18:00 KST</span>
            <span>·</span>
            <span>~10,000 eligible voters</span>
            <span>·</span>
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </section>

      {/* Secondary hero / intro */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
            2026 ERICA Student Association
          </span>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Shape the Future of Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-navy-900/60 sm:text-base">
            Explore candidate manifestos, review election goals, and vote securely.
            Your voice defines the vision for Hanyang ERICA.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#candidates"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Candidates
            </a>
            <Link
              to="/results"
              className="rounded-lg border border-navy-900/10 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-900/5"
            >
              Election Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Candidates grid */}
      <section id="candidates" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h3 className="font-display text-2xl font-semibold text-navy-900">Meet the Candidates</h3>
          <p className="mt-2 text-sm text-navy-900/60">
            Each team is running for President &amp; Vice President together. Vote for the team you believe in.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      {/* Need help voting */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid overflow-hidden rounded-2xl bg-navy-900 text-white md:grid-cols-2">
          <div className="p-8 sm:p-10">
            <h3 className="font-display text-xl font-semibold">Need Help Voting?</h3>
            <p className="mt-2 text-sm text-white/60">
              Review the step-by-step guide on how to verify your student identity and
              cast your ballot through the official ERICA portal.
            </p>
            <ol className="mt-6 space-y-4 text-sm">
              {[
                "Verify Identity via Student ID",
                "Review Candidate Manifestos",
                "Submit Secure Encrypted Vote",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden bg-gradient-to-br from-blue-500/20 to-transparent md:block" />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Got Questions?
          </span>
          <h3 className="mt-2 font-display text-2xl font-semibold text-navy-900">
            Frequently Asked Questions
          </h3>
          <p className="mt-2 text-sm text-navy-900/60">
            Everything you need to know about the election process.
          </p>
        </div>
        <div className="rounded-2xl border border-navy-900/10 bg-white px-6 shadow-card">
          {faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-blue-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-navy-900">Still have questions?</p>
            <p className="text-sm text-navy-900/60">Our support team is here during all three days of voting.</p>
          </div>
          <button className="whitespace-nowrap rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-950">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X } from "../components/icons";
import Stepper from "../components/Stepper";
import { createTeam } from "../lib/api";

const steps = ["President", "Vice President", "Vision & Platform", "Review"];

const emptyPerson = { name: "", dept: "" };
const emptyPillar = { icon: "", title: "", desc: "" };
const emptyInitiative = { headline: "", detail: "" };

const accents = [
  { value: "blue", label: "Blue", swatch: "bg-blue-500" },
  { value: "purple", label: "Purple", swatch: "bg-purple-500" },
  { value: "green", label: "Green", swatch: "bg-emerald-500" },
  { value: "orange", label: "Orange", swatch: "bg-orange-500" },
];

function Field({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function PersonForm({ role, person, setPerson }) {
  return (
    <div>
      <h1 className="font-display text-lg font-semibold text-navy-900">{role}'s Information</h1>
      <p className="mt-1.5 text-sm text-navy-900/60">Tell us about the candidate running for {role}.</p>

      <div className="mt-5 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        Running as {role}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Full Name"
          placeholder="e.g. Kim Jun-su"
          value={person.name}
          onChange={(v) => setPerson({ ...person, name: v })}
        />
        <Field
          label="Department"
          placeholder="e.g. Computer Science"
          value={person.dept}
          onChange={(v) => setPerson({ ...person, dept: v })}
        />
      </div>
    </div>
  );
}

export default function ApplicationPage() {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [accent, setAccent] = useState("blue");
  const [president, setPresident] = useState(emptyPerson);
  const [vp, setVp] = useState(emptyPerson);
  const [slogan, setSlogan] = useState("");
  const [vision, setVision] = useState("");
  const [pillars, setPillars] = useState([{ ...emptyPillar }]);
  const [initiatives, setInitiatives] = useState([{ ...emptyInitiative }]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [createdTeam, setCreatedTeam] = useState(null);

  const visionWords = vision.trim() ? vision.trim().split(/\s+/).length : 0;

  function next() {
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const team = await createTeam({
        name: teamName,
        slogan,
        accent,
        vision,
        president,
        vp,
        pillars: pillars.filter((p) => p.title.trim()),
        initiatives: initiatives.filter((i) => i.headline.trim()),
      });
      setCreatedTeam(team);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (createdTeam) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl">✅</div>
        <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">Team added</h1>
        <p className="mt-2 text-sm text-navy-900/60">
          "{createdTeam.name}" is now live on the ballot.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            to={`/team/${createdTeam.id}`}
            className="inline-block rounded-lg bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 active:translate-y-0"
          >
            View manifesto page
          </Link>
          <Link to="/home" className="text-sm font-semibold text-navy-900/60 hover:text-navy-900">
            Back to Election Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 text-sm">
          <Link to="/home" className="flex items-center gap-1.5 text-navy-900/60 transition-colors duration-200 hover:text-navy-900">
            <ArrowLeft size={16} />
            Add Team
          </Link>
          <span className="font-semibold text-navy-900">Step {step} of 4</span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <Stepper steps={steps} current={step} />

        <div className="mt-8 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-8">
        <div key={step} className="transition-in">
          {step === 1 && (
            <>
              <div className="mb-6">
                <Field
                  label="Team Name"
                  placeholder="e.g. Team Digital Future"
                  value={teamName}
                  onChange={setTeamName}
                />
                <p className="mt-1.5 text-xs text-navy-900/40">
                  This is the name voters will see on the ballot and team card.
                </p>
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">Accent Color</label>
                <div className="flex gap-2">
                  {accents.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setAccent(a.value)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                        accent === a.value ? "border-navy-900 text-navy-900" : "border-navy-900/15 text-navy-900/50"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${a.swatch}`} />
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <PersonForm role="President" person={president} setPerson={setPresident} />
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-6 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                Your VP and you will run as one team. Both members must be currently enrolled ERICA students.
              </p>
              <PersonForm role="Vice President" person={vp} setPerson={setVp} />
            </>
          )}

          {step === 3 && (
            <div>
              <h1 className="font-display text-lg font-semibold text-navy-900">Vision &amp; Platform</h1>
              <p className="mt-1.5 text-sm text-navy-900/60">
                What does your team stand for? This content powers your manifesto page.
              </p>

              <div className="mt-6">
                <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">Team Slogan</label>
                <p className="mb-1.5 text-xs text-navy-900/40">
                  A short rallying phrase — shown on the team card voters see on the election page.
                </p>
                <input
                  value={slogan}
                  maxLength={80}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="e.g. Transparent governance. Connected campus. Your voice, amplified."
                  className="w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-right text-xs text-navy-900/30">{slogan.length}/80</p>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">Our Vision</label>
                <p className="mb-1.5 text-xs text-navy-900/40">
                  2–4 sentences about what your team stands for. This is the first thing voters read on your manifesto.
                </p>
                <textarea
                  rows={4}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="Write your team's vision statement…"
                  className="w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-xs text-navy-900/30">{visionWords} words — aim for 40–80</p>
              </div>

              <div className="mt-8">
                <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">Platform Pillars</label>
                <p className="mb-3 text-xs text-navy-900/40">
                  2–4 core themes. Each gets a card on your manifesto page.
                </p>
                <div className="space-y-4">
                  {pillars.map((p, i) => (
                    <div key={i} className="relative rounded-lg border border-navy-900/10 p-4">
                      {pillars.length > 1 && (
                        <button
                          onClick={() => setPillars(pillars.filter((_, idx) => idx !== i))}
                          className="absolute right-3 top-3 text-navy-900/30 transition-colors duration-200 hover:text-navy-900"
                        >
                          <X size={15} />
                        </button>
                      )}
                      <p className="mb-3 text-xs font-semibold text-navy-900/50">Pillar {i + 1}</p>
                      <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
                        <input
                          value={p.icon}
                          onChange={(e) =>
                            setPillars(pillars.map((pl, idx) => (idx === i ? { ...pl, icon: e.target.value } : pl)))
                          }
                          placeholder="💡"
                          className="rounded-lg border border-navy-900/15 px-3 py-2 text-center text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        <input
                          value={p.title}
                          onChange={(e) =>
                            setPillars(pillars.map((pl, idx) => (idx === i ? { ...pl, title: e.target.value } : pl)))
                          }
                          placeholder="e.g. Digital Campus Hub"
                          className="rounded-lg border border-navy-900/15 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={p.desc}
                        onChange={(e) =>
                          setPillars(pillars.map((pl, idx) => (idx === i ? { ...pl, desc: e.target.value } : pl)))
                        }
                        placeholder="Describe this pillar in 1–2 sentences…"
                        className="mt-3 w-full rounded-lg border border-navy-900/15 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  ))}
                </div>
                {pillars.length < 4 && (
                  <button
                    onClick={() => setPillars([...pillars, { ...emptyPillar }])}
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors duration-200 hover:underline"
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>

              <div className="mt-8">
                <label className="mb-1.5 block text-xs font-semibold text-navy-900/60">Key Initiatives</label>
                <p className="mb-3 text-xs text-navy-900/40">
                  Specific, actionable commitments. Each appears as a checklist item on your manifesto.
                </p>
                <div className="space-y-3">
                  {initiatives.map((it, i) => (
                    <div key={i} className="relative rounded-lg border border-navy-900/10 p-4">
                      {initiatives.length > 1 && (
                        <button
                          onClick={() => setInitiatives(initiatives.filter((_, idx) => idx !== i))}
                          className="absolute right-3 top-3 text-navy-900/30 transition-colors duration-200 hover:text-navy-900"
                        >
                          <X size={15} />
                        </button>
                      )}
                      <input
                        value={it.headline}
                        onChange={(e) =>
                          setInitiatives(initiatives.map((x, idx) => (idx === i ? { ...x, headline: e.target.value } : x)))
                        }
                        placeholder={`${i + 1}. Initiative headline`}
                        className="w-full rounded-lg border border-navy-900/15 px-3 py-2 text-sm font-medium outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                      <input
                        value={it.detail}
                        onChange={(e) =>
                          setInitiatives(initiatives.map((x, idx) => (idx === i ? { ...x, detail: e.target.value } : x)))
                        }
                        placeholder="Supporting detail — how will you achieve this?"
                        className="mt-2 w-full rounded-lg border border-navy-900/15 px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setInitiatives([...initiatives, { ...emptyInitiative }])}
                  className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors duration-200 hover:underline"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-lg font-semibold text-navy-900">Review before publishing</h1>
              <p className="mt-1.5 text-sm text-navy-900/60">
                Double-check everything below — submitting adds this team to the live ballot immediately.
              </p>

              <div className="mt-6 space-y-5 text-sm">
                <div className="rounded-lg border border-navy-900/10 p-4">
                  <p className="text-xs font-semibold text-navy-900/40">Team Name</p>
                  <p className="mt-1 font-medium text-navy-900">{teamName || "—"}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-navy-900/10 p-4">
                    <p className="text-xs font-semibold text-navy-900/40">President</p>
                    <p className="mt-1 font-medium text-navy-900">{president.name || "—"}</p>
                    <p className="text-xs text-navy-900/50">{president.dept || "—"}</p>
                  </div>
                  <div className="rounded-lg border border-navy-900/10 p-4">
                    <p className="text-xs font-semibold text-navy-900/40">Vice President</p>
                    <p className="mt-1 font-medium text-navy-900">{vp.name || "—"}</p>
                    <p className="text-xs text-navy-900/50">{vp.dept || "—"}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-navy-900/10 p-4">
                  <p className="text-xs font-semibold text-navy-900/40">Slogan</p>
                  <p className="mt-1 italic text-navy-900">{slogan || "—"}</p>
                </div>
                <div className="rounded-lg border border-navy-900/10 p-4">
                  <p className="text-xs font-semibold text-navy-900/40">Vision</p>
                  <p className="mt-1 text-navy-900/80">{vision || "—"}</p>
                </div>
                <div className="rounded-lg border border-navy-900/10 p-4">
                  <p className="text-xs font-semibold text-navy-900/40">Platform Pillars</p>
                  <p className="mt-1 text-navy-900/80">
                    {pillars.filter((p) => p.title).map((p) => p.title).join(", ") || "—"}
                  </p>
                </div>
                <div className="rounded-lg border border-navy-900/10 p-4">
                  <p className="text-xs font-semibold text-navy-900/40">Key Initiatives</p>
                  <p className="mt-1 text-navy-900/80">
                    {initiatives.filter((i) => i.headline).length} initiative(s) added
                  </p>
                </div>
              </div>

              {submitError && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
              )}
            </div>
          )}
        </div>

          <div className="mt-8 flex items-center justify-between border-t border-navy-900/10 pt-6">
            <button
              onClick={prev}
              disabled={step === 1}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-navy-900/60 transition-colors duration-200 disabled:opacity-0"
            >
              Previous
            </button>
            {step < 4 ? (
              <button
                onClick={next}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {submitting ? "Publishing…" : "Publish Team"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

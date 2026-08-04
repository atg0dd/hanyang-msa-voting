import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "../components/icons";
import { teams, accentMap } from "../data/teams";

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function randomReceiptId() {
  return "MSA-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function VotePage() {
  const { teamId } = useParams();
  const team = teams.find((t) => t.id === teamId);

  const [stage, setStage] = useState("email"); // email | code | receipt
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sentCode, setSentCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [resendIn, setResendIn] = useState(60);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (stage !== "code") return;
    if (resendIn <= 0) return;
    const id = setInterval(() => setResendIn((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(id);
  }, [stage, resendIn]);

  if (!team) return <Navigate to="/" replace />;
  const accent = accentMap[team.accent];

  function handleSendCode(e) {
    e.preventDefault();
    if (!/^[a-zA-Z0-9._%+-]+@hanyang\.ac\.kr$/.test(email)) {
      setEmailError("Must end with @hanyang.ac.kr");
      return;
    }
    setEmailError("");
    const generated = randomCode();
    setSentCode(generated);
    console.log(`[Demo] Verification code for ${email}: ${generated}`);
    setResendIn(60);
    setStage("code");
  }

  function handleCodeChange(i, value) {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    if (value && i < 5) {
      document.getElementById(`code-${i + 1}`)?.focus();
    }
  }

  function handleVerifyCode(e) {
    e.preventDefault();
    const entered = code.join("");
    if (entered.length < 6) {
      setCodeError("Enter all 6 digits.");
      return;
    }
    if (entered !== sentCode) {
      setCodeError("That code doesn't match. Check the console for your demo code.");
      return;
    }
    setCodeError("");
    setReceipt({
      id: randomReceiptId(),
      voter: email,
      team: team.name,
      time: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    });
    setStage("receipt");
  }

  return (
    <div>
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-6 py-4 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-navy-900/60 hover:text-navy-900">
            <ArrowLeft size={16} />
            MSA Election
          </Link>
          <span className="font-semibold text-navy-900">Cast Your Vote</span>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-6 py-10">
        {stage !== "receipt" && (
          <div className="mb-8 flex items-center justify-center gap-8 text-sm font-semibold">
            <span className={stage === "email" ? "text-blue-600" : "text-navy-900/40"}>
              1. Verify Email
            </span>
            <span className={stage === "code" ? "text-blue-600" : "text-navy-900/40"}>
              2. Enter Code
            </span>
          </div>
        )}

        {stage !== "receipt" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-navy-900/10 bg-white p-4 shadow-card">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${accent.soft} ${accent.text}`}>
              {team.president.initials}
            </div>
            <div>
              <p className="text-xs text-navy-900/50">Voting for</p>
              <p className="text-sm font-semibold text-navy-900">{team.name}</p>
              <p className="text-xs text-navy-900/50">{team.president.name} &amp; {team.vp.name}</p>
            </div>
          </div>
        )}

        {stage === "email" && (
          <form onSubmit={handleSendCode} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
            <h1 className="font-display text-lg font-semibold text-navy-900">Verify your student email</h1>
            <p className="mt-1.5 text-sm text-navy-900/60">
              Enter your Hanyang University ERICA email. We'll send a 6-digit code to
              confirm your identity before your vote is recorded.
            </p>

            <label className="mt-6 block text-xs font-semibold text-navy-900/60">Student Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@hanyang.ac.kr"
              className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {emailError ? (
              <p className="mt-1.5 text-xs text-red-600">{emailError}</p>
            ) : (
              <p className="mt-1.5 text-xs text-navy-900/40">Must end with @hanyang.ac.kr</p>
            )}

            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Send Verification Code
            </button>

            <p className="mt-4 text-center text-xs text-navy-900/40">
              Each enrolled student may cast one vote. Your ballot is anonymous.
            </p>
          </form>
        )}

        {stage === "code" && (
          <form onSubmit={handleVerifyCode} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
            <h1 className="font-display text-lg font-semibold text-navy-900">Enter the code</h1>
            <p className="mt-1.5 text-sm text-navy-900/60">
              We sent a 6-digit code to <span className="font-medium text-navy-900">{email}</span>.
              Enter it below — once verified, your vote for {team.name} will be counted.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Demo: no real email is sent — open the browser console (F12) to see your code.
            </p>

            <label className="mt-5 block text-xs font-semibold text-navy-900/60">Verification Code</label>
            <div className="mt-2 flex justify-between gap-2">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  maxLength={1}
                  inputMode="numeric"
                  className="h-12 w-11 rounded-lg border border-navy-900/15 text-center text-lg font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ))}
            </div>
            {codeError && <p className="mt-2 text-xs text-red-600">{codeError}</p>}

            <button
              type="button"
              onClick={() => setStage("email")}
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
            >
              ← Change email
            </button>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Verify &amp; Cast Vote
            </button>

            <button
              type="button"
              disabled={resendIn > 0}
              onClick={() => {
                const generated = randomCode();
                setSentCode(generated);
                console.log(`[Demo] New verification code for ${email}: ${generated}`);
                setResendIn(60);
              }}
              className="mt-3 w-full text-center text-xs font-semibold text-navy-900/40 disabled:cursor-not-allowed"
            >
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
            </button>
          </form>
        )}

        {stage === "receipt" && receipt && (
          <div className="rounded-2xl border border-navy-900/10 bg-white p-8 text-center shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl">
              🗳️
            </div>
            <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">Vote counted!</h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-navy-900/60">
              Your vote for {team.name} has been recorded and encrypted. Thank you for participating.
            </p>

            <div className="mt-6 space-y-3 rounded-xl bg-navy-50 bg-navy-900/5 p-4 text-left text-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-900/40">
                Official Vote Receipt
              </h2>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Receipt ID</span>
                <span className="font-mono font-semibold text-navy-900">{receipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Voter</span>
                <span className="font-medium text-navy-900">{receipt.voter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Team voted</span>
                <span className="font-medium text-navy-900">{receipt.team}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Time</span>
                <span className="font-medium text-navy-900">{receipt.time}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 border-t border-navy-900/10 pt-3 text-xs text-emerald-600">
                <ShieldCheck size={14} />
                Ballot encrypted &amp; on record
              </div>
            </div>

            <Link
              to="/"
              className="mt-6 inline-block w-full rounded-lg bg-navy-950 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
            >
              Back to Election Site
            </Link>
            <p className="mt-3 text-xs text-navy-900/40">
              Results published within 24 hours of polls closing Aug 6, 18:00 KST.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

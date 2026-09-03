import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, KeyRound, Check } from "../components/icons";
import { accentMap } from "../data/teams";
import { getTeamById, requestVoteCode, submitVote } from "../lib/api";
import { useApi } from "../hooks/useApi";

export default function VotePage() {
  const { teamId } = useParams();
  const { data: team, loading: teamLoading, error: teamError } = useApi(() => getTeamById(teamId), [teamId])

  const [stage, setStage] = useState("email"); // email | code | receipt
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(60);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (stage !== "code") return;
    if (resendIn <= 0) return;
    const id = setInterval(() => setResendIn((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(id);
  }, [stage, resendIn]);

  if (teamLoading) return <div className="flex min-h-screen items-center justify-center text-navy-900/50">Ачааллаж байна…</div>;
  if (teamError || !team) return <Navigate to="/candidates" replace />;
  const accent = accentMap[team.accent];
  const codeComplete = code.every((d) => d !== "");

  async function handleSendCode(e) {
    e.preventDefault();
    if (!/^[a-zA-Z0-9._%+-]+@hanyang\.ac\.kr$/.test(email)) {
      setEmailError("@hanyang.ac.kr-ээр төгссөн байх ёстой");
      return;
    }
    setEmailError("");
    setSending(true);
    try {
      const res = await requestVoteCode({ email, teamId: team.id });
      setResendIn(res.resendAvailableInSeconds ?? 60);
      setCode(["", "", "", "", "", ""]);
      setCodeError("");
      setStage("code");
    } catch (err) {
      setEmailError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function handleResendCode() {
    if (resendIn > 0) return;
    setSending(true);
    try {
      const res = await requestVoteCode({ email, teamId: team.id });
      setResendIn(res.resendAvailableInSeconds ?? 60);
      setCodeError("");
    } catch (err) {
      setCodeError(err.message);
    } finally {
      setSending(false);
    }
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

  async function handleVerifyCode(e) {
    e.preventDefault();
    const entered = code.join("");
    if (entered.length < 6) {
      setCodeError("6 оронтой кодоо бүтэн оруулна уу.");
      return;
    }
    setCodeError("");
    setVerifying(true);
    try {
      const res = await submitVote({ email, code: entered });
      setReceipt({
        id: res.receiptId,
        voter: email,
        team: res.teamName,
        time: new Date(res.castAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      });
      setStage("receipt");
    } catch (err) {
      setCodeError(err.message);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2FA]">
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-6 py-4 text-sm">
          <Link to="/candidates" className="flex items-center gap-1.5 text-navy-900/60 hover:text-navy-900">
            <ArrowLeft size={16} />
            Буцах
          </Link>
          <span className="text-navy-900/20">|</span>
          <span className="font-semibold text-navy-900">MSA Сонгууль — Саналаа өгөх</span>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-6 py-10">
        {stage !== "receipt" && (
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-white">
                {stage === "email" ? <Mail size={14} /> : <Check size={14} />}
              </span>
              <span className={`text-sm font-semibold ${stage === "email" ? "text-navy-900" : "text-navy-900/40"}`}>
                Имэйл баталгаажуулах
              </span>
            </div>
            <span className="h-px w-8 bg-navy-900/15" />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  stage === "code" ? "bg-navy-950 text-white" : "bg-navy-900/10 text-navy-900/30"
                }`}
              >
                <KeyRound size={14} />
              </span>
              <span className={`text-sm font-semibold ${stage === "code" ? "text-navy-900" : "text-navy-900/40"}`}>
                Код оруулах
              </span>
            </div>
          </div>
        )}

        {stage !== "receipt" && (
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-card">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-900/40">Санал өгөх баг</p>
              <div className="mt-1 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accent.bar}`} />
                <p className="font-semibold text-navy-900">{team.name}</p>
              </div>
              <p className="mt-0.5 text-sm text-navy-900/50">
                {team.president.name} &amp; {team.vp.name}
              </p>
            </div>
            <div className="flex -space-x-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-white ${accent.solid}`}
              >
                {team.president.initials}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/10 text-xs font-semibold text-navy-900/60 ring-2 ring-white">
                {team.vp.initials}
              </span>
            </div>
          </div>
        )}

        {stage === "email" && (
          <form onSubmit={handleSendCode} className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail size={20} />
            </span>
            <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">
              Оюутны имэйлээ баталгаажуулна уу
            </h1>
            <p className="mt-1.5 text-sm text-navy-900/60">
              Ханьян Их Сургуулийн ERICA-ийн имэйл хаягаа оруулна уу. Таныг баталгаажуулахын тулд бид
              6 оронтой код илгээх болно.
            </p>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-navy-900/50">
              Оюутны имэйл
            </label>
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
              <p className="mt-1.5 text-xs text-navy-900/40">@hanyang.ac.kr-ээр төгссөн байх ёстой</p>
            )}

            <button
              type="submit"
              disabled={!email || sending}
              className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {sending ? "Илгээж байна…" : "Баталгаажуулах код илгээх"}
            </button>

            <p className="mt-4 text-center text-xs text-navy-900/40">
              Бүртгэлтэй оюутан тус бүр нэг л удаа санал өгөх боломжтой. Таны санал нууц байна.
            </p>
          </form>
        )}

        {stage === "code" && (
          <form onSubmit={handleVerifyCode} className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <KeyRound size={20} />
            </span>
            <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">Кодоо оруулна уу</h1>
            <p className="mt-1.5 text-sm text-navy-900/60">
              Бид <span className="font-semibold text-navy-900">{email}</span> хаяг руу 6 оронтой код
              илгээлээ. Баталгаажуулсны дараа{" "}
              <span className={`font-semibold ${accent.text}`}>{team.name}</span>-д өгсөн таны санал
              бүртгэгдэнэ.
            </p>

            <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-navy-900/50">
              Баталгаажуулах код
            </label>
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
              type="submit"
              disabled={!codeComplete || verifying}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {verifying ? "Шалгаж байна…" : "Баталгаажуулж, санал өгөх"}
              {!verifying && <Check size={15} />}
            </button>

            <div className="mt-4 flex items-center justify-between text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStage("email")}
                className="flex items-center gap-1 text-navy-900/50 hover:text-navy-900"
              >
                <ArrowLeft size={13} /> Имэйл солих
              </button>
              <button
                type="button"
                disabled={resendIn > 0 || sending}
                onClick={handleResendCode}
                className="text-navy-900/40 disabled:cursor-not-allowed"
              >
                {resendIn > 0 ? `${resendIn}с дараа дахин илгээх` : "Кодыг дахин илгээх"}
              </button>
            </div>
          </form>
        )}

        {stage === "receipt" && receipt && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
              🗳️
            </span>
            <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">Санал тоологдлоо!</h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-navy-900/60">
              {team.name}-д өгсөн таны санал бүртгэгдэж, шифрлэгдлээ. Оролцсонд баярлалаа.
            </p>

            <div className="mt-6 space-y-3 rounded-xl bg-navy-900/5 p-4 text-left text-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-900/40">
                Албан ёсны саналын баримт
              </h2>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Баримтын дугаар</span>
                <span className="font-mono font-semibold text-navy-900">{receipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Санал өгсөн</span>
                <span className="font-medium text-navy-900">{receipt.voter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Санал өгсөн баг</span>
                <span className="font-medium text-navy-900">{receipt.team}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-900/50">Цаг</span>
                <span className="font-medium text-navy-900">{receipt.time}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 border-t border-navy-900/10 pt-3 text-xs text-emerald-600">
                <ShieldCheck size={14} />
                Санал шифрлэгдэж, бүртгэгдсэн
              </div>
            </div>

            <Link
              to="/home"
              className="mt-6 inline-block w-full rounded-lg bg-navy-950 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
            >
              Нүүр хуудас руу буцах
            </Link>
            <p className="mt-3 text-xs text-navy-900/40">
              Санал хураалт 2026 оны 8-р сарын 26-нд 18:00 цагт хаагдсанаас хойш 24 цагийн дотор үр
              дүнг зарлана.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { VOTING_START, VOTING_END, getVotingStatus } from "../lib/election";

function timeLeftUntil(target) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Drives the landing-page countdown through all three election phases:
// counts down to the start before it opens, switches to counting down to
// the close once voting is open, and settles on zero once it's over.
export function useElectionCountdown() {
  const [, forceTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const status = getVotingStatus();
  const target = status === "before" ? VOTING_START : VOTING_END;

  return { status, timeLeft: timeLeftUntil(target) };
}

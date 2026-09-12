import { useEffect, useState } from "react";
import { getVotingStatus } from "../lib/election";

// Re-checks every 30s so a "Санал өгөх" button flips from disabled to
// clickable on its own right at the voting-window boundary, with no reload.
export function useVotingStatus() {
  const [status, setStatus] = useState(() => getVotingStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getVotingStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

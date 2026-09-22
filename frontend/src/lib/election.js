// Single source of truth for the voting window. Voting opens Sep 14, 2026
// 00:00 KST and closes Sep 15, 2026 23:59 KST — matches the dates shown on
// the landing page countdown and the various "hураалт ... нд" copy.
export const VOTING_START = new Date("2026-09-14T00:00:00+09:00");
export const VOTING_END = new Date("2026-09-15T23:59:59+09:00");

export const VOTING_START_LABEL = {
  mn: "2026 оны 9-р сарын 14-ний 00:00 цаг",
  ko: "2026년 9월 14일 00시",
};
export const VOTING_END_LABEL = {
  mn: "2026 оны 9-р сарын 15-ний 23:59 цаг",
  ko: "2026년 9월 15일 23시 59분",
};

/** "before" | "open" | "after" */
export function getVotingStatus(now = new Date()) {
  if (now < VOTING_START) return "before";
  if (now > VOTING_END) return "after";
  return "open";
}

export function isVotingOpen(now = new Date()) {
  return getVotingStatus(now) === "open";
}

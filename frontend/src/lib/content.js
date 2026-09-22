import { teamContentKo } from "../i18n/content-ko";

// Overlays the hand-translated Korean copy (see i18n/content-ko.js) onto a
// team fetched from the API. Falls back field-by-field to the original
// Mongolian content when no translation exists for that team/field —
// e.g. a team not yet translated, or an English-already slogan.
export function localizeTeam(team, lang) {
  if (lang !== "ko" || !team) return team;
  const ko = teamContentKo[team.id];
  if (!ko) return team;

  return {
    ...team,
    name: ko.name ?? team.name,
    slogan: ko.slogan ?? team.slogan,
    president: ko.president ? { ...team.president, ...ko.president } : team.president,
    vp: ko.vp ? { ...team.vp, ...ko.vp } : team.vp,
    initiatives: ko.initiatives ?? team.initiatives,
  };
}

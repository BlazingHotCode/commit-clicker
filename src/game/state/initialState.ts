import type { GameState } from "./types";

export const initialState: GameState = {
  linesOfCode: 0,
  bugs: 0,
  activeBugChallenge: null,
  bugChallengeResult: null,
  reputation: 0,

  offlineLocGained: 0,

  prestigePoints: 0,

  totalLinesOfCode: 0,
  totalBugsFixed: 0,

  locPerClick: 1,
  locPerSecond: 0,
  bugChance: 0.1,
  reputationPerBug: 1,
  locPerBugFixed: 0,

  lastSavedAt: Date.now(),

  upgrades: {
    mechanicalKeyboard: 0,
    autocomplete: 0,
    juniorDev: 0,
    unitTests: 0,
    debugger: 0,
    seniorDev: 0,
    techLead: 0,
    aiCodeAssistant: 0,
  },

  unlockedMilestones: [],

  claimedAchievements: [],

  lifetimeBugsFixed: 0,
  lifetimeProjectsShipped: 0,
  lifetimePrestiges: 0,

  completedProjects: [],
};

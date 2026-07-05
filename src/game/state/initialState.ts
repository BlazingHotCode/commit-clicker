import type { GameState } from "./types";

export const initialState: GameState = {
  linesOfCode: 0,
  bugs: 0,
  reputation: 0,

  totalLinesOfCode: 0,
  totalBugsFixed: 0,

  locPerClick: 1,
  locPerSecond: 0,
  bugChance: 0.1,
  reputationPerBug: 1,

  lastSavedAt: Date.now(),

  upgrades: {
    mechanicalKeyboard: 0,
    autocomplete: 0,
    juniorDev: 0,
    unitTests: 0,
    debugger: 0,
  },

  unlockedMilestones: [],
};

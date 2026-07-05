export type UpgradeId =
  | "mechanicalKeyboard"
  | "autocomplete"
  | "juniorDev"
  | "unitTests"
  | "debugger";

export type GameState = {
  linesOfCode: number;
  bugs: number;
  reputation: number;

  totalLinesofCode: number;
  totalBugsFixed: number;

  locPerClick: number;
  locPerSecond: number;
  bugChance: number;
  reputationPerBug: number;
  upgrades: Record<UpgradeId, number>;
};

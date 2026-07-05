export type UpgradeId =
  | "mechanicalKeyboard"
  | "autocomplete"
  | "juniorDev"
  | "unitTests"
  | "debugger"
  | "seniorDev"
  | "techLead";

export type GameState = {
  linesOfCode: number;
  bugs: number;
  reputation: number;

  totalLinesOfCode: number;
  totalBugsFixed: number;

  locPerClick: number;
  locPerSecond: number;
  bugChance: number;
  reputationPerBug: number;

  lastSavedAt: number;

  upgrades: Record<UpgradeId, number>;

  unlockedMilestones: string[];

  unlockedAchievements: string[];

  completedProjects: string[];
};

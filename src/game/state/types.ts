export type UpgradeId =
  | "mechanicalKeyboard"
  | "autocomplete"
  | "juniorDev"
  | "unitTests"
  | "debugger"
  | "seniorDev"
  | "techLead"
  | "aiCodeAssistant";

export type GameState = {
  linesOfCode: number;
  bugs: number;
  reputation: number;

  prestigePoints: number;

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

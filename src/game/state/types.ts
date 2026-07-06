export type UpgradeId =
  | "mechanicalKeyboard"
  | "autocomplete"
  | "juniorDev"
  | "unitTests"
  | "debugger"
  | "seniorDev"
  | "techLead"
  | "aiCodeAssistant";

export type BugChallenge = {
  correctAnswer: string;
  options: string[];
};

export type GameState = {
  linesOfCode: number;
  bugs: number;
  activeBugChallenge: BugChallenge | null;
  reputation: number;

  offlineLocGained: number;

  prestigePoints: number;

  totalLinesOfCode: number;
  totalBugsFixed: number;

  locPerClick: number;
  locPerSecond: number;
  bugChance: number;
  reputationPerBug: number;
  locPerBugFixed: number;

  lastSavedAt: number;

  upgrades: Record<UpgradeId, number>;

  unlockedMilestones: string[];

  unlockedAchievements: string[];

  completedProjects: string[];
};

import type { GameState } from "../state/types";

export type StatModifiers = {
  locPerClick?: number;
  locPerSecond?: number;
  reputationPerBug?: number;
  bugChance?: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  rewardLabel: string;
  canClaim: (state: GameState) => boolean;
  modifiers: StatModifiers;
};

export const achievements: Achievement[] = [
  {
    id: "firstBug",
    name: "It Works On My Machine",
    description: "Create your first bug.",
    rewardLabel: "+1 reputation / bug",
    canClaim: (state) => state.bugs > 0 || state.totalBugsFixed > 0,
    modifiers: {
      reputationPerBug: 1,
    },
  },
  {
    id: "hundredLoc",
    name: "Hello, Production",
    description: "Write 100 total LOC.",
    rewardLabel: "+1 LOC / click",
    canClaim: (state) => state.totalLinesOfCode >= 100,
    modifiers: {
      locPerClick: 1,
    },
  },
  {
    id: "tenBugsFixed",
    name: "Bug Whisperer",
    description: "Fix 10 bugs",
    rewardLabel: "-2% bug chance",
    canClaim: (state) => state.totalBugsFixed >= 10,
    modifiers: {
      bugChance: -0.02,
    },
  },
  {
    id: "fiftyBugsFixed",
    name: "Production Firefighter",
    description: "Fix 50 bugs.",
    rewardLabel: "+3 reputation / bug",
    canClaim: (state) => state.totalBugsFixed >= 50,
    modifiers: {
      reputationPerBug: 3,
    },
  },
  {
    id: "hundredLocPerSecond",
    name: "Automation Engine",
    description: "Reach 100 LOC per second.",
    rewardLabel: "+20 LOC / second",
    canClaim: (state) => state.locPerSecond >= 100,
    modifiers: {
      locPerSecond: 20,
    },
  },
  {
    id: "firstProject",
    name: "Shipped It",
    description: "Ship your first project.",
    rewardLabel: "+1 LOC / second",
    canClaim: (state) => state.completedProjects.length >= 1,
    modifiers: {
      locPerSecond: 1,
    },
  },
  {
    id: "threeProjects",
    name: "Shipping Streak",
    description: "Ship 3 projects.",
    rewardLabel: "+2 LOC / click",
    canClaim: (state) => state.completedProjects.length >= 3,
    modifiers: {
      locPerClick: 2,
    },
  },
  {
    id: "fiveProjects",
    name: "Product Machine",
    description: "Ship 5 projects.",
    rewardLabel: "+10 LOC / second",
    canClaim: (state) => state.completedProjects.length >= 5,
    modifiers: {
      locPerSecond: 10,
    },
  },
];

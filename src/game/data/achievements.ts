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
  bonusLabel: string;
  isUnlocked: (state: GameState) => boolean;
  modifiers: StatModifiers;
};

export const achievements: Achievement[] = [
  {
    id: "firstBug",
    name: "It Works On My Machine",
    description: "Create your first bug.",
    bonusLabel: "+1 reputation / bug",
    isUnlocked: (state) => state.bugs > 0 || state.totalBugsFixed > 0,
    modifiers: {
      reputationPerBug: 1,
    },
  },
  {
    id: "hundredLoc",
    name: "Hello, Production",
    description: "Write 100 total LOC.",
    bonusLabel: "+1 LOC / click",
    isUnlocked: (state) => state.totalLinesOfCode >= 100,
    modifiers: {
      locPerClick: 1,
    },
  },
  {
    id: "tenBugsFixed",
    name: "Bug Whisperer",
    description: "Fix 10 bugs",
    bonusLabel: "-2% bug chance",
    isUnlocked: (state) => state.totalBugsFixed >= 10,
    modifiers: {
      bugChance: -0.02,
    },
  },
  {
    id: "fiftyBugsFixed",
    name: "Production Firefighter",
    description: "Fix 50 bugs.",
    bonusLabel: "+3 reputation / bug",
    isUnlocked: (state) => state.totalBugsFixed >= 50,
    modifiers: {
      reputationPerBug: 3,
    },
  },
  {
    id: "firstProject",
    name: "Shipped It",
    description: "Ship your first project.",
    bonusLabel: "+1 LOC / second",
    isUnlocked: (state) => state.completedProjects.length >= 1,
    modifiers: {
      locPerSecond: 1,
    },
  },
  {
    id: "threeProjects",
    name: "Shipping Streak",
    description: "Ship 3 projects.",
    bonusLabel: "+2 LOC / click",
    isUnlocked: (state) => state.completedProjects.length >= 3,
    modifiers: {
      locPerClick: 2,
    },
  },
  {
    id: "fiveProjects",
    name: "Product Machine",
    description: "Ship 5 projects.",
    bonusLabel: "+10 LOC / second",
    isUnlocked: (state) => state.completedProjects.length >= 5,
    modifiers: {
      locPerSecond: 10,
    },
  },
];

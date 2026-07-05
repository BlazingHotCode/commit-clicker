import type { GameState } from "../state/types";

export type Milestone = {
  id: string;
  name: string;
  description: string;
  requiredTotalLoc?: number;
  isUnlocked?: (state: GameState) => boolean;
};

export const milestones: Milestone[] = [
  {
    id: "githubRepo",
    name: "GitHub Repo",
    description: "You published your first repo.",
    requiredTotalLoc: 100,
  },
  {
    id: "firstApp",
    name: "First App",
    description: "Your project is now usable.",
    requiredTotalLoc: 1_000,
  },
  {
    id: "startup",
    name: "Tiny Startup",
    description: "You accidentally became a founder.",
    requiredTotalLoc: 10_000,
  },
  {
    id: "scaleUp",
    name: "Scale Up",
    description: "You wrote 100,000 total LOC.",
    requiredTotalLoc: 100_000,
  },
  {
    id: "projectStudio",
    name: "Project Studio",
    description: "You shipped 3 projects.",
    isUnlocked: (state) => state.completedProjects.length >= 3,
  },
  {
    id: "shippingDepartment",
    name: "Shipping Department",
    description: "You shipped 5 projects.",
    isUnlocked: (state) => state.completedProjects.length >= 5,
  },
  {
    id: "prestigeReady",
    name: "Ready For Fame",
    description: "Earn your first prestige point.",
    isUnlocked: (state) => state.prestigePoints >= 1,
  },
];

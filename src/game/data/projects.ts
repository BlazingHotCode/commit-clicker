import type { GameState } from "../state/types";

export type Project = {
  id: string;
  name: string;
  description: string;
  locCost: number;
  reputationCost: number;
  requiredProjectIds?: string[];
  rewardLabel: string;
  applyReward: (state: GameState) => GameState;
};

export const projects: Project[] = [
  {
    id: "personalWebsite",
    name: "Personal Website",
    description:
      "Ship a small portfolio site to prove you can deploy something.",
    locCost: 250,
    reputationCost: 3,
    rewardLabel: "+1 LOC / second",
    applyReward: (state) => ({
      ...state,
      locPerSecond: state.locPerSecond + 1,
    }),
  },
  {
    id: "todoApp",
    name: "Todo App",
    description: "Build the classic app every developer ships at least once.",
    locCost: 1_000,
    reputationCost: 8,
    requiredProjectIds: ["personalWebsite"],
    rewardLabel: "+3 LOC / click",
    applyReward: (state) => ({
      ...state,
      locPerClick: state.locPerClick + 3,
    }),
  },
  {
    id: "bugTracker",
    name: "Bug Tracker",
    description: "Build a tool to track the bugs you keep creating.",
    locCost: 3_000,
    reputationCost: 15,
    requiredProjectIds: ["todoApp"],
    rewardLabel: "-2% bug chance, +2 LOC / second",
    applyReward: (state) => ({
      ...state,
      bugChance: Math.max(0.01, state.bugChance - 0.02),
      locPerSecond: state.locPerSecond + 2,
    }),
  },
  {
    id: "openSourceLibrary",
    name: "Open Source Library",
    description:
      "Release a useful package and watch other developers start trusting your work.",
    locCost: 8_000,
    reputationCost: 30,
    requiredProjectIds: ["bugTracker"],
    rewardLabel: "+3 reputation / bug",
    applyReward: (state) => ({
      ...state,
      reputationPerBug: state.reputationPerBug + 3,
    }),
  },
  {
    id: "saasDashboard",
    name: "SaaS Dashboard",
    description:
      "Build a polished dashboard with charts, billing, and user management.",
    locCost: 20_000,
    reputationCost: 75,
    requiredProjectIds: ["openSourceLibrary"],
    rewardLabel: "+15 LOC / second",
    applyReward: (state) => ({
      ...state,
      locPerSecond: state.locPerSecond + 15,
    }),
  },
  {
    id: "deploymentPlatform",
    name: "Deployment Platform",
    description:
      "Automate deployments so every commit can reach production faster.",
    locCost: 50_000,
    reputationCost: 150,
    requiredProjectIds: ["saasDashboard"],
    rewardLabel: "+25 LOC / click, +25 LOC / second",
    applyReward: (state) => ({
      ...state,
      locPerClick: state.locPerClick + 25,
      locPerSecond: state.locPerSecond + 25,
    }),
  },
];

import type { GameState, UpgradeId } from "../state/types";

export type Upgrade = {
  id: UpgradeId;
  name: string;
  description: string;
  effectLabel: string;
  baseCost: number;
  costMultiplier: number;
  requiredProjectIds?: string[];
  apply: (state: GameState) => GameState;
};

export const upgrades: Upgrade[] = [
  {
    id: "mechanicalKeyboard",
    name: "Mechanical Keyboard",
    description: "+1 LOC per click",
    effectLabel: "+1 LOC / click",
    baseCost: 10,
    costMultiplier: 1.35,
    apply: (state) => ({
      ...state,
      locPerClick: state.locPerClick + 1,
    }),
  },
  {
    id: "autocomplete",
    name: "Autocomplete",
    description: "+5 LOC per click",
    effectLabel: "+5 LOC / click",
    baseCost: 75,
    costMultiplier: 1.45,
    apply: (state) => ({
      ...state,
      locPerClick: state.locPerClick + 5,
    }),
  },
  {
    id: "juniorDev",
    name: "Junior Dev",
    description: "+1 LOC per second",
    effectLabel: "+1 LOC / second",
    baseCost: 100,
    costMultiplier: 1.5,
    requiredProjectIds: ["personalWebsite"],
    apply: (state) => ({
      ...state,
      locPerSecond: state.locPerSecond + 1,
    }),
  },
  {
    id: "unitTests",
    name: "Unit Tests",
    description: "Reduces bug chance",
    effectLabel: "-1% bug chance",
    baseCost: 150,
    costMultiplier: 1.6,
    requiredProjectIds: ["todoApp"],
    apply: (state) => ({
      ...state,
      bugChance: Math.max(0.01, state.bugChance - 0.01),
    }),
  },
  {
    id: "debugger",
    name: "Debugger",
    description: "+1 reputation per fixed bug",
    effectLabel: "+1 reputation / bug",
    baseCost: 200,
    costMultiplier: 1.55,
    requiredProjectIds: ["bugTracker"],
    apply: (state) => ({
      ...state,
      reputationPerBug: state.reputationPerBug + 1,
    }),
  },
  {
    id: "seniorDev",
    name: "Senior Dev",
    description: "+10 LOC per second",
    effectLabel: "+10 LOC / second",
    baseCost: 5_000,
    costMultiplier: 1.7,
    requiredProjectIds: ["openSourceLibrary"],
    apply: (state) => ({
      ...state,
      locPerSecond: state.locPerSecond + 10,
    }),
  },
  {
    id: "techLead",
    name: "Tech Lead",
    description: "+50 LOC per second",
    effectLabel: "+50 LOC / second",
    baseCost: 25_000,
    costMultiplier: 1.8,
    requiredProjectIds: ["saasDashboard"],
    apply: (state) => ({
      ...state,
      locPerSecond: state.locPerSecond + 50,
    }),
  },
  {
    id: "aiCodeAssistant",
    name: "AI Code Assistant",
    description: "+100 LOC per click, +100 LOC per second, but +10% bug chance",
    effectLabel: "+100 LOC / click, +100 LOC / second, +10% bug chance",
    baseCost: 100_000,
    costMultiplier: 2,
    requiredProjectIds: ["deploymentPlatform"],
    apply: (state) => ({
      ...state,
      locPerClick: state.locPerClick + 100,
      locPerSecond: state.locPerSecond + 100,
      bugChance: state.bugChance + 0.1,
    }),
  },
];

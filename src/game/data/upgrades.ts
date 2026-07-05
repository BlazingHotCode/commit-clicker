import type { UpgradeId } from "../state/types";

export type Upgrade = {
  id: UpgradeId;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  effectLabel: string;
};

export const upgrades: Upgrade[] = [
  {
    id: "mechanicalKeyboard",
    name: "Mechanical Keyboard",
    description: "+1 LOC per click",
    baseCost: 10,
    costMultiplier: 1.35,
    effectLabel: "+1 LOC / click",
  },
  {
    id: "autocomplete",
    name: "Autocomplete",
    description: "+5 LOC per click",
    baseCost: 75,
    costMultiplier: 1.45,
    effectLabel: "+5 LOC / click",
  },
  {
    id: "juniorDev",
    name: "Junior Dev",
    description: "+1 LOC per second",
    baseCost: 100,
    costMultiplier: 1.5,
    effectLabel: "+1 LOC / second",
  },
  {
    id: "unitTests",
    name: "Unit Tests",
    description: "Reduces bug chance",
    baseCost: 150,
    costMultiplier: 1.6,
    effectLabel: "-1% bug chance",
  },
  {
    id: "debugger",
    name: "Debugger",
    description: "+1 reputation per fixed bug",
    baseCost: 200,
    costMultiplier: 1.55,
    effectLabel: "+1 reputation / bug",
  },
];

import type { GameState } from "../state/types";

export type Achievement = {
  id: string;
  name: string;
  description: string;
  isUnlocked: (state: GameState) => boolean;
};

export const achievements: Achievement[] = [
  {
    id: "firstBug",
    name: "It Works On My Machine",
    description: "Create your first bug.",
    isUnlocked: (state) => state.bugs > 0 || state.totalBugsFixed > 0,
  },
  {
    id: "hundredLoc",
    name: "Hello, Production",
    description: "Write 1-- total LOC.",
    isUnlocked: (state) => state.totalLinesOfCode >= 100,
  },
  {
    id: "tenBugsFixed",
    name: "Bug Whisperer",
    description: "Fix 10 bugs",
    isUnlocked: (state) => state.totalBugsFixed >= 10,
  },
];

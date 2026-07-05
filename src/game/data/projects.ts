import type { GameState } from "../state/types";

export type Project = {
  id: string;
  name: string;
  description: string;
  locCost: number;
  reputationCost: number;
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
];

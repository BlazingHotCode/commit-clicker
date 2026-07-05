import { achievements } from "../data/achievements";
import type { GameState } from "../state/types";

export function getEffectiveStats(state: GameState) {
  let locPerClick = state.locPerClick;
  let locPerSecond = state.locPerSecond;
  let reputationPerBug = state.reputationPerBug;
  let bugChance = state.bugChance;

  const prestigeMultiplier = 1 + state.prestigePoints * 0.05;

  for (const achievement of achievements) {
    if (!achievement.isUnlocked(state)) continue;

    locPerClick += achievement.modifiers.locPerClick ?? 0;

    locPerSecond += achievement.modifiers.locPerSecond ?? 0;

    reputationPerBug += achievement.modifiers.reputationPerBug ?? 0;

    bugChance += achievement.modifiers.bugChance ?? 0;
  }

  return {
    locPerClick: locPerClick * prestigeMultiplier,
    locPerSecond: locPerSecond * prestigeMultiplier,
    reputationPerBug,
    bugChance: Math.max(0.01, bugChance),
  };
}

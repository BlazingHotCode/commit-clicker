import type { GameState } from "../state/types";
import { getEffectiveStats } from "./stats";

export function applyTick(state: GameState, deltaSeconds: number): GameState {
  const stats = getEffectiveStats(state)
  const gained = stats.locPerSecond * deltaSeconds;

  return {
    ...state,
    linesOfCode: state.linesOfCode + gained,
    totalLinesOfCode: state.totalLinesOfCode + gained,
  };
}

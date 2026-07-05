import type { GameState } from "../state/types";

export function applyTick(state: GameState, deltaSeconds: number): GameState {
  const gained = state.locPerSecond * deltaSeconds;

  return {
    ...state,
    linesOfCode: state.linesOfCode + gained,
    totalLinesOfCode: state.totalLinesOfCode + gained,
  };
}

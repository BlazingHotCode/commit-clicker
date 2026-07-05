import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

const SAVE_KEY = "commit-clicker-save";

export function saveGame(state: GameState) {
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        ...state,
        lastSavedAt: Date.now(),
      }),
    );
  } catch (error) {
    console.error("Failed to save game:", error);
  }
}

export function loadGame(): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) return initialState;

    const parsed = {
      ...initialState,
      ...JSON.parse(saved),
    };

    const now = Date.now();
    const secondsAway = Math.floor((now - parsed.lastSavedAt) / 1000);
    const cappedSecondsAway = Math.min(secondsAway, 60 * 60 * 8);
    const offlineLoc = parsed.locPerSecond * cappedSecondsAway;

    return {
      ...parsed,
      linesOfCode: parsed.linesOfCode + offlineLoc,
      totalLinesOfCode: parsed.totalLinesOfCode + offlineLoc,
      lastSavedAt: now,
    };
  } catch (error) {
    console.error("Failed to load game:", error);
    return initialState;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

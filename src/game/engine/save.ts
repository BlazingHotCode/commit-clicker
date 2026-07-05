import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

const SAVE_KEY = "commit-clicker-save";

export function saveGame(state: GameState) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadGame(): GameState {
  const saved = localStorage.getItem(SAVE_KEY);

  if (!saved) return initialState;

  try {
    return {
      ...initialState,
      ...JSON.parse(saved),
    };
  } catch {
    return initialState;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

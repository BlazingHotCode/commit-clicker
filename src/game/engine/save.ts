import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

const SAVE_KEY = "commit-clicker-save";

export function saveGame(state: GameState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error("Failed to save game:", error)
  }
}

export function loadGame(): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) return initialState;

    return {
      ...initialState,
      ...JSON.parse(saved),
    };
  } catch (error) {
    console.error("Failed to load game:", error)
    return initialState;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

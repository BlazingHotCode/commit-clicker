import { useEffect } from "react";
import type { GameState } from "../game/state/types";
import { saveGame } from "../game/engine/save";

export function useAutoSave(state: GameState) {
  useEffect(() => {
    const interval = window.setInterval(() => {
      saveGame(state);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [state]);
}

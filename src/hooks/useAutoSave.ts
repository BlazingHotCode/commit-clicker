import { useEffect, useRef } from "react";
import type { GameState } from "../game/state/types";
import { saveGame } from "../game/engine/save";

export function useAutoSave(state: GameState) {
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      saveGame(stateRef.current);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);
}

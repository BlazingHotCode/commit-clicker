import { useEffect, useRef, type Dispatch } from "react";
import type { GameAction } from "../game/state/actions";

export function useGameLoop(dispatch: Dispatch<GameAction>) {
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();
      const deltaSeconds = (now - lastTickRef.current) / 1000;

      lastTickRef.current = now;

      dispatch({ type: "TICK", deltaSeconds });
    }, 250);

    return () => window.clearInterval(interval);
  }, [dispatch]);
}

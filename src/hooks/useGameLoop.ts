import { useEffect, type Dispatch } from "react";
import type { GameAction } from "../game/state/actions";

export function useGameLoop(dispatch: Dispatch<GameAction>) {
  useEffect(() => {
    const interval = window.setInterval(() => {
      dispatch({ type: "TICK", deltaSeconds: 1 });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [dispatch]);
}

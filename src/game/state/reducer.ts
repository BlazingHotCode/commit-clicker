import type { GameAction } from "./actions";
import { initialState } from "./initialState";
import type { GameState } from "./types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "WRITE_CODE": {
      const gained = state.locPerClick;
      const createBug = Math.random() < state.bugChance;

      return {
        ...state,
        linesOfCode: state.linesOfCode + gained,
        totalLinesOfCode: state.totalLinesOfCode + gained,
        bugs: createBug ? state.bugs + 1 : state.bugs,
      };
    }

    case "FIX_BUG": {
      if (state.bugs <= 0) return state;

      return {
        ...state,
        bugs: state.bugs - 1,
        reputation: state.reputation + state.reputationPerBug,
        totalBugsFixed: state.totalBugsFixed + 1,
      };
    }

    case "TICK": {
      const gained = state.locPerSecond + action.deltaSeconds;

      return {
        ...state,
        linesOfCode: state.linesOfCode + gained,
        totalLinesOfCode: state.totalLinesOfCode + gained,
      };
    }

    case "LOAD_GAME":
      return action.state;

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

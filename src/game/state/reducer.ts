import { upgrades } from "../data/upgrades";
import { getUpgradeCost } from "../engine/formulas";
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

    case "BUY_UPGRADE": {
      const upgrade = upgrades.find((item) => item.id === action.upgradeId);
      if (!upgrade) return state;

      const currentLevel = state.upgrades[action.upgradeId];
      const cost = getUpgradeCost(upgrade, currentLevel);

      if (state.linesOfCode < cost) return state;

      const nextState: GameState = {
        ...state,
        linesOfCode: state.linesOfCode - cost,
        upgrades: {
          ...state.upgrades,
          [action.upgradeId]: currentLevel + 1,
        },
      };

      switch (action.upgradeId) {
        case "mechanicalKeyboard":
          return {
            ...nextState,
            locPerClick: nextState.locPerClick + 1,
          };

        case "autocomplete":
          return {
            ...nextState,
            locPerClick: nextState.locPerClick + 5,
          };

        case "juniorDev":
          return {
            ...nextState,
            locPerClick: nextState.locPerSecond + 1,
          };

        case "unitTests":
          return {
            ...nextState,
            bugChance: Math.max(0.01, nextState.bugChance - 0.01),
          };

        case "debugger":
          return {
            ...nextState,
            reputationPerBug: nextState.reputationPerBug + 1,
          };

        default:
          return nextState;
      }
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

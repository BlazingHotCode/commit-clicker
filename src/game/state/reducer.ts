import { projects } from "../data/projects";
import { upgrades } from "../data/upgrades";
import { getUpgradeCost } from "../engine/formulas";
import { getEffectiveStats } from "../engine/stats";
import { applyTick } from "../engine/tick";
import type { GameAction } from "./actions";
import { initialState } from "./initialState";
import type { GameState } from "./types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "WRITE_CODE": {
      const stats = getEffectiveStats(state);
      const gained = stats.locPerClick;
      const createBug = Math.random() < stats.bugChance;

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
        reputation:
          state.reputation + getEffectiveStats(state).reputationPerBug,
        totalBugsFixed: state.totalBugsFixed + 1,
      };
    }

    case "REFACTOR_CODE": {
      const reputationCost = 5;
      const bugsRemoved = 3;

      if (state.reputation < reputationCost) return state;
      if (state.bugs <= 0) return state;

      return {
        ...state,
        reputation: state.reputation - reputationCost,
        bugs: Math.max(0, state.bugs - bugsRemoved),
      };
    }

    case "BUY_UPGRADE": {
      const upgrade = upgrades.find((item) => item.id === action.upgradeId);
      if (!upgrade) return state;

      const unlocked =
        upgrade.requiredProjectIds?.every((projectId) =>
          state.completedProjects.includes(projectId),
        ) ?? true;

      if (!unlocked) return state;

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

      return upgrade.apply(nextState);
    }

    case "SHIP_PROJECT": {
      const project = projects.find(
        (project) => project.id === action.projectId,
      );

      if (!project) return state;
      if (state.completedProjects.includes(project.id)) return state;

      const unlocked =
        project.requiredProjectIds?.every((projectId) =>
          state.completedProjects.includes(projectId),
        ) ?? true;

      if (!unlocked) return state;
      if (state.linesOfCode < project.locCost) return state;
      if (state.reputation < project.reputationCost) return state;

      const nextState: GameState = {
        ...state,
        linesOfCode: state.linesOfCode - project.locCost,
        reputation: state.reputation - project.reputationCost,
        completedProjects: [...state.completedProjects, project.id],
      };

      return project.applyReward(nextState);
    }

    case "TICK": {
      return applyTick(state, action.deltaSeconds);
    }

    case "LOAD_GAME":
      return action.state;

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

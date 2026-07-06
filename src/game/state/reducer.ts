import { projects } from "../data/projects";
import { upgrades } from "../data/upgrades";
import { getUpgradeCost } from "../engine/formulas";
import { getEffectiveStats } from "../engine/stats";
import { applyTick } from "../engine/tick";
import type { GameAction } from "./actions";
import { initialState } from "./initialState";
import type { GameState } from "./types";

const bugChallengeOptions = [
  "Null reference",
  "Off-by-one error",
  "Race condition",
  "Missing dependency",
];

function createBugChallenge() {
  const correctAnswer =
    bugChallengeOptions[Math.floor(Math.random() * bugChallengeOptions.length)];

  return {
    correctAnswer,
    options: bugChallengeOptions,
  };
}

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

    case "START_BUG_CHALLENGE": {
      if (state.bugs <= 0) return state;
      if (state.activeBugChallenge) return state;

      return {
        ...state,
        activeBugChallenge: createBugChallenge(),
      };
    }

    case "ANSWER_BUG_CHALLENGE": {
      if (!state.activeBugChallenge) return state;

      const correct = action.answer === state.activeBugChallenge.correctAnswer;

      if (!correct) {
        return {
          ...state,
          bugs: state.bugs + 1,
          activeBugChallenge: null,
        };
      }

      const stats = getEffectiveStats(state);

      return {
        ...state,
        bugs: Math.max(0, state.bugs - 1),
        linesOfCode: state.linesOfCode + state.locPerBugFixed,
        totalLinesOfCode: state.totalLinesOfCode + state.locPerBugFixed,
        reputation: state.reputation + stats.reputationPerBug,
        totalBugsFixed: state.totalBugsFixed + 1,
        activeBugChallenge: null,
      };
    }

    case "FIX_BUG": {
      if (state.bugs <= 0) return state;

      return {
        ...state,
        bugs: state.bugs - 1,
        linesOfCode: state.linesOfCode + state.locPerBugFixed,
        totalLinesOfCode: state.totalLinesOfCode + state.locPerBugFixed,
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

    case "PRESTIGE": {
      const earnedPrestigePoints = state.totalLinesOfCode / 100_000;

      if (earnedPrestigePoints <= 0) return state;

      return {
        ...initialState,
        prestigePoints: state.prestigePoints + earnedPrestigePoints,
        lastSavedAt: Date.now(),
      };
    }

    case "TICK": {
      return applyTick(state, action.deltaSeconds);
    }

    case "LOAD_GAME":
      return action.state;

    case "RESET_GAME":
      return initialState;

    case "DEBUG_ADD_LOC": {
      const amount = Math.max(0, action.amount);

      return {
        ...state,
        linesOfCode: state.linesOfCode + amount,
        totalLinesOfCode: state.totalLinesOfCode + amount,
      };
    }

    case "DEBUG_ADD_REPUTATION": {
      return {
        ...state,
        reputation: state.reputation + Math.max(0, action.amount),
      };
    }

    case "DEBUG_ADD_BUGS": {
      return {
        ...state,
        bugs: state.bugs + Math.max(0, action.amount),
      };
    }

    case "DEBUG_SET_PRESTIGE_POINTS": {
      return {
        ...state,
        prestigePoints: Math.max(0, action.amount),
      };
    }

    case "DEBUG_COMPLETE_PROJECTS": {
      return {
        ...state,
        completedProjects: projects.map((project) => project.id),
      };
    }

    case "DEBUG_SET_LOC_PER_CLICK": {
      return {
        ...state,
        locPerClick: Math.max(0, action.amount),
      };
    }

    case "DEBUG_SET_LOC_PER_SECOND": {
      return {
        ...state,
        locPerSecond: Math.max(0, action.amount),
      };
    }

    case "DEBUG_SET_REPUTATION_PER_BUG": {
      return {
        ...state,
        reputationPerBug: Math.max(0, action.amount),
      };
    }

    case "DEBUG_SET_BUG_CHANCE": {
      return {
        ...state,
        bugChance: Math.max(0, Math.min(1, action.amount)),
      };
    }

    default:
      return state;
  }
}

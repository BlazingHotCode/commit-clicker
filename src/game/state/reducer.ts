import { projects } from "../data/projects";
import { upgrades } from "../data/upgrades";
import { getUpgradeCost } from "../engine/formulas";
import { getEffectiveStats } from "../engine/stats";
import { applyTick } from "../engine/tick";
import type { GameAction } from "./actions";
import { initialState } from "./initialState";
import type { BugChallenge, GameState } from "./types";

const bugChallenges: BugChallenge[] = [
  {
    symptom: "The app crashes only when a saved value is missing.",
    options: [
      {
        label: "Add a fallback before reading the saved value",
        result: "correct",
      },
      { label: "Rename the save key", result: "wrong" },
      { label: "Delete the save loading code", result: "bad" },
    ],
  },
  {
    symptom: "A list shows every item except the last one.",
    options: [
      {
        label: "Check the loop boundary or slice end index",
        result: "correct",
      },
      { label: "Increase the font size", result: "wrong" },
      { label: "Skip rendering the list", result: "bad" },
    ],
  },
  {
    symptom: "Clicking once sometimes submits the same action twice.",
    options: [
      { label: "Check for duplicate event handlers", result: "correct" },
      { label: "Change the button color", result: "wrong" },
      { label: "Run the action on every render", result: "bad" },
    ],
  },
  {
    symptom: "Numbers slowly drift into decimals when they should stay whole.",
    options: [
      {
        label: "Round only display values, not the stored state",
        result: "correct",
      },
      { label: "Convert every number to text", result: "wrong" },
      { label: "Store all values as random integers", result: "bad" },
    ],
  },
  {
    symptom: "A UI panel is empty on mobile but works on desktop.",
    options: [
      {
        label: "Check responsive display rules and selected mobile tab",
        result: "correct",
      },
      { label: "Increase the desktop max width", result: "wrong" },
      { label: "Hide all panels on small screens", result: "bad" },
    ],
  },
];

function createBugChallenge() {
  return bugChallenges[Math.floor(Math.random() * bugChallenges.length)];
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
        bugChallengeResult: null,
      };
    }

    case "ANSWER_BUG_CHALLENGE": {
      if (!state.activeBugChallenge) return state;

      const selectedOption = state.activeBugChallenge.options.find(
        (option) => option.label === action.answer,
      );

      if (!selectedOption) return state;

      if (selectedOption.result === "wrong") {
        return {
          ...state,
          activeBugChallenge: null,
          bugChallengeResult: "wrong",
        };
      }

      if (selectedOption.result === "bad") {
        return {
          ...state,
          bugs: state.bugs + 1,
          activeBugChallenge: null,
          bugChallengeResult: "bad",
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
        lifetimeBugsFixed: state.lifetimeBugsFixed + 1,
        activeBugChallenge: null,
        bugChallengeResult: "correct",
      };
    }

    case "CLEAR_BUG_CHALLENGE_RESULT":
      return {
        ...state,
        bugChallengeResult: null,
      };

    case "REFACTOR_CODE": {
      const reputationCost = 5;

      if (state.reputation < reputationCost) return state;

      return {
        ...state,
        reputation: state.reputation - reputationCost,
        locPerBugFixed: state.locPerBugFixed + 1,
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
        lifetimeProjectsShipped: state.lifetimeProjectsShipped + 1,
      };

      return project.applyReward(nextState);
    }

    case "PRESTIGE": {
      const earnedPrestigePoints = state.totalLinesOfCode / 100_000;

      if (earnedPrestigePoints <= 0) return state;

      return {
        ...initialState,
        prestigePoints: state.prestigePoints + earnedPrestigePoints,
        claimedAchievements: state.claimedAchievements,
        lifetimeBugsFixed: state.lifetimeBugsFixed,
        lifetimeProjectsShipped: state.lifetimeProjectsShipped,
        lifetimePrestiges: state.lifetimePrestiges + 1,
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

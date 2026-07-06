import type { GameState, UpgradeId } from "./types";

export type GameAction =
  | { type: "WRITE_CODE" }
  | { type: "FIX_BUG" }
  | { type: "REFACTOR_CODE" }
  | { type: "START_BUG_CHALLENGE" }
  | { type: "ANSWER_BUG_CHALLENGE"; answer: string }
  | { type: "CLEAR_BUG_CHALLENGE_RESULT" }
  | { type: "BUY_UPGRADE"; upgradeId: UpgradeId }
  | { type: "SHIP_PROJECT"; projectId: string }
  | { type: "PRESTIGE" }
  | { type: "TICK"; deltaSeconds: number }
  | { type: "LOAD_GAME"; state: GameState }
  | { type: "RESET_GAME" }
  | { type: "DEBUG_ADD_LOC"; amount: number }
  | { type: "DEBUG_ADD_REPUTATION"; amount: number }
  | { type: "DEBUG_ADD_BUGS"; amount: number }
  | { type: "DEBUG_SET_PRESTIGE_POINTS"; amount: number }
  | { type: "DEBUG_COMPLETE_PROJECTS" }
  | { type: "DEBUG_SET_LOC_PER_CLICK"; amount: number }
  | { type: "DEBUG_SET_LOC_PER_SECOND"; amount: number }
  | { type: "DEBUG_SET_REPUTATION_PER_BUG"; amount: number }
  | { type: "DEBUG_SET_BUG_CHANCE"; amount: number };

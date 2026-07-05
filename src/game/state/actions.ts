import type { GameState, UpgradeId } from "./types";

export type GameAction =
  | { type: "WRITE_CODE" }
  | { type: "FIX_BUG" }
  | { type: "BUY_UPGRADE"; upgradeId: UpgradeId }
  | { type: "SHIP_PROJECT"; projectId: string }
  | { type: "TICK"; deltaSeconds: number }
  | { type: "LOAD_GAME"; state: GameState }
  | { type: "RESET_GAME" };

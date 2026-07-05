import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

export function createSaveState(saved: Partial<GameState>): GameState {
  return {
    ...initialState,
    ...saved,
    upgrades: {
      ...initialState.upgrades,
      ...saved.upgrades,
    },
    unlockedMilestones: saved.unlockedMilestones ?? [],
    unlockedAchievements: saved.unlockedAchievements ?? [],
    lastSavedAt: saved.lastSavedAt ?? Date.now(),
    completedProjects: saved.completedProjects ?? [],
  };
}

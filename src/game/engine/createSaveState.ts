import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

export function createSaveState(saved: Partial<GameState>): GameState {
  return {
    ...initialState,
    ...saved,
    prestigePoints: saved.prestigePoints ?? 0,
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

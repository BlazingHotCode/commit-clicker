import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

export function createSaveState(saved: Partial<GameState>): GameState {
  return {
    ...initialState,
    ...saved,
    activeBugChallenge: saved.activeBugChallenge ?? null,
    offlineLocGained: saved.offlineLocGained ?? 0,
    prestigePoints: saved.prestigePoints ?? 0,
    locPerBugFixed: saved.locPerBugFixed ?? 0,
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

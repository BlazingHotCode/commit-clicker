import { initialState } from "../state/initialState";
import type { GameState } from "../state/types";

export function createSaveState(saved: Partial<GameState>): GameState {
  return {
    ...initialState,
    ...saved,
    activeBugChallenge: saved.activeBugChallenge ?? null,
    bugChallengeResult: saved.bugChallengeResult ?? null,
    offlineLocGained: saved.offlineLocGained ?? 0,
    prestigePoints: saved.prestigePoints ?? 0,
    locPerBugFixed: saved.locPerBugFixed ?? 0,
    upgrades: {
      ...initialState.upgrades,
      ...saved.upgrades,
    },
    unlockedMilestones: saved.unlockedMilestones ?? [],
    claimedAchievements: saved.claimedAchievements ?? [],
    lifetimeBugsFixed: saved.lifetimeBugsFixed ?? 0,
    lifetimeProjectsShipped: saved.lifetimeProjectsShipped ?? 0,
    lifetimePrestiges: saved.lifetimePrestiges ?? 0,
    lastSavedAt: saved.lastSavedAt ?? Date.now(),
    completedProjects: saved.completedProjects ?? [],
  };
}

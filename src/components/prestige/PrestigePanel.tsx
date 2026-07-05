import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type PrestigePanelProps = {
  state: GameState;
  onPrestige: () => void;
};

export function PrestigePanel({ state, onPrestige }: PrestigePanelProps) {
  const earnedPrestigePoints = state.totalLinesOfCode / 100_000;
  const canPrestige = earnedPrestigePoints >= 1;
  const currentBonus = state.prestigePoints * 5;
  const nextBonus = (state.prestigePoints + earnedPrestigePoints) * 5;

  if (state.prestigePoints <= 0 && !canPrestige) return null;

  return (
    <section>
      <h2>Prestige</h2>

      <article>
        <h3>Reset for permanent speed</h3>

        <p>
          Prestige resets your current run, upgrades, projects, bugs, and
          reputation.
        </p>

        <p>
          You will gain <strong>{formatNumber(earnedPrestigePoints)}</strong>{" "}
          prestige points.
        </p>

        <p>
          LOC bonus: <strong>+{formatNumber(currentBonus)}%</strong> to{" "}
          <strong>+{formatNumber(nextBonus)}%</strong>
        </p>

        <button disabled={!canPrestige} onClick={onPrestige}>
          {canPrestige ? "Prestige Now" : "Reach 100,000 total LOC"}
        </button>
      </article>
    </section>
  );
}

import { milestones } from "../../game/data/milestones";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type MilestonePanelProps = {
  state: GameState;
};

export function MilestonePanel({ state }: MilestonePanelProps) {
  return (
    <section>
      <h2>Milestones</h2>

      <div className="milestone-grid">
        {milestones.map((milestone) => {
          const progress = Math.min(
            state.totalLinesOfCode / milestone.requiredTotalLoc,
            1,
          );

          const unlocked = progress >= 1;

          return (
            <article key={milestone.id} className={unlocked ? "completed-card" : "locked-card"}>
              <h3>
                <span
                  className={
                    unlocked
                      ? "status-badge status-complete"
                      : "status-badge status-locked"
                  }
                >
                  {unlocked ? "✓ Unlocked" : "✕ Locked"}
                </span>
                {milestone.name}
              </h3>

              <p>{milestone.description}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <p>
                {formatNumber(state.totalLinesOfCode)} /{" "}
                {formatNumber(milestone.requiredTotalLoc)} total LOC
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

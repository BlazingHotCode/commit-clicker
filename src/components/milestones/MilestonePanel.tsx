import { milestones } from "../../game/data/milestones";
import type { GameState } from "../../game/state/types";

type MilestonePanelProps = {
  state: GameState;
};

export function MilestonePanel({ state }: MilestonePanelProps) {
  return (
    <section>
      <h2>Milestones</h2>

      {milestones.map((milestone) => {
        const unlocked = state.totalLinesOfCode >= milestone.requiredTotalLoc;

        return (
          <article key={milestone.id}>
            <h3>
              {unlocked ? "V " : "X "}
              {milestone.name}
            </h3>

            <p>{milestone.description}</p>
            <p>Required: {milestone.requiredTotalLoc} total LOC</p>
          </article>
        );
      })}
    </section>
  );
}

import { projects } from "../../game/data/projects";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type NextGoalPanelProps = {
  state: GameState;
};

export function NextGoalPanel({ state }: NextGoalPanelProps) {
  const nextProject = projects.find((project) => {
    const completed = state.completedProjects.includes(project.id);
    const unlocked =
      project.requiredProjectIds?.every((projectId) =>
        state.completedProjects.includes(projectId),
      ) ?? true;

    return !completed && unlocked;
  });

  if (!nextProject) {
  return (
    <section>
      <h2>Next Goal</h2>
      <article>
        <h3>Prepare for Open Source Fame</h3>
        <p>
          You shipped every current project. The next major system should be
          prestige: reset your project for permanent reputation bonuses.
        </p>
      </article>
    </section>
  );
}

  const locRemaining = Math.max(0, nextProject.locCost - state.linesOfCode);
  const reputationRemaining = Math.max(
    0,
    nextProject.reputationCost - state.reputation,
  );

  return (
    <section>
      <h2>Next Goal</h2>

      <article>
        <h3>Ship {nextProject.name}</h3>

        <p>{nextProject.description}</p>

        <p>
          Need {formatNumber(locRemaining)} more LOC and{" "}
          {formatNumber(reputationRemaining)} more reputation.
        </p>

        <p>
          <strong>Reward:</strong> {nextProject.rewardLabel}
        </p>
      </article>
    </section>
  );
}

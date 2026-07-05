import { projects } from "../../game/data/projects";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type ProjectPanelProps = {
  state: GameState;
  onShipProject: (projectId: string) => void;
};

export function ProjectPanel({ state, onShipProject }: ProjectPanelProps) {
  return (
    <section>
      <h2>Projects</h2>

      <div className="project-grid">
        {projects.map((project) => {
          const completed = state.completedProjects.includes(project.id);
          const canAfford =
            state.linesOfCode >= project.locCost &&
            state.reputation >= project.reputationCost;

          return (
            <article key={project.id}>
              <h3>
                {completed ? "Shipped: " : ""}
                {project.name}
              </h3>

              <p>{project.description}</p>

              <p>
                <strong>Cost:</strong> {formatNumber(project.locCost)} LOC,{" "}
                {formatNumber(project.reputationCost)} reputation
              </p>

              <p>
                <strong>Reward:</strong> {project.rewardLabel}
              </p>

              <button
                disabled={completed || !canAfford}
                onClick={() => onShipProject(project.id)}
              >
                {completed ? "Shipped" : "Ship Project"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

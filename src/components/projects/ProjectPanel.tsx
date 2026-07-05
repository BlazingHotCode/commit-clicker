import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { projects } from "../../game/data/projects";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type ProjectPanelProps = {
  state: GameState;
  onShipProject: (projectId: string) => void;
};

export function ProjectPanel({ state, onShipProject }: ProjectPanelProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Projects
      </Typography>

      <div className="project-grid">
        {projects.map((project) => {
          const completed = state.completedProjects.includes(project.id);
          const unlocked =
            project.requiredProjectIds?.every((projectId) =>
              state.completedProjects.includes(projectId),
            ) ?? true;
          const canAfford =
            unlocked &&
            state.linesOfCode >= project.locCost &&
            state.reputation >= project.reputationCost;

          return (
            <Card
              key={project.id}
              variant="outlined"
              className={
                completed
                  ? "completed-card"
                  : !unlocked
                    ? "locked-card"
                    : undefined
              }
            >
              <CardContent>
                <Typography variant="h6" component="h3">
                  {completed ? "Shipped: " : ""}
                  {project.name}
                </Typography>

                {!unlocked && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    <strong>Locked:</strong> Ship the previous project first.
                  </Typography>
                )}

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {project.description}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>Cost:</strong> {formatNumber(project.locCost)} LOC,{" "}
                  {formatNumber(project.reputationCost)} reputation
                </Typography>

                <Typography>
                  <strong>Your progress:</strong>{" "}
                  {formatNumber(Math.min(state.linesOfCode, project.locCost))} /{" "}
                  {formatNumber(project.locCost)} LOC,{" "}
                  {formatNumber(
                    Math.min(state.reputation, project.reputationCost),
                  )}{" "}
                  / {formatNumber(project.reputationCost)} reputation
                </Typography>

                <Typography>
                  <strong>Reward:</strong> {project.rewardLabel}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={completed || !canAfford}
                  onClick={() => onShipProject(project.id)}
                >
                  {completed ? "Shipped" : unlocked ? "Ship Project" : "Locked"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </Paper>
  );
}

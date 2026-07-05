import {
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
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
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
          Next Goal
        </Typography>

        <Alert severity="info" variant="outlined">
          You shipped every current project. The next major system should be
          prestige: reset your project for permanent reputation bonuses.
        </Alert>
      </section>
    );
  }

  const locRemaining = Math.max(0, nextProject.locCost - state.linesOfCode);
  const reputationRemaining = Math.max(
    0,
    nextProject.reputationCost - state.reputation,
  );

  const locProgress = Math.min(state.linesOfCode / nextProject.locCost, 1);
  const reputationProgress = Math.min(
    state.reputation / nextProject.reputationCost,
    1,
  );

  return (
    <section>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Next Goal
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h3">
            Ship {nextProject.name}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {nextProject.description}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            LOC progress: {formatNumber(state.linesOfCode)} /{" "}
            {formatNumber(nextProject.locCost)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={locProgress * 100}
            sx={{ mt: 0.75 }}
          />

          <Typography sx={{ mt: 2 }}>
            Reputation progress: {formatNumber(state.reputation)} /{" "}
            {formatNumber(nextProject.reputationCost)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={reputationProgress * 100}
            sx={{ mt: 0.75 }}
          />

          <Typography sx={{ mt: 2 }}>
            Need {formatNumber(locRemaining)} more LOC and{" "}
            {formatNumber(reputationRemaining)} more reputation.
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Reward:</strong> {nextProject.rewardLabel}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
}

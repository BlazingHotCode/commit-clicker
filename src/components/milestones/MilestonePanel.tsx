import {
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
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
          const progress = milestone.requiredTotalLoc
            ? Math.min(state.totalLinesOfCode / milestone.requiredTotalLoc, 1)
            : milestone.isUnlocked?.(state)
              ? 1
              : 0;

          const unlocked = progress >= 1;

          return (
            <Card
              key={milestone.id}
              variant="outlined"
              className={unlocked ? "completed-card" : "locked-card"}
            >
              <CardContent>
                <Typography variant="h6" component="h3">
                  <Chip
                    size="small"
                    color={unlocked ? "success" : "error"}
                    label={unlocked ? "Unlocked" : "Locked"}
                    sx={{ mr: 1 }}
                  />
                  {milestone.name}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {milestone.description}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={progress * 100}
                  sx={{ mt: 2 }}
                />

                <Typography sx={{ mt: 1 }}>
                  {milestone.requiredTotalLoc
                    ? `${formatNumber(state.totalLinesOfCode)} / ${formatNumber(
                        milestone.requiredTotalLoc,
                      )} total LOC`
                    : unlocked
                      ? "Complete"
                      : "Incomplete"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

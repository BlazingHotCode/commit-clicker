import {
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Paper,
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
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Milestones
      </Typography>

      <Grid container spacing={1.5}>
        {milestones.map((milestone) => {
          const progress = milestone.requiredTotalLoc
            ? Math.min(state.totalLinesOfCode / milestone.requiredTotalLoc, 1)
            : milestone.isUnlocked?.(state)
              ? 1
              : 0;

          const unlocked = progress >= 1;

          return (
            <Grid key={milestone.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

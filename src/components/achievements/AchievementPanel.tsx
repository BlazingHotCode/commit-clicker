import {
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { achievements } from "../../game/data/achievements";
import type { GameState } from "../../game/state/types";

type AchievementPanelProps = {
  state: GameState;
};

export function AchievementPanel({ state }: AchievementPanelProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Achievements
      </Typography>

      <Grid container spacing={1.5}>
        {achievements.map((achievement) => {
          const unlocked = achievement.isUnlocked(state);

          return (
            <Grid key={achievement.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                className={unlocked ? "completed-card" : "locked-card"}
              >
                <CardContent>
                  <Typography variant="h6" component="h3">
                    <Chip
                      size="small"
                      color={unlocked ? "success" : "error"}
                      label={unlocked ? "Earned" : "Locked"}
                      sx={{ mr: 1 }}
                    />
                    {achievement.name}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {achievement.description}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <strong>Bonus:</strong> {achievement.bonusLabel}
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

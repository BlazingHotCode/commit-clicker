import {
  Button,
  Card,
  CardActions,
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
  onClaimAchievement: (achievementId: string) => void;
};

export function AchievementPanel({
  state,
  onClaimAchievement,
}: AchievementPanelProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Achievements
      </Typography>

      <Grid container spacing={1.5}>
        {achievements.map((achievement) => {
          const claimed = state.claimedAchievements.includes(achievement.id);
          const claimable = !claimed && achievement.canClaim(state);

          return (
            <Grid key={achievement.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                className={claimed ? "completed-card" : "locked-card"}
              >
                <CardContent>
                  <Typography variant="h6" component="h3">
                    <Chip
                      size="small"
                      color={
                        claimed ? "success" : claimable ? "warning" : "error"
                      }
                      label={
                        claimed ? "Claimed" : claimable ? "Ready" : "Locked"
                      }
                      sx={{ mr: 1 }}
                    />
                    {achievement.name}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {achievement.description}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <strong>Reward:</strong> {achievement.rewardLabel}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!claimable}
                    onClick={() => onClaimAchievement(achievement.id)}
                  >
                    {claimed
                      ? "Claimed"
                      : claimable
                        ? "Claim Reward"
                        : "Locked"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

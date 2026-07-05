import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type PrestigePanelProps = {
  state: GameState;
  onPrestige: () => void;
};

export function PrestigePanel({ state, onPrestige }: PrestigePanelProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const earnedPrestigePoints = state.totalLinesOfCode / 100_000;
  const canPrestige = earnedPrestigePoints >= 1;
  const currentBonus = state.prestigePoints * 5;
  const nextBonus = (state.prestigePoints + earnedPrestigePoints) * 5;

  if (state.prestigePoints <= 0 && !canPrestige) return null;

  return (
    <section>
      <h2>Prestige</h2>

      <Alert severity="warning" sx={{ mb: 2 }}>
        Prestige resets your current run, upgrades, projects, bugs, and
        reputation. Prestige points stay forever.
      </Alert>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h3">
            Reset for permanent speed
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            You will gain{" "}
            <strong>{formatNumber(earnedPrestigePoints)}</strong> prestige
            points.
          </Typography>

          <Typography sx={{ mt: 1 }}>
            LOC bonus: <strong>+{formatNumber(currentBonus)}%</strong> to{" "}
            <strong>+{formatNumber(nextBonus)}%</strong>
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            disabled={!canPrestige}
            onClick={() => setConfirmOpen(true)}
          >
            {canPrestige ? "Prestige Now" : "Reach 100,000 total LOC"}
          </Button>
        </CardActions>
      </Card>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Prestige now?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Prestige will reset your current run, upgrades, projects, bugs, and
            reputation. You will keep your prestige points and permanent LOC
            bonus.
          </DialogContentText>

          <DialogContentText sx={{ mt: 2 }}>
            You will gain {formatNumber(earnedPrestigePoints)} prestige points.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>

          <Button
            color="warning"
            variant="contained"
            onClick={() => {
              setConfirmOpen(false);
              onPrestige();
            }}
          >
            Prestige
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
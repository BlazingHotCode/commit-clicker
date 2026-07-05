import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import type { Upgrade } from "../../game/data/upgrades";
import type { UpgradeId } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type UpgradeCardProps = {
  upgrade: Upgrade;
  level: number;
  cost: number;
  canAfford: boolean;
  locked: boolean;
  onBuy: (upgradeId: UpgradeId) => void;
};

export function UpgradeCard({
  upgrade,
  level,
  cost,
  canAfford,
  locked,
  onBuy,
}: UpgradeCardProps) {
  return (
    <Card variant="outlined" className={locked ? "locked-card" : undefined}>
      <CardContent>
        <Typography variant="h6" component="h3">
          {upgrade.name}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {upgrade.description}
        </Typography>

        {locked && (
          <Typography color="error" sx={{ mt: 1 }}>
            <strong>Locked:</strong> Ship more projects to unlock this upgrade.
          </Typography>
        )}

        <Typography sx={{ mt: 1 }}>
          <strong>Effect:</strong> {upgrade.effectLabel}
        </Typography>

        <Typography>
          <strong>Level:</strong> {level}
        </Typography>

        <Typography>
          <strong>Cost:</strong> {formatNumber(cost)} LOC
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          disabled={!canAfford}
          onClick={() => onBuy(upgrade.id)}
        >
          {locked ? "Locked" : "Buy"}
        </Button>
      </CardActions>
    </Card>
  );
}

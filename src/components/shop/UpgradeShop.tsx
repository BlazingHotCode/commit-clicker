import { upgrades } from "../../game/data/upgrades";
import { getUpgradeCost } from "../../game/engine/formulas";
import type { GameState, UpgradeId } from "../../game/state/types";
import { UpgradeCard } from "./UpgradeCard";
import { Grid, Paper, Typography } from "@mui/material";

type UpgradeShopProps = {
  state: GameState;
  onBuyUpgrade: (upgradeId: UpgradeId) => void;
};

export function UpgradeShop({ state, onBuyUpgrade }: UpgradeShopProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 700 }}>
        Upgrade Shop
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Ship projects to unlock more upgrades.
      </Typography>

      <Grid container spacing={1.5}>
        {upgrades.map((upgrade) => {
          const level = state.upgrades[upgrade.id];
          const cost = getUpgradeCost(upgrade, level);

          const unlocked =
            upgrade.requiredProjectIds?.every((projectId) =>
              state.completedProjects.includes(projectId),
            ) ?? true;

          if (!unlocked) return null;

          return (
            <Grid key={upgrade.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <UpgradeCard
                upgrade={upgrade}
                level={level}
                cost={cost}
                canAfford={state.linesOfCode >= cost}
                locked={false}
                onBuy={onBuyUpgrade}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

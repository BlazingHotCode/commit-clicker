import { Grid, Paper, Typography } from "@mui/material";
import { getEffectiveStats } from "../../game/engine/stats";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";
import { ResourceItem } from "./ResourceItem";

type ResourceBarProps = {
  state: GameState;
};

export function ResourceBar({ state }: ResourceBarProps) {
  const stats = getEffectiveStats(state);
  const showPrestige =
    state.prestigePoints > 0 || state.totalLinesOfCode >= 100_000;

  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ p: { xs: 1.5, sm: 2.5 } }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Resources
      </Typography>

      <Grid container spacing={1}>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <ResourceItem
            label="Lines of Code"
            value={formatNumber(state.linesOfCode)}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <ResourceItem label="Bugs" value={state.bugs} />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <ResourceItem
            label="Reputation"
            value={formatNumber(state.reputation)}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <ResourceItem
            label="LOC / sec"
            value={formatNumber(stats.locPerSecond)}
          />
        </Grid>

        {showPrestige && (
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <ResourceItem
              label="Prestige Points"
              value={formatNumber(state.prestigePoints)}
            />
          </Grid>
        )}

        {showPrestige && (
          <Grid
            size={{ xs: 6, sm: 6, md: 3 }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <ResourceItem
              label="Prestige bonus"
              value={`+${formatNumber(state.prestigePoints * 5)}% LOC`}
            />
          </Grid>
        )}

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="LOC per click"
            value={formatNumber(stats.locPerClick)}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="Bug chance"
            value={`${Math.round(stats.bugChance * 100)}%`}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="Reputation per bug"
            value={formatNumber(stats.reputationPerBug)}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="LOC per bug fixed"
            value={formatNumber(state.locPerBugFixed)}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="Total LOC"
            value={formatNumber(state.totalLinesOfCode)}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem
            label="Bugs fixed"
            value={formatNumber(state.totalBugsFixed)}
          />
        </Grid>

        <Grid
          size={{ xs: 6, sm: 6, md: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <ResourceItem label="Autosave" value="Every 3 seconds" />
        </Grid>
      </Grid>
    </Paper>
  );
}

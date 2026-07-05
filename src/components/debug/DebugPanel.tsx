import { useState, type Dispatch } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getEffectiveStats } from "../../game/engine/stats";
import type { GameAction } from "../../game/state/actions";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type DebugPanelProps = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

export function DebugPanel({ state, dispatch }: DebugPanelProps) {
  const [locAmount, setLocAmount] = useState(10_000);
  const [reputationAmount, setReputationAmount] = useState(100);
  const [bugsAmount, setBugsAmount] = useState(10);
  const [prestigeAmount, setPrestigeAmount] = useState(1);
  const [locPerClickAmount, setLocPerClickAmount] = useState(1);
  const [locPerSecondAmount, setLocPerSecondAmount] = useState(1);
  const [reputationPerBugAmount, setReputationPerBugAmount] = useState(1);
  const [bugChanceAmount, setBugChanceAmount] = useState(0.1);

  const stats = getEffectiveStats(state);

  return (
    <section>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Debug Tools
      </Typography>

      <div className="debug-grid">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Resources
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="LOC amount"
                type="number"
                size="small"
                value={locAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) => setLocAmount(Number(event.target.value))}
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({ type: "DEBUG_ADD_LOC", amount: locAmount })
                }
              >
                Add LOC
              </Button>

              <TextField
                label="Reputation amount"
                type="number"
                size="small"
                value={reputationAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) =>
                  setReputationAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_ADD_REPUTATION",
                    amount: reputationAmount,
                  })
                }
              >
                Add Reputation
              </Button>

              <TextField
                label="Bugs amount"
                type="number"
                size="small"
                value={bugsAmount}
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
                onChange={(event) => setBugsAmount(Number(event.target.value))}
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({ type: "DEBUG_ADD_BUGS", amount: bugsAmount })
                }
              >
                Add Bugs
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Production Stats
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="LOC per click"
                type="number"
                size="small"
                value={locPerClickAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) =>
                  setLocPerClickAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_SET_LOC_PER_CLICK",
                    amount: locPerClickAmount,
                  })
                }
              >
                Set LOC Per Click
              </Button>

              <TextField
                label="LOC per second"
                type="number"
                size="small"
                value={locPerSecondAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) =>
                  setLocPerSecondAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_SET_LOC_PER_SECOND",
                    amount: locPerSecondAmount,
                  })
                }
              >
                Set LOC Per Second
              </Button>

              <TextField
                label="Reputation per bug"
                type="number"
                size="small"
                value={reputationPerBugAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) =>
                  setReputationPerBugAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_SET_REPUTATION_PER_BUG",
                    amount: reputationPerBugAmount,
                  })
                }
              >
                Set Reputation Per Bug
              </Button>

              <TextField
                label="Bug chance"
                type="number"
                size="small"
                value={bugChanceAmount}
                slotProps={{ htmlInput: { min: 0, max: 1, step: 0.01 } }}
                onChange={(event) =>
                  setBugChanceAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_SET_BUG_CHANCE",
                    amount: bugChanceAmount,
                  })
                }
              >
                Set Bug Chance
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Progression
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Prestige points"
                type="number"
                size="small"
                value={prestigeAmount}
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                onChange={(event) =>
                  setPrestigeAmount(Number(event.target.value))
                }
              />

              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "DEBUG_SET_PRESTIGE_POINTS",
                    amount: prestigeAmount,
                  })
                }
              >
                Set Prestige Points
              </Button>

              <Button
                variant="outlined"
                onClick={() => dispatch({ type: "DEBUG_COMPLETE_PROJECTS" })}
              >
                Complete All Projects
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Current State
            </Typography>

            <Typography>LOC: {formatNumber(state.linesOfCode)}</Typography>
            <Typography>
              Total LOC: {formatNumber(state.totalLinesOfCode)}
            </Typography>
            <Typography>
              Reputation: {formatNumber(state.reputation)}
            </Typography>
            <Typography>Bugs: {formatNumber(state.bugs)}</Typography>
            <Typography>Projects: {state.completedProjects.length}</Typography>
            <Typography>
              Prestige Points: {formatNumber(state.prestigePoints)}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Base LOC/click: {formatNumber(state.locPerClick)}
            </Typography>
            <Typography>
              Effective LOC/click: {formatNumber(stats.locPerClick)}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Base LOC/sec: {formatNumber(state.locPerSecond)}
            </Typography>
            <Typography>
              Effective LOC/sec: {formatNumber(stats.locPerSecond)}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Base reputation/bug: {formatNumber(state.reputationPerBug)}
            </Typography>
            <Typography>
              Effective reputation/bug: {formatNumber(stats.reputationPerBug)}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Base bug chance: {Math.round(state.bugChance * 100)}%
            </Typography>
            <Typography>
              Effective bug chance: {Math.round(stats.bugChance * 100)}%
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

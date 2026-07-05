import { useEffect, useReducer, useState } from "react";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";
import { UpgradeShop } from "./components/shop/UpgradeShop";
import { useGameLoop } from "./hooks/useGameLoop";
import { ResourceBar } from "./components/resources/ResourceBar";
import { ClickActions } from "./components/actions/ClickActions";
import { clearSave, loadGame } from "./game/engine/save";
import { useAutoSave } from "./hooks/useAutoSave";
import { MilestonePanel } from "./components/milestones/MilestonePanel";
import { GameLayout } from "./components/layout/GameLayout";
import { AchievementPanel } from "./components/achievements/AchievementPanel";
import { ProjectPanel } from "./components/projects/ProjectPanel";
import { NextGoalPanel } from "./components/goals/NextGoalPanel";
import { DebugPanel } from "./components/debug/DebugPanel";
import { PrestigePanel } from "./components/prestige/PrestigePanel";
import { formatNumber } from "./game/utils/formatNumber";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";

const DEBUG_TOOLS_ENABLED = false;

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadGame);
  const [showOfflineAlert, setShowOfflineAlert] = useState(
    state.offlineLocGained > 0,
  );
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    if (state.offlineLocGained <= 0) return;

    setShowOfflineAlert(true);
  }, [state.offlineLocGained]);

  useGameLoop(dispatch);
  useAutoSave(state);

  return (
    <GameLayout>
      <ResourceBar state={state} />

      <Snackbar
        open={showOfflineAlert && state.offlineLocGained > 0}
        autoHideDuration={5000}
        onClose={() => setShowOfflineAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowOfflineAlert(false)}
        >
          Welcome back! You gained {formatNumber(state.offlineLocGained)} LOC
          while you were away.
        </Alert>
      </Snackbar>

      <ClickActions
        bugs={state.bugs}
        reputation={state.reputation}
        onWriteCode={() => dispatch({ type: "WRITE_CODE" })}
        onFixBug={() => dispatch({ type: "FIX_BUG" })}
        onRefactorCode={() => dispatch({ type: "REFACTOR_CODE" })}
      />

      <NextGoalPanel state={state} />

      <UpgradeShop
        state={state}
        onBuyUpgrade={(upgradeId) =>
          dispatch({ type: "BUY_UPGRADE", upgradeId })
        }
      />

      <ProjectPanel
        state={state}
        onShipProject={(projectId) =>
          dispatch({ type: "SHIP_PROJECT", projectId })
        }
      />

      <MilestonePanel state={state} />

      <AchievementPanel state={state} />

      {DEBUG_TOOLS_ENABLED && <DebugPanel state={state} dispatch={dispatch} />}

      <PrestigePanel
        state={state}
        onPrestige={() => dispatch({ type: "PRESTIGE" })}
      />

      <section>
        <h2>Settings</h2>

        <p className="section-help">
          Commit Clicker v0.1 - local autosave enabled.
        </p>

        <Button
          variant="outlined"
          color="error"
          onClick={() => setResetDialogOpen(true)}
        >
          Reset Save
        </Button>

        <Dialog
          open={resetDialogOpen}
          onClose={() => setResetDialogOpen(false)}
        >
          <DialogTitle>Reset save?</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Resetting your save will permanently delete all progress,
              including prestige points. This cannot be undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>

            <Button
              color="error"
              variant="contained"
              onClick={() => {
                setResetDialogOpen(false);
                clearSave();
                dispatch({ type: "RESET_GAME" });
              }}
            >
              Reset Save
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </GameLayout>
  );
}

export default App;

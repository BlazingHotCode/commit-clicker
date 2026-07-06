import { useEffect, useReducer, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { MobileNav, type MobilePanel } from "./components/navigation/MobileNav";
import { SettingsPanel } from "./components/settings/SettingsPanel";

const DEBUG_TOOLS_ENABLED = false;

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadGame);
  const [showOfflineAlert, setShowOfflineAlert] = useState(
    state.offlineLocGained > 0,
  );
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("actions");

  const showMobilePanel = (panel: MobilePanel) => mobilePanel === panel;

  const settingsPanel = (
    <SettingsPanel onResetSave={() => setResetDialogOpen(true)} />
  );

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

      <Box
        sx={{
          display: {
            xs: showMobilePanel("actions") ? "block" : "none",
            md: "block",
          },
        }}
      >
        <ClickActions
          bugs={state.bugs}
          reputation={state.reputation}
          hasActiveBugChallenge={state.activeBugChallenge !== null}
          onWriteCode={() => dispatch({ type: "WRITE_CODE" })}
          onStartBugChallenge={() => dispatch({ type: "START_BUG_CHALLENGE" })}
          onRefactorCode={() => dispatch({ type: "REFACTOR_CODE" })}
        />
      </Box>

      <Box
        sx={{
          display: {
            xs: showMobilePanel("goal") ? "block" : "none",
            md: "block",
          },
        }}
      >
        <NextGoalPanel
          state={state}
          onShipProject={(projectId) =>
            dispatch({ type: "SHIP_PROJECT", projectId })
          }
        />
      </Box>

      <Box
        sx={{
          display: {
            xs: showMobilePanel("shop") ? "block" : "none",
            md: "block",
          },
        }}
      >
        <UpgradeShop
          state={state}
          onBuyUpgrade={(upgradeId) =>
            dispatch({ type: "BUY_UPGRADE", upgradeId })
          }
        />
      </Box>

      <Box
        sx={{
          display: {
            xs: showMobilePanel("projects") ? "block" : "none",
            md: "block",
          },
        }}
      >
        <ProjectPanel
          state={state}
          onShipProject={(projectId) =>
            dispatch({ type: "SHIP_PROJECT", projectId })
          }
        />
      </Box>

      <Box
        sx={{
          display: {
            xs: showMobilePanel("more") ? "block" : "none",
            md: "block",
          },
        }}
      >
        <Box sx={{ display: { xs: "none", md: "grid" }, gap: 3 }}>
          <MilestonePanel state={state} />

          <AchievementPanel state={state} />

          {DEBUG_TOOLS_ENABLED && (
            <DebugPanel state={state} dispatch={dispatch} />
          )}

          <PrestigePanel
            state={state}
            onPrestige={() => dispatch({ type: "PRESTIGE" })}
          />

          {settingsPanel}
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Paper component="section" variant="outlined" sx={{ p: 1.5 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              More
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Milestones</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <MilestonePanel state={state} />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Achievements</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <AchievementPanel state={state} />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Prestige</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <PrestigePanel
                  state={state}
                  onPrestige={() => dispatch({ type: "PRESTIGE" })}
                />
              </AccordionDetails>
            </Accordion>

            {DEBUG_TOOLS_ENABLED && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Debug</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <DebugPanel state={state} dispatch={dispatch} />
                </AccordionDetails>
              </Accordion>
            )}

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Settings</Typography>
              </AccordionSummary>

              <AccordionDetails>{settingsPanel}</AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
      </Box>

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset save?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Resetting your save will permanently delete all progress, including
            prestige points. This cannot be undone.
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

      <MobileNav value={mobilePanel} onChange={setMobilePanel} />
    </GameLayout>
  );
}

export default App;

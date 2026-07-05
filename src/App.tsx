import { useReducer } from "react";
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

const DEBUG_TOOLS_ENABLED = false;

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadGame);

  useGameLoop(dispatch);
  useAutoSave(state);

  return (
    <GameLayout>
      <ResourceBar state={state} />

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

      <button
        onClick={() => {
          clearSave();
          dispatch({ type: "RESET_GAME" });
        }}
      >
        Reset Save
      </button>
    </GameLayout>
  );
}

export default App;

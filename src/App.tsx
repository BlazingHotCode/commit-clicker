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

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadGame);

  useGameLoop(dispatch);
  useAutoSave(state);

  return (
    <GameLayout>
      <ResourceBar state={state} />

      <ClickActions
        bugs={state.bugs}
        onWriteCode={() => dispatch({ type: "WRITE_CODE" })}
        onFixBug={() => dispatch({ type: "FIX_BUG" })}
      />

      <UpgradeShop
        state={state}
        onBuyUpgrade={(upgradeId) =>
          dispatch({ type: "BUY_UPGRADE", upgradeId })
        }
      />

      <MilestonePanel state={state} />

      <AchievementPanel state={state} />

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

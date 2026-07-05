import { useReducer } from "react";
import "./App.css";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";
import { UpgradeShop } from "./components/shop/UpgradeShop";
import { useGameLoop } from "./hooks/useGameLoop";
import { ResourceBar } from "./components/resources/ResourceBar";
import { ClickActions } from "./components/actions/ClickActions";
import { clearSave, loadGame } from "./game/engine/save";
import { useAutoSave } from "./hooks/useAutoSave";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadGame);

  useGameLoop(dispatch);
  useAutoSave(state)

  return (
    <main>
      <h1>Commit Clicker</h1>

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

      <button
        onClick={() => {
          clearSave();
          dispatch({ type: "RESET_GAME"})
        }}
      >
        Reset Save
      </button>
    </main>
  );
}

export default App;

import { useReducer } from "react";
import "./App.css";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";
import { UpgradeShop } from "./components/shop/UpgradeShop";
import { useGameLoop } from "./hooks/useGameLoop";
import { formatNumber } from "./game/utils/formatNumber";
import { ResourceBar } from "./components/resources/ResourceBar";
import { ClickActions } from "./components/actions/ClickActions";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useGameLoop(dispatch);

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
    </main>
  );
}

export default App;

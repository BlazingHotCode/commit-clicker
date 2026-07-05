import { useReducer } from "react";
import "./App.css";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";
import { UpgradeShop } from "./components/shop/UpgradeShop";
import { useGameLoop } from "./hooks/useGameLoop";
import { formatNumber } from "./game/utils/formatNumber";
import { ResourceBar } from "./components/resources/ResourceBar";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useGameLoop(dispatch);

  return (
    <main>
      <h1>Commit Clicker</h1>

      <ResourceBar state={state} />

      <section>
        <h2>Actions</h2>

        <button onClick={() => dispatch({ type: "WRITE_CODE" })}>
          Write Code
        </button>

        <button
          onClick={() => dispatch({ type: "FIX_BUG" })}
          disabled={state.bugs <= 0}
        >
          Fix Bug
        </button>
      </section>

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

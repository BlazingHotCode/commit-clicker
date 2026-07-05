import { useReducer } from "react";
import "./App.css";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";
import { UpgradeShop } from "./components/shop/UpgradeShop";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useGameLoop(dispatch);

  return (
    <main>
      <h1>Commit Clicker</h1>

      <section>
        <h2>Resources</h2>
        <p>Lines of Code: {Math.floor(state.linesOfCode)}</p>
        <p>Bugs: {state.bugs}</p>
        <p>Reputation: {state.reputation}</p>
        <p>LOC per click: {state.locPerClick}</p>
        <p>LOC per second: {state.locPerSecond}</p>
      </section>

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

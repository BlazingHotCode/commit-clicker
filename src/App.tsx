import { useReducer } from "react";
import "./App.css";
import { gameReducer } from "./game/state/reducer";
import { initialState } from "./game/state/initialState";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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

        <button onClick={() => dispatch({type: "WRITE_CODE"})}>
          Write Code
        </button>

        <button onClick={() => dispatch({type: "FIX_BUG"})} disabled={state.bugs <= 0}>
          Fix Bug
        </button>
      </section>
    </main>
  );
}

export default App;

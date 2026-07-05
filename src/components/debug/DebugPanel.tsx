import { useState, type Dispatch } from "react";
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

  return (
    <section>
      <h2>Debug Tools</h2>

      <div className="debug-grid">
        <article>
          <h3>Resources</h3>

          <label>
            LOC amount
            <input
              type="number"
              min="0"
              value={locAmount}
              onChange={(event) => setLocAmount(Number(event.target.value))}
              step="0.01"
            />
          </label>

          <button
            onClick={() =>
              dispatch({ type: "DEBUG_ADD_LOC", amount: locAmount })
            }
          >
            Add LOC
          </button>

          <label>
            Reputation amount
            <input
              type="number"
              min="0"
              value={reputationAmount}
              onChange={(event) =>
                setReputationAmount(Number(event.target.value))
              }
              step="0.01"
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_ADD_REPUTATION",
                amount: reputationAmount,
              })
            }
          >
            Add Reputation
          </button>

          <label>
            Bugs amount
            <input
              type="number"
              min="0"
              value={bugsAmount}
              onChange={(event) => setBugsAmount(Number(event.target.value))}
              step="0.01"
            />
          </label>

          <button
            onClick={() =>
              dispatch({ type: "DEBUG_ADD_BUGS", amount: bugsAmount })
            }
          >
            Add Bugs
          </button>
        </article>

        <article>
          <h3>Progression</h3>

          <label>
            Prestige points
            <input
              type="number"
              min="0"
              value={prestigeAmount}
              onChange={(event) =>
                setPrestigeAmount(Number(event.target.value))
              }
              step="0.01"
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_SET_PRESTIGE_POINTS",
                amount: prestigeAmount,
              })
            }
          >
            Set Prestige Points
          </button>

          <button onClick={() => dispatch({ type: "DEBUG_COMPLETE_PROJECTS" })}>
            Complete All Projects
          </button>
        </article>

        <article>
          <h3>Current State</h3>

          <p>LOC: {formatNumber(state.linesOfCode)}</p>
          <p>Total LOC: {formatNumber(state.totalLinesOfCode)}</p>
          <p>Reputation: {formatNumber(state.reputation)}</p>
          <p>Bugs: {formatNumber(state.bugs)}</p>
          <p>Projects: {state.completedProjects.length}</p>
          <p>Prestige Points: {formatNumber(state.prestigePoints)}</p>
        </article>
      </div>
    </section>
  );
}

import { useState, type Dispatch } from "react";
import type { GameAction } from "../../game/state/actions";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";
import { getEffectiveStats } from "../../game/engine/stats";

type DebugPanelProps = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

export function DebugPanel({ state, dispatch }: DebugPanelProps) {
  const stats = getEffectiveStats(state);

  const [locAmount, setLocAmount] = useState(10_000);
  const [reputationAmount, setReputationAmount] = useState(100);
  const [bugsAmount, setBugsAmount] = useState(10);
  const [prestigeAmount, setPrestigeAmount] = useState(1);
  const [locPerClickAmount, setLocPerClickAmount] = useState(1);
  const [locPerSecondAmount, setLocPerSecondAmount] = useState(1);
  const [reputationPerBugAmount, setReputationPerBugAmount] = useState(1);
  const [bugChanceAmount, setBugChanceAmount] = useState(0.1);

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
          <h3>Production Stats</h3>

          <label>
            LOC per click
            <input
              type="number"
              min="0"
              step="0.01"
              value={locPerClickAmount}
              onChange={(event) =>
                setLocPerClickAmount(Number(event.target.value))
              }
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_SET_LOC_PER_CLICK",
                amount: locPerClickAmount,
              })
            }
          >
            Set LOC Per Click
          </button>

          <label>
            LOC per second
            <input
              type="number"
              min="0"
              step="0.01"
              value={locPerSecondAmount}
              onChange={(event) =>
                setLocPerSecondAmount(Number(event.target.value))
              }
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_SET_LOC_PER_SECOND",
                amount: locPerSecondAmount,
              })
            }
          >
            Set LOC Per Second
          </button>

          <label>
            Reputation per bug
            <input
              type="number"
              min="0"
              step="0.01"
              value={reputationPerBugAmount}
              onChange={(event) =>
                setReputationPerBugAmount(Number(event.target.value))
              }
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_SET_REPUTATION_PER_BUG",
                amount: reputationPerBugAmount,
              })
            }
          >
            Set Reputation Per Bug
          </button>

          <label>
            Bug chance
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={bugChanceAmount}
              onChange={(event) =>
                setBugChanceAmount(Number(event.target.value))
              }
            />
          </label>

          <button
            onClick={() =>
              dispatch({
                type: "DEBUG_SET_BUG_CHANCE",
                amount: bugChanceAmount,
              })
            }
          >
            Set Bug Chance
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

          <p>Base LOC/click: {formatNumber(state.locPerClick)}</p>
          <p>Effective LOC/click: {formatNumber(stats.locPerClick)}</p>

          <p>Base LOC/sec: {formatNumber(state.locPerSecond)}</p>
          <p>Effective LOC/sec: {formatNumber(stats.locPerSecond)}</p>

          <p>Base reputation/bug: {formatNumber(state.reputationPerBug)}</p>
          <p>
            Effective reputation/bug: {formatNumber(stats.reputationPerBug)}
          </p>

          <p>Base bug chance: {Math.round(state.bugChance * 100)}%</p>
          <p>Effective bug chance: {Math.round(stats.bugChance * 100)}%</p>
        </article>
      </div>
    </section>
  );
}

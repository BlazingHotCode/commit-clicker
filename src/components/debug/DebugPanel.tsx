import type { GameState } from "../../game/state/types";

type DebugPanelProps = {
  state: GameState;
};

export function DebugPanel({ state }: DebugPanelProps) {
  return (
    <section>
      <h2>Debug Tools</h2>

      <p>Total LOC: {Math.floor(state.totalLinesOfCode)}</p>
      <p>Completed Projects: {state.completedProjects.length}</p>
      <p>Prestige Points: {state.prestigePoints}</p>
    </section>
  );
}

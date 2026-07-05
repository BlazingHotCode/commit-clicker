import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type ResourceBarProps = {
  state: GameState;
};

export function ResourceBar({ state }: ResourceBarProps) {
  return (
    <section>
      <h2>Resources</h2>
      <p>Lines of Code: {formatNumber(state.linesOfCode)}</p>
      <p>Bugs: {state.bugs}</p>
      <p>Reputation: {formatNumber(state.reputation)}</p>
      <p>LOC per click: {formatNumber(state.locPerClick)}</p>
      <p>LOC per second: {formatNumber(state.locPerSecond)}</p>
    </section>
  );
}

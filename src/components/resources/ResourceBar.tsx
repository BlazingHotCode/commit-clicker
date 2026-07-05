import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";
import { ResourceItem } from "./ResourceItem";

type ResourceBarProps = {
  state: GameState;
};

export function ResourceBar({ state }: ResourceBarProps) {
  return (
    <section>
      <h2>Resources</h2>
      <ResourceItem
        label={"Lines of Code"}
        value={formatNumber(state.linesOfCode)}
        />
      <ResourceItem
        label="Bugs"
        value={state.bugs}
      />
      <ResourceItem
        label="Reputation"
        value={formatNumber(state.reputation)}
      />
      <ResourceItem
        label="LOC per click"
        value={formatNumber(state.locPerClick)}
      />
      <ResourceItem
        label="LOC per second"
        value={formatNumber(state.locPerSecond)}
      />
    </section>
  );
}

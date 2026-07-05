import { getEffectiveStats } from "../../game/engine/stats";
import type { GameState } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";
import { ResourceItem } from "./ResourceItem";

type ResourceBarProps = {
  state: GameState;
};

export function ResourceBar({ state }: ResourceBarProps) {
  const stats = getEffectiveStats(state);
  return (
    <section>
      <h2>Resources</h2>

      <div className="resource-grid">
        <ResourceItem
          label={"Lines of Code"}
          value={formatNumber(state.linesOfCode)}
        />
        <ResourceItem label="Bugs" value={state.bugs} />
        <ResourceItem
          label="Reputation"
          value={formatNumber(state.reputation)}
        />
        <ResourceItem
          label="LOC per click"
          value={formatNumber(stats.locPerClick)}
        />
        <ResourceItem
          label="LOC per second"
          value={formatNumber(stats.locPerSecond)}
        />
      </div>
    </section>
  );
}

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
        {(state.prestigePoints > 0 || state.totalLinesOfCode >= 100_000) && (
          <>
            <ResourceItem
              label="Prestige Points"
              value={formatNumber(state.prestigePoints)}
            />

            <ResourceItem
              label="Prestige bonus"
              value={`+${Math.round(state.prestigePoints * 5)}% LOC`}
            />
          </>
        )}
        <ResourceItem
          label="LOC per click"
          value={formatNumber(stats.locPerClick)}
        />
        <ResourceItem
          label="LOC per second"
          value={formatNumber(stats.locPerSecond)}
        />
        <ResourceItem
          label="Bug chance"
          value={`${Math.round(stats.bugChance * 100)}%`}
        />

        <ResourceItem
          label="Reputation per bug"
          value={formatNumber(stats.reputationPerBug)}
        />

        <ResourceItem
          label="Total LOC"
          value={formatNumber(state.totalLinesOfCode)}
        />

        <ResourceItem
          label="Bugs fixed"
          value={formatNumber(state.totalBugsFixed)}
        />

        <ResourceItem label="Autosave" value="Every 3 seconds" />
      </div>
    </section>
  );
}

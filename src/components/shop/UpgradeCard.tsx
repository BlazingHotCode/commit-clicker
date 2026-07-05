import type { Upgrade } from "../../game/data/upgrades";
import type { UpgradeId } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type UpgradeCardProps = {
  upgrade: Upgrade;
  level: number;
  cost: number;
  canAfford: boolean;
  locked: boolean;
  onBuy: (upgradeId: UpgradeId) => void;
};

export function UpgradeCard({
  upgrade,
  level,
  cost,
  canAfford,
  locked,
  onBuy,
}: UpgradeCardProps) {
  return (
    <article className={locked ? "locked-card" : undefined}>
      <h3>{upgrade.name}</h3>
      <p>{upgrade.description}</p>
      {locked && (
        <p>
          <strong>Locked:</strong> Ship more projects to unlock this upgrade.
        </p>
      )}
      <p>
        <strong>Effect:</strong> {upgrade.effectLabel}
      </p>
      <p>
        <strong>Level:</strong> {level}
      </p>
      <p>
        <strong>Cost:</strong> {formatNumber(cost)} LOC
      </p>

      <button disabled={!canAfford} onClick={() => onBuy(upgrade.id)}>
        {locked ? "Locked" : "Buy"}
      </button>
    </article>
  );
}

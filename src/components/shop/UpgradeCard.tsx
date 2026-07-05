import type { Upgrade } from "../../game/data/upgrades";
import type { UpgradeId } from "../../game/state/types";
import { formatNumber } from "../../game/utils/formatNumber";

type UpgradeCardProps = {
  upgrade: Upgrade;
  level: number;
  cost: number;
  canAfford: boolean;
  onBuy: (upgradeId: UpgradeId) => void;
};

export function UpgradeCard({
  upgrade,
  level,
  cost,
  canAfford,
  onBuy,
}: UpgradeCardProps) {
  return (
    <article>
      <h3>{upgrade.name}</h3>
      <p>{upgrade.description}</p>
      <p>Level: {level}</p>
      <p>Cost: {formatNumber(cost)} LOC</p>

      <button disabled={!canAfford} onClick={() => onBuy(upgrade.id)}>
        Buy
      </button>
    </article>
  );
}

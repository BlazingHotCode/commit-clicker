import { upgrades } from "../../game/data/upgrades";
import { getUpgradeCost } from "../../game/engine/formulas";
import type { GameState, UpgradeId } from "../../game/state/types";
import { UpgradeCard } from "./UpgradeCard";

type UpgradeShopProps = {
  state: GameState;
  onBuyUpgrade: (upgradeId: UpgradeId) => void;
};

export function UpgradeShop({ state, onBuyUpgrade }: UpgradeShopProps) {
  return (
    <section>
      <h2>Upgrade Shop</h2>

      <p className="section-help">Ship projects to unlock more upgrades.</p>

      <div className="upgrade-grid">
        {upgrades.map((upgrade) => {
          const level = state.upgrades[upgrade.id];
          const cost = getUpgradeCost(upgrade, level);
          const unlocked =
            upgrade.requiredProjectIds?.every((projectId) =>
              state.completedProjects.includes(projectId),
            ) ?? true;

          if (!unlocked) return null;

          return (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              level={level}
              cost={cost}
              canAfford={state.linesOfCode >= cost}
              locked={false}
              onBuy={onBuyUpgrade}
            />
          );
        })}
      </div>
    </section>
  );
}

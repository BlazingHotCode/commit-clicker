import type { Upgrade } from "../data/upgrades";

export function getUpgradeCost(upgrade: Upgrade, level: number): number {
  return Math.floor(upgrade.baseCost * upgrade.costMultiplier ** level);
}

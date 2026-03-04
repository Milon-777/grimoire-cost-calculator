import { GrimoireCost } from './grimoire-cost.type';
import { GrimoireStats } from './grimoire-stats.type';
import { GrimoireTotalStats } from './grimoire-total-stats.type';

export interface GrimoireCalculator<T extends GrimoireCost> {
  id: string;
  readonly costs: readonly T[];
  readonly stats: GrimoireTotalStats;
  getCosts(): readonly T[];
  getTotalCost(currentLevel: number, targetLevel: number): T;
  getUpgradeSteps(currentLevel: number, targetLevel: number): readonly T[];
  getPreviousLevel(step: T): number | null;
  getStats(liberationPercentage: number): GrimoireStats;
  getTotalStats(
    currentLevel: number,
    targetLevel: number,
    liberationPercentage: number,
  ): GrimoireStats;
}

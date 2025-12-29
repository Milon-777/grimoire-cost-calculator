import { GrimoireCost } from './grimoire-cost.type';

export interface GrimoireCalculator<T extends GrimoireCost = GrimoireCost> {
  id: string;
  readonly costs: readonly T[];
  getCosts(): readonly T[];
  getTotalCost(currentLevel: number, targetLevel: number): T;
  getUpgradeSteps(currentLevel: number, targetLevel: number): readonly T[];
  getPreviousLevel(step: T): number | null;
}

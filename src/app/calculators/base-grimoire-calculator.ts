import { GrimoireCost } from '../types/grimoire-cost.type';
import { GrimoireCalculator } from '../types/grimoire-calculator.type';
import { GrimoireStats } from '../types/grimoire-stats.type';
import { GrimoireTotalStats } from '../types/grimoire-total-stats.type';

export abstract class BaseGrimoireCalculator<
  T extends GrimoireCost,
> implements GrimoireCalculator<T> {
  abstract readonly id: string;
  abstract readonly costs: readonly T[];
  abstract readonly stats: GrimoireTotalStats;

  protected calculateStatsPerLevel(liberationPercentage: number): GrimoireStats {
    const atkPerLevel = (this.stats.totalAtk / this.stats.maxLevel) * (liberationPercentage / 100);
    const hpPerLevel = (this.stats.totalHp / this.stats.maxLevel) * (liberationPercentage / 100);

    return {
      atk: atkPerLevel,
      hp: hpPerLevel,
    };
  }

  protected findLevelIndex(level: number): number {
    const index = this.costs.findIndex((l) => l.level === level);
    if (index < 0) {
      throw new Error(`Level ${level} does not exist in the ${this.id} chapter`);
    }
    return index;
  }

  protected validateLevelRange(currentLevel: number, targetLevel: number): void {
    if (currentLevel >= targetLevel) {
      throw new Error('Current level must be less than target level');
    }
    this.findLevelIndex(currentLevel);
    this.findLevelIndex(targetLevel);
  }

  getCosts(): readonly T[] {
    return this.costs;
  }

  abstract getTotalCost(currentLevel: number, targetLevel: number): T;

  getUpgradeSteps(currentLevel: number, targetLevel: number): readonly T[] {
    const startIndex = this.costs.findIndex((l) => l.level === currentLevel);
    const endIndex = this.costs.findIndex((l) => l.level === targetLevel);

    if (startIndex < 0 || endIndex <= startIndex) return [];

    return this.costs.slice(startIndex + 1, endIndex + 1);
  }

  getPreviousLevel(step: T): number | null {
    const index = this.costs.findIndex((l) => l.level === step.level);
    return index > 0 ? this.costs[index - 1].level : null;
  }

  getStats(liberationPercentage: number): GrimoireStats {
    return this.calculateStatsPerLevel(liberationPercentage);
  }

  getTotalStats(
    currentLevel: number,
    targetLevel: number,
    liberationPercentage: number,
  ): GrimoireStats {
    const statsPerLevel = this.calculateStatsPerLevel(liberationPercentage);

    const totalAtk = statsPerLevel.atk * (targetLevel - currentLevel);
    const totalHp = statsPerLevel.hp * (targetLevel - currentLevel);

    return {
      atk: totalAtk,
      hp: totalHp,
    };
  }
}

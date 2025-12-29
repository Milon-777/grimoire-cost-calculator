import { ENABLING_CHAPTER_COSTS } from '../data/enabling-chapter-costs';
import { GrimoireCalculator } from '../types/grimoire-calculator.type';
import { EnablingCost } from '../types/enabling-cost.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnablingGrimoireCalculator implements GrimoireCalculator<EnablingCost> {
  id = 'enabling';
  readonly costs = ENABLING_CHAPTER_COSTS;

  getCosts(): readonly EnablingCost[] {
    return this.costs;
  }

  getTotalCost(currentLevel: number, targetLevel: number): EnablingCost {
    const upgradeSteps = this.getUpgradeSteps(currentLevel, targetLevel);
    const totalEssenceCost = upgradeSteps.reduce((sum, current) => sum + current.essence, 0);
    return {
      level: targetLevel,
      essence: totalEssenceCost,
      numberOfPicks: Math.ceil(totalEssenceCost / 1_400_000),
    };
  }

  getUpgradeSteps(currentLevel: number, targetLevel: number): readonly EnablingCost[] {
    const startIndex = this.costs.findIndex((l) => l.level === currentLevel);
    const endIndex = this.costs.findIndex((l) => l.level === targetLevel);

    if (startIndex < 0 || endIndex <= startIndex) return [];

    return this.costs.slice(startIndex + 1, endIndex + 1);
  }

  getPreviousLevel(step: EnablingCost): number | null {
    const index = this.costs.findIndex((l) => l.level === step.level);
    return index > 0 ? this.costs[index - 1].level : null;
  }
}

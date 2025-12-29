import { IMPRINT_CHAPTER_COSTS } from '../data/imprint-chapter-costs';
import { GrimoireCalculator } from '../types/grimoire-calculator.type';
import { ImprintCost } from '../types/imprint-cost.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImprintGrimoireCalculator implements GrimoireCalculator<ImprintCost> {
  id = 'imprint';
  readonly costs = IMPRINT_CHAPTER_COSTS;

  getCosts(): readonly ImprintCost[] {
    return this.costs;
  }

  getTotalCost(currentLevel: number, targetLevel: number): ImprintCost {
    const upgradeSteps = this.getUpgradeSteps(currentLevel, targetLevel);
    const totalEssenceCost = upgradeSteps.reduce((sum, current) => sum + current.essence, 0);
    const totalImprintCost = upgradeSteps.reduce((sum, current) => sum + current.imprint, 0);
    return {
      level: targetLevel,
      essence: totalEssenceCost,
      imprint: totalImprintCost,
      numberOfPicks: totalEssenceCost / 1_400_000,
    };
  }

  getUpgradeSteps(currentLevel: number, targetLevel: number): readonly ImprintCost[] {
    const startIndex = this.costs.findIndex((l) => l.level === currentLevel);
    const endIndex = this.costs.findIndex((l) => l.level === targetLevel);

    if (startIndex < 0 || endIndex <= startIndex) return [];

    return this.costs.slice(startIndex + 1, endIndex + 1);
  }

  getPreviousLevel(step: ImprintCost): number | null {
    const index = this.costs.findIndex((l) => l.level === step.level);
    return index > 0 ? this.costs[index - 1].level : null;
  }
}

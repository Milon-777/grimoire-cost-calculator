import { IMPRINT_CHAPTER_COSTS } from '../data/imprint-chapter-costs';
import { IMPRINT_CHAPTER_STATS } from '../data/imprint-chapter-stats';
import { ImprintCost } from '../types/imprint-cost.type';
import { Injectable } from '@angular/core';
import { CALCULATOR_CONSTANTS } from '../config/calculator.constants';
import { BaseGrimoireCalculator } from './base-grimoire-calculator';

@Injectable({
  providedIn: 'root',
})
export class ImprintGrimoireCalculator extends BaseGrimoireCalculator<ImprintCost> {
  override readonly id = 'imprint';
  override readonly costs = IMPRINT_CHAPTER_COSTS;
  override readonly stats = IMPRINT_CHAPTER_STATS;

  getTotalCost(currentLevel: number, targetLevel: number): ImprintCost {
    this.validateLevelRange(currentLevel, targetLevel);

    const upgradeSteps = this.getUpgradeSteps(currentLevel, targetLevel);
    const totalEssenceCost = upgradeSteps.reduce((sum, current) => sum + current.essence, 0);
    const totalImprintCost = upgradeSteps.reduce((sum, current) => sum + current.imprint, 0);
    return {
      level: targetLevel,
      essence: totalEssenceCost,
      imprint: totalImprintCost,
      essencePicks: Math.ceil(totalEssenceCost / CALCULATOR_CONSTANTS.ESSENCE_PICKS_DIVISOR),
      imprintPicks: Math.ceil(totalImprintCost / CALCULATOR_CONSTANTS.IMPRINT_PICKS_DIVISOR),
    };
  }
}

import { ENABLING_CHAPTER_COSTS } from '../data/enabling-chapter-costs';
import { EnablingCost } from '../types/enabling-cost.type';
import { Injectable } from '@angular/core';
import { ENABLING_CHAPTER_STATS } from '../data/enabling-chapter-stats';
import { CALCULATOR_CONSTANTS } from '../config/calculator.constants';
import { BaseGrimoireCalculator } from './base-grimoire-calculator';

@Injectable({
  providedIn: 'root',
})
export class EnablingGrimoireCalculator extends BaseGrimoireCalculator<EnablingCost> {
  override readonly id = 'enabling';
  override readonly costs = ENABLING_CHAPTER_COSTS;
  override readonly stats = ENABLING_CHAPTER_STATS;

  getTotalCost(currentLevel: number, targetLevel: number): EnablingCost {
    this.validateLevelRange(currentLevel, targetLevel);

    const upgradeSteps = this.getUpgradeSteps(currentLevel, targetLevel);
    const totalEssenceCost = upgradeSteps.reduce((sum, current) => sum + current.essence, 0);
    return {
      level: targetLevel,
      essence: totalEssenceCost,
      numberOfPicks: Math.ceil(totalEssenceCost / CALCULATOR_CONSTANTS.ESSENCE_PICKS_DIVISOR),
    };
  }
}

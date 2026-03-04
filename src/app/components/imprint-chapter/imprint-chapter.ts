import { DecimalPipe } from '@angular/common';
import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { ImprintGrimoireCalculator } from '../../calculators/imprint-grimoire-calculator';

@Component({
  selector: 'app-imprint-chapter',
  imports: [DecimalPipe],
  templateUrl: './imprint-chapter.html',
  styleUrl: './imprint-chapter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImprintChapter {
  private readonly calculator = inject(ImprintGrimoireCalculator);

  readonly currentLevel = signal(1);
  readonly targetLevel = signal(1);
  readonly liberationPercentage = signal(1);

  readonly costs = computed(() => this.calculator.costs);
  readonly stats = computed(() => this.calculator.getStats(this.liberationPercentage()));

  readonly upgradeSteps = computed(() => {
    return this.calculator.getUpgradeSteps(this.currentLevel(), this.targetLevel());
  });

  readonly totalCost = computed(() => {
    return this.calculator.getTotalCost(this.currentLevel(), this.targetLevel());
  });

  readonly totalStats = computed(() => {
    return this.calculator.getTotalStats(
      this.currentLevel(),
      this.targetLevel(),
      this.liberationPercentage(),
    );
  });

  setCurrentLevel(value: string): void {
    this.currentLevel.set(Number(value));
  }

  setTargetLevel(value: string): void {
    this.targetLevel.set(Number(value));
  }

  setLiberationPercentage(value: string): void {
    const percentage = Number(value);
    if (percentage < 0 || percentage > 100) {
      console.warn('Liberation percentage must be between 0 and 100');
      return;
    }
    this.liberationPercentage.set(percentage);
  }
}

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

  readonly costs = this.calculator.getCosts();

  readonly upgradeSteps = computed(() => {
    return this.calculator.getUpgradeSteps(this.currentLevel(), this.targetLevel());
  });

  readonly totalCost = computed(() => {
    return this.calculator.getTotalCost(this.currentLevel(), this.targetLevel());
  });

  setCurrentLevel(value: string) {
    return this.currentLevel.set(Number(value));
  }

  setTargetLevel(value: string) {
    return this.targetLevel.set(Number(value));
  }
}

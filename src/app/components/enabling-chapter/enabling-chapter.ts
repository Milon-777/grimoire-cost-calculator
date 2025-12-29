import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { EnablingGrimoireCalculator } from '../../calculators/enabling-grimoire-calculator';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-enabling-chapter',
  imports: [DecimalPipe],
  templateUrl: './enabling-chapter.html',
  styleUrl: './enabling-chapter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnablingChapter {
  private readonly calculator = inject(EnablingGrimoireCalculator);

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

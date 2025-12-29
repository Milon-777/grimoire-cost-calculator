import { GrimoireCost } from './grimoire-cost.type';

export interface EnablingCost extends GrimoireCost {
  essence: number;
  numberOfPicks?: number;
}

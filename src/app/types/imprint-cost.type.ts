import { GrimoireCost } from './grimoire-cost.type';

export interface ImprintCost extends GrimoireCost {
  essence: number;
  imprint: number;
  numberOfPicks?: number;
}

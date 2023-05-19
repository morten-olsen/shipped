import { Position } from "./math"

type Vessel = {
  position: Position;
  plan: Position[];
  data: Record<string, string>;
  direction: number;
  power: number;
  cash: number;
  fuel: {
    current: number;
    capacity: number;
  };
  score: {
    fuelUsed: number;
    distanceTravelled: number;
    rounds: number;
  };
  captain: string;
  goods: number;
}

export type { Vessel }
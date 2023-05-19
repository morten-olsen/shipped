import { MapTile } from "./map";
import { Port } from "./port";
import { Vessel } from "./vessel";

type CaptainCommandList = [{
  type: 'update-plan',
  plan: Vessel['plan']
}, {
  type: 'update-power',
  power: Vessel['power']
}, {
  type: 'fuel-up',
  amount?: number,
}, {
  type: 'buy',
  amount: number,
}, {
  type: 'sell',
  amount: number,
}, {
  type: 'record',
  name: string,
  data: string,
}]

type CaptainCommand = CaptainCommandList[number]

type CaptainView = {
  size: { width: number, height: number };
  currentPort?: Port;
  vessel: Vessel;
  ports: Port[];
  map: MapTile[][];
}

type CaptainAI = (view: CaptainView) => CaptainCommand[] | void;

type Captain = {
  command: CaptainAI;
}

export type { Captain, CaptainCommand, CaptainView, CaptainAI }

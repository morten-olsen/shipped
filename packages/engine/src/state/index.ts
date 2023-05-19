import { EventEmitter } from "eventemitter3";
import { Vessel } from "../types/vessel"
import { move } from "../utils/math";
import { getCurrentTile, getVesselTravelDelta, getVisiblePorts } from "../utils/vessel";
import { Captain, CaptainCommand } from "../types/captain";
import { Port } from "../types/port";
import { calculatePrice, findPort } from "../utils/port";
import { Effect } from "../types/effects";
import { MapTile } from "../types/map";

type StateEvents = {
  update: () => void;
}

type StateOptions = {
  size?: { width: number, height: number };
  map?: MapTile[][];
  ports?: Port[];
}

class State extends EventEmitter<StateEvents> {
  #size: { width: number, height: number };
  #vessels: Vessel[] = [];
  #ports: Port[] = [];
  #effects: Effect[] = [];
  #captains: Record<string, Captain> = {};
  #map: MapTile[][] = [];

  constructor(options: StateOptions = {}) {
    super();
    this.#size = options.size || { width: 50, height: 50 };
    this.#ports = options.ports || new Array(10).fill(0).map((_, i) => ({
      id: `port-${i}`,
      fuelPrice: 1,
      amount: Math.round(Math.random() * 100),
    }));
    this.#map = options.map || this.#generateMap();
  }

  #generateMap = () => {
    const map: MapTile[][] = [];
    const getData = () => {
      const draw = Math.random();
      if (draw < 0.01 && this.#ports.length > 0) return { type: 'port', id: this.#ports[Math.floor(Math.random() * this.#ports.length)].id };
      if (draw < 0.2) return { type: 'land' };
      return { type: 'water' };
    }

    for (let x = 0; x < Math.round(this.#size.width / 1); x++) {
      map[x] = [];
      for (let y = 0; y < Math.round(this.#size.height / 1); y++) {
        map[x][y] = {
          ...getData() as any,
        };
      }
    }
    return map;
  }

  #transact = (vessel: Vessel, amount: number) => {
    if (vessel.cash + amount < 0) return false;
    vessel.cash += amount;
    return true;
  };

  #applyCommand = (vessel: Vessel, command: CaptainCommand) => {
    const tile = getCurrentTile(vessel, this.#map);
    switch (command.type) {
      case "update-plan":
        vessel.plan = command.plan;
        break;
      case "update-power":
        vessel.power = command.power;
        break;
      case "fuel-up": {
        const port = findPort(tile, this.#ports);
        if (!port) return;
        const amount = command.amount ?? vessel.fuel.capacity - vessel.fuel.current;
        const cost = amount * port.fuelPrice;
        if (this.#transact(vessel, -cost)) {
          vessel.fuel.current += amount;
        }
        break;
      }
      case "buy": {
        const port = findPort(tile, this.#ports);
        if (!port) return;
        if (command.amount > port.amount) return;
        const cost = calculatePrice(port) * command.amount;
        if (this.#transact(vessel, -cost)) {
          vessel.goods += command.amount;
          port.amount -= command.amount;
        }
        break;
      }
      case "sell": {
        const port = findPort(tile, this.#ports);
        if (!port) return;
        if (command.amount > vessel.goods) return;
        const cost = calculatePrice(port) * command.amount;
        this.#transact(vessel, cost);
        vessel.goods -= command.amount;
        port.amount += command.amount;
        break;
      }
      case 'record': {
        vessel.data[command.name] = command.data;
        break;
      }
    }
  }

  public addPort = (port: Port) => {
    this.#ports.push(port);
    this.emit("update");
  }

  public addVessel = (vessel: Vessel) => {
    this.#vessels.push(vessel);
    this.emit("update");
  }

  public addCaptain = (id: string, captain: Captain) => {
    this.#captains[id] = captain;
    this.emit("update");
  }

  public addEffect = (effect: Effect) => {
    this.#effects.push(effect);
    this.emit("update");
  }

  public update = () => {
    for (const vessel of this.#vessels) {
      const captain = this.#captains[vessel.captain];
      if (!captain) continue;
      const currentTile = getCurrentTile(vessel, this.#map);
      if (currentTile.type === 'land') continue;
      const currentPort = findPort(currentTile, this.#ports);
      const visiblePorts = currentPort ? this.#ports : getVisiblePorts(vessel, this.#map, this.#ports);
      const commands = captain.command({
        vessel,
        currentPort,
        ports: visiblePorts,
        size: this.#size,
        map: this.#map,
      });
      if (commands) {
        for (const command of commands) {
          this.#applyCommand(vessel, command);
        }
      }


      const next = vessel.plan?.[0];
      if (next && vessel.fuel.current > 0) {
        const delta = getVesselTravelDelta(vessel);
        const moved = move(vessel.position, next, delta.speed);
        vessel.fuel.current -= delta.fuel;
        vessel.score.fuelUsed += delta.fuel;
        vessel.score.distanceTravelled += moved.travelled;

        vessel.position = moved.position;
        vessel.direction = moved.direction;
        if (moved.reached) {
          vessel.plan?.shift();
        }
      }
      vessel.score.rounds++;
    }
    this.emit("update");
  }

  public getState = () => {
    return {
      vessels: this.#vessels,
      ports: this.#ports,
    }
  };

  public getWorld = () => {
    return {
      size: this.#size,
      map: this.#map,
    }
  }
}

export type { StateOptions };
export { State }
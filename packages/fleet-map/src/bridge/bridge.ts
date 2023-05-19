import { EventEmitter } from 'eventemitter3';
import { MapTile, Vessel, Port } from '@shipped/engine';

type Update = {
  delta: State;
  hash: string;
}

type ConnectionEvents = {
  sync: (input: Sync) => void;
  update: (input: Update) => void;
}

abstract class Connection extends EventEmitter<ConnectionEvents> {}

type BridgeEvents = {
  update: () => void;
}

type World = {
  map: MapTile[][];
  size: { width: number, height: number };
}

type State = {
  vessels: Vessel[];
  ports: Port[];
}

type Sync = {
  world: World;
  state: State;
}

class Bridge extends EventEmitter<BridgeEvents> {
  #connection: Connection
  #state?: State;
  #world?: World;

  constructor(connection: Connection) {
    super();
    this.#connection = connection;
    this.#connection.on('sync', this.#onSync);
    this.#connection.on('update', this.#onUpdate);
  }

  public get state() {
    return this.#state;
  }

  public get world() {
    return this.#world;
  }

  #onSync = (input: Sync) => {
    this.#state = input.state;
    this.#world = input.world;
    this.emit('update');
  }

  #onUpdate = (input: Update) => {
    this.#state = input.delta;
    this.emit('update');
  }
}

export { Bridge, Connection };
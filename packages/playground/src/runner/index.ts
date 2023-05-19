/// <reference lib="webworker" />
import PF from 'pathfinding';
import { State, calculatePrice } from '@shipped/engine';
import { transpileModule, ModuleKind } from 'typescript';

const dependencies = {
  pathfinding: PF,
  '@shipped/engine': {
    calculatePrice,
  },
};

declare const self: DedicatedWorkerGlobalScope;
let state: State;

const setup = (payload: any) => {
  if (state) {
    state.removeAllListeners();
  }
  state = new State(payload);
  state.on('update', () => {
    self.postMessage(JSON.stringify({ type: 'update', payload: {
      delta: state.getState(),
    }}));
  }); 
  self.postMessage(JSON.stringify({ type: 'sync', payload: {
    state: state.getState(),
    world: state.getWorld(),
  }}));
  self.postMessage(JSON.stringify({ type: 'setup' }));
};

let captainId = 0;

self.onmessage = (event) => {
  const { type, payload } = JSON.parse(event.data)

  switch (type) {
    case 'setup': {
      setup(payload);
      const update = () => {
        state.update();
        setTimeout(update, 100);
      }
      update();
      break;
    }
    case 'run': {
      const { outputText: script } = transpileModule(payload.script, {
        compilerOptions: {
          module: ModuleKind.CommonJS,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      });
      const exports = {} as any;
      const module = { exports };
      const api = {
        module,
        exports,
        require: (name: string) => {
          const m = dependencies[name as keyof typeof dependencies];
          return m;
        },
      };
      const fn = new Function(...Object.keys(api), script);
      fn(...Object.values(api));

      state.addCaptain(`captain-${captainId++}`, {
        command: module.exports.default || module.exports,
      })
      const waterTiles = state.getWorld().map.map((row, y) => row.map((tile, x) => ({ x, y, tile })).filter(({ tile }) => tile.type === 'water')).flat();
      const start = waterTiles[Math.floor(Math.random() * waterTiles.length)];
      state.addVessel({
        captain: `captain-${captainId - 1}`,
        position: {
          x: start.x,
          y: start.y,
        },
        plan: [],
        data: {},
        direction: 0,
        power: 1,
        cash: 100000,
        fuel: {
          current: 100000,
          capacity: 100000,
        },
        score: {
          fuelUsed: 0,
          distanceTravelled: 0,
          rounds: 0,
        },
        goods: 0,
        ...payload.data,
      })
      break;
    }
  }
};
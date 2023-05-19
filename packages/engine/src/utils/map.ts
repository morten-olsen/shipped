import { MapTile } from "../types/map";
import { Port } from "../types/port";

type CreateMapOptions = {
  ports?: {
    [key: `${number},${number}`]: {
      name?: string;
    };
  }
}

const createMap = (width: number, height: number, options: CreateMapOptions = {}) => {
  const { ports } = options;
  const generatedPorts: Record<string, Port> = {};
  const generatedMap = new Array(height)
    .fill(0)
    .map(() => new Array(width)
      .fill(0)
      .map(() => ({
        type: 'water',
      } as MapTile))
    );
  
  for (const [key, port] of Object.entries(ports ?? {})) {
    const [x, y] = key.split(',').map(Number);
    const id = port.name ?? `${x},${y}`;
    if (!generatedPorts[id]) {
      generatedPorts[id] = {
        id,
        fuelPrice: 1,
        amount: 100,
      };
    }
    generatedMap[y][x] = {
      type: 'port',
      id,
    };
  }

  return {
    map: generatedMap,
    ports: Object.values(generatedPorts),
    size: {
      width,
      height,
    },
  }

};

export { createMap };
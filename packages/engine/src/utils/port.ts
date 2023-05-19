import { MapTile } from "../types/map";
import { Port } from "../types/port";

const calculatePrice = (port: Port) => {
  return Math.max(100 - port.amount, 1);
}

const findPort = (tile: MapTile, ports: Port[]) => {
  const id = tile.type === 'port' ? tile.id : undefined; 
  if (!id) return;
  return ports.find(p => p.id === id);
};

export { calculatePrice, findPort };
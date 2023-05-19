import { MapTile } from "../types/map";
import { Port } from "../types/port";
import { Vessel } from "../types/vessel";
import { intersect } from "./math";

const getVesselStats = (vessel: Vessel) => {
  return {
    visibility: 500,
    energy: 1,
    power: 1,
  };
};

const getCurrentTile = (vessel: Vessel, map: MapTile[][]) => {
  const x = Math.max(Math.floor(vessel.position.x), 0);
  const y = Math.max(Math.floor(vessel.position.y), 0);
  return map[y][x];
};

const getVisiblePorts = (vessel: Vessel, map: MapTile[][], ports: Port[]) => {
  const tiles = map.map((row, x) => row.filter(t => t.type === 'port').map((tile, y) => ({ tile, x, y }))).flat();
  const stats = getVesselStats(vessel);
  const visibleTiles = tiles.filter((port) => intersect(vessel.position, stats.visibility, { x: port.x, y: port.y }, 1));
  const ids = [...new Set(visibleTiles.map(t => t.tile.type === 'port' ? t.tile.id : ''))];
  return ports.filter(p => ids.includes(p.id));
};

const getVesselTravelDelta = (vessel: Vessel) => {
  const stats = getVesselStats(vessel);
  const speed = stats.power * vessel.power * 0.1;

  const fuel = stats.energy * vessel.power;
  return {
    speed,
    fuel,
  }
}

export { getVesselStats, getVesselTravelDelta, getVisiblePorts, getCurrentTile };
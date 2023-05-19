import { MapTile, PortMapTile, CaptainAI, CaptainCommand } from "@shipped/engine";
import PF from 'pathfinding';

// We start by defining a function that will be called every turn
const captain: CaptainAI = ({ vessel, map }) => {
  // Then we create an array to hold any commands we want to send to the vessel
  const commands: CaptainCommand[] = [];

  // If the vessel doesn't have a plan, give it one
  if (!vessel.plan || vessel.plan.length === 0) {
    commands.push({
      type: 'fuel-up',
    });

    // We get our list of port tiles
    const portTiles = findPorts(map);
    const withDistance = portTiles.map((port) => ({
      ...port,
      distance: Math.sqrt(
        Math.pow(port.x - vessel.position.x, 2) +
        Math.pow(port.y - vessel.position.y, 2)
      ),
    }));
    const closestPort = withDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);
    // And pick a random one
    const randomPort = closestPort[Math.floor(Math.random() * closestPort.length)];
    const grid = new PF.Grid(
      map.map((row) => row.map((tile) => tile.type !== 'land' ? 0 : 1))
    );
    const finder = new PF.AStarFinder();

    const path = PF.Util.compressPath(finder.findPath(
      Math.round(vessel.position.x), 
      Math.round(vessel.position.y),
      randomPort.x,
      randomPort.y,
      grid,
    ));

    commands.push({
      type: 'update-plan',
      // And then update the plan to navigate to it
      plan: path.map(([x, y]) => ({ x, y })),
    });
  }

  // Hand of the wheel
  return commands;
}

// Since we only have a tile map, we want to convert it into a list
// of all the port tiles
const findPorts = (tiles: MapTile[][]) => {
  const portTiles = tiles.map((row, y) => row.map((tile, x) => ({
    x,
    y,
    tile: tile as PortMapTile,
  }))).flat().filter(({ tile }) => tile.type === 'port');
  return portTiles;
};

export default captain;
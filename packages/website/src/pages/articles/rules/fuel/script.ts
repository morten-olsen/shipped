import { MapTile, PortMapTile, CaptainAI, CaptainCommand } from "@shipped/engine";

// We start by defining a function that will be called every turn
const captain: CaptainAI = ({ vessel, map, currentPort }) => {
  // Then we create an array to hold any commands we want to send to the vessel
  const commands: CaptainCommand[] = [];

  // If the vessel doesn't have a plan, give it one
  if (!vessel.plan || vessel.plan.length === 0) {
    // If we're at a port, we want to fuel up
    if (currentPort) {
      commands.push({
        type: 'fuel-up',
      });
    }

    // We get our list of port tiles
    const portTiles = findPorts(map);
    // And pick a random one
    const randomPort = portTiles[Math.floor(Math.random() * portTiles.length)];

    commands.push({
      type: 'update-plan',
      // And then update the plan to navigate to it
      plan: [randomPort],
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
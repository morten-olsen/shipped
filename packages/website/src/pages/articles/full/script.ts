import { MapTile, PortMapTile, CaptainAI, CaptainCommand, calculatePrice } from "@shipped/engine";
import PF from 'pathfinding';

// We start by defining a function that will be called every turn
const captain: CaptainAI = ({ vessel, map, currentPort }) => {
  // Then we create an array to hold any commands we want to send to the vessel
  const commands: CaptainCommand[] = [];

  // If the vessel doesn't have a plan, give it one
  if (!vessel.plan || vessel.plan.length === 0) {
    // We arrived at a port, so we should fuel up
    commands.push({
      type: 'fuel-up',
    });

    if (currentPort) {
      // Get the current price of goods at the port
      const goodsPrice = calculatePrice(currentPort);
      // And the amount we've paid for goods
      const paidPrice = parseFloat(vessel.data.paid || '0');

      // If the price is higher than what we paid, and we have goods, sell them
      if (goodsPrice > paidPrice && vessel.goods > 0) {
        commands.push({
          type: 'sell',
          amount: vessel.goods,
        });
      // If the price is lower than what we paid, and we have space, buy them
      } else {
        commands.push({
          type: 'buy',
          amount: 10,
        });
        commands.push({
          type: 'record',
          name: 'paid',
          data: goodsPrice.toString(),
        });
      }
    }

    // We get our list of port tiles
    const portTiles = findPorts(map);
    // And calculate the distance to each one
    const withDistance = portTiles.map((port) => ({
      ...port,
      distance: Math.sqrt(
        Math.pow(port.x - vessel.position.x, 2) +
        Math.pow(port.y - vessel.position.y, 2)
      ),
    }));
    // We select the 5 closest
    const closestPort = withDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);
    // And pick a random one
    const randomPort = closestPort[Math.floor(Math.random() * closestPort.length)];
    const grid = new PF.Grid(
      map.map((row) => row.map((tile) => tile.type !== 'land' ? 0 : 1))
    );
    const finder = new PF.AStarFinder();

    // We then use A* to find a path to it
    const path = PF.Util.compressPath(finder.findPath(
      Math.round(vessel.position.x), 
      Math.round(vessel.position.y),
      randomPort.x,
      randomPort.y,
      grid,
    ));

    commands.push({
      type: 'update-plan',
      // And then update the plan to navigate to our random port
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
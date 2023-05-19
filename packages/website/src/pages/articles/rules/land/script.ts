import { CaptainAI } from "@shipped/engine";


const captain: CaptainAI = ({ vessel, map }) => {
  if (!vessel.plan || vessel.plan.length === 0) {
    const connectedPassableTiles = [[0, -1], [1, 0], [0, 1], [-1, 0]].map(([ x, y ]) => ({
      x: vessel.position.x + x,
      y: vessel.position.y + y,
    })).filter(({ x, y }) => map[y]?.[x] && map[y][x].type !== 'land')
    const randomTile = connectedPassableTiles[Math.floor(Math.random() * connectedPassableTiles.length)];
    return [{
      type: 'update-plan',
      plan: [randomTile],
    }];
  }
}

export default captain;
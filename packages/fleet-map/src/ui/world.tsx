import { FC } from "react";
import { useBridgeWorld } from "../bridge";

const getTileColor = (type: string) => {
  if (type === "land") return "#78e08f";
  return "#e58e26";
}

const inset = 0.07;

const FleetMapWorld: FC = () => {
  const world = useBridgeWorld();

  if (!world) return null;

  const cellWidth = world.size.width / world.map[0].length;
  const cellHeight = world.size.height / world.map.length;

  return (
    <>
      <rect width={world.size.width * cellWidth} height={world.size.height * cellHeight} fill="#6a89cc" />
      {world.map.map((row, y) => row.map((cell, x) => ( cell.type === 'water' ? null :
        <rect
          key={`${x},${y}`}
          x={x * cellWidth + inset}
          y={y * cellHeight + inset}
          rx={0.2}
          width={cellWidth - inset * 2}
          height={cellHeight - inset * 2}
          stroke="#666"
          strokeWidth={0.1}
          fill={getTileColor(cell.type)}
        />
      ))).flat()}
    </>
  )
};

export { FleetMapWorld }

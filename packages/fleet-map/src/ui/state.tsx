
import { FC, Fragment } from "react";
import { Vessel, getVesselStats } from "@shipped/engine";
import { useBridgeState, useBridgeWorld } from "../bridge";

const getStatusColor = (vessel: Vessel) => {
  if (vessel.fuel.current <= 0) return "#e74c3c";
  if (vessel.fuel.current / vessel.fuel.capacity <= 0.2) return "#f39c12";
  return "#fefefe";
}

const FleetMapState: FC = () => {
  const world = useBridgeWorld();
  const state = useBridgeState();

  if (!world || !state) return null;

  const cellWidth = world.size.width / world.map[0].length;
  const cellHeight = world.size.height / world.map.length;

  return (
    <>
      {state.vessels.map((vessel, i) => (
        <g key={i}>
          {vessel.plan && vessel.plan.length > 0 && (
            <>
              <path
                d={`M${vessel.position.x * cellWidth + (cellWidth / 2)},${vessel.position.y * cellHeight + (cellHeight / 2)}L${vessel.plan.map(({ x, y }) => `${x * cellWidth + (cellWidth / 2)},${y * cellHeight + (cellHeight / 2)}`).join("L")}`}
                style={{ opacity: 0.3, transition: "transform 1s" }}
                stroke="#0a3d62"
                strokeLinejoin="round"
                strokeDasharray="0.4 0.4"
                strokeLinecap="round"
                strokeWidth={0.2}
                fill="none"
              />
              {vessel.plan.map(({ x, y }, i) => (
                <circle
                  opacity={0.6}
                  key={i}
                  cx={x * cellWidth + (cellWidth / 2)}
                  cy={y * cellHeight + (cellHeight / 2)}
                  r={0.15}
                  fill="#0a3d62"
                />
              ))}
            </>
          )}
        </g>
      ))}
      {state.vessels.map((vessel, i) => (
        <g key={i}>
          <g
            onMouseEnter={() => console.log(vessel)}
            transform={`translate(${vessel.position.x * cellWidth + (cellWidth / 2)},${vessel.position.y * cellHeight + (cellHeight / 2)}) rotate(${(vessel.direction || 0) * (180/Math.PI)})`}
            style={{ transition: "transform 0.3s" }}
          >
            <path
              d="M-1.5,-.5 L1.0,-.5 L1.5,0 L1.0,.5, L-1.5,.5 Z"
              stroke="#666"
              strokeWidth={0.1}
              fill={getStatusColor(vessel)}
            />
          </g>
        </g>
      ))}
    </>
  )
};

export { FleetMapState }

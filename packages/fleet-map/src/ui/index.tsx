import { FC } from "react";
import { FleetMapWorld } from "./world";
import { FleetMapState } from "./state";
import { useBridgeWorld } from "../bridge";

const FleetMap: FC = () => {
  const world = useBridgeWorld();

  if (!world) return null;

  return (
    <svg viewBox={`0 0 ${world.size.width} ${world.size.height}`}>
      <FleetMapWorld />
      <FleetMapState />
    </svg>
  )
};

export { FleetMap }

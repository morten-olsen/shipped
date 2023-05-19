import { useBridgeState, VesselInfo as FleetMapVesselInfo } from "@shipped/fleet-map";
import { useMemo } from "react";

const VesselInfo = () => {
  const state = useBridgeState();
  const vessel = useMemo(() => {
    return state?.vessels[0];
  }, [state]);

  if (!vessel) return null;

  return (
    <FleetMapVesselInfo vessel={vessel} />
  );
};

export { VesselInfo }
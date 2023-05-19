import { useMemo } from "react";
import { useBridgeState } from "@shipped/fleet-map";

const FuelGauge = () => {
  const state = useBridgeState();

  const fuel = useMemo(() => {
    if (!state) return;
    const vessel = state.vessels[0];
    if (!vessel) return;
    return vessel.fuel;
  }, [state])

  if (!fuel) return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-sm text-white'>
        Fuel
      </div>
      <div className='text-sm text-white'>
        {(fuel.current / fuel.capacity * 100).toFixed(2)}%
      </div>
    </div>
  )
}

export { FuelGauge }
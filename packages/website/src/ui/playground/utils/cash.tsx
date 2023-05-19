import { useMemo } from "react";
import { useBridgeState } from "@shipped/fleet-map";

const CashGauge = () => {
  const state = useBridgeState();

  const cash = useMemo(() => {
    if (!state) return;
    const vessel = state.vessels[0];
    if (!vessel) return;
    return vessel.cash;
  }, [state])


  if (typeof cash === 'undefined') return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-sm text-white'>
        Cash 
      </div>
      <div className='text-sm text-white'>
        {cash}
      </div>
    </div>
  )
}

export { CashGauge }
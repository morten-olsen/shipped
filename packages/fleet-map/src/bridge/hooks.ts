import { useContext, useEffect, useState } from "react"
import { BridgeContext } from "./context"

const useBridgeState = () => {
  const { bridge } = useContext(BridgeContext);
  const [state, setState] = useState(bridge?.state);
  useEffect(() => {
    if (!bridge) return;
    const update = () => {
      setState(bridge.state);
    }
    bridge.on('update', update);
    return () => {
      bridge.off('update', update);
    };
  }, [bridge]);

  return state;
}

const useBridgeWorld = () => {
  const { bridge } = useContext(BridgeContext);
  const [state, setState] = useState(bridge?.world);
  useEffect(() => {
    if (!bridge) return;
    const update = () => {
      setState(bridge.world);
    }
    bridge.on('update', update);
    return () => {
      bridge.off('update', update);
    };
  }, [bridge]);

  return state;
}

export {
  useBridgeState,
  useBridgeWorld,
};
import { createContext } from "react";
import { Bridge } from "."

type BridgeContextValue = {
  bridge?: Bridge;
}

type BridgeContextProviderProps = {
  bridge?: Bridge;
  children: React.ReactNode;
}

const BridgeContext = createContext<BridgeContextValue>(undefined as any);

const BridgeProvider: React.FC<BridgeContextProviderProps> = ({ bridge, children }) => {
  return (
    <BridgeContext.Provider value={{ bridge }}>
      {children}
    </BridgeContext.Provider>
  )
}

export { BridgeContext, BridgeProvider };
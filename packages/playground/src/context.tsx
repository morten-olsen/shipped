import { FC, createContext, useCallback, useEffect, useState } from "react"
import { Bridge, BridgeProvider, Connection } from "@shipped/fleet-map";
import { StateOptions, Vessel } from "@shipped/engine";

class WorkerConnection extends Connection {
  #worker: Worker;

  constructor(worker: Worker) {
    super();
    this.#worker = worker;
    this.#worker.addEventListener('message', this.#onMessage);
  }

  #onMessage = (event: MessageEvent) => {
    const { type, payload } = JSON.parse(event.data);

    switch (type) {
      case 'sync': {
        this.emit('sync', payload);
        break;
      }
      case 'update': {
        this.emit('update', payload);
        break;
      }
    }
  }
}

type PlaygroundContextValue = {
  bridge?: Bridge;
  running?: boolean;
  errors: string[];
  run: (script: string, data?: Partial<Omit<Vessel, 'captain'>>) => void;
  launch: (script: string, data?: Partial<Omit<Vessel, 'captain'>>) => void;
  stop: () => void;
};

type PlaygroundProviderProps = {
  children: React.ReactNode;
  map?: StateOptions;
  createWorker: () => Worker;
  onRun?: () => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue>(undefined as any);

const PlaygroundProvider: FC<PlaygroundProviderProps> = ({ children, map, onRun, createWorker }) => {
  const [worker, setWorker] = useState<Worker>();
  const [bridge, setBridge] = useState<Bridge>();
  const [running, setRunning] = useState<boolean>(false);

  const run = useCallback((script: string, data?: Partial<Omit<Vessel, 'captain'>>) => {
    setRunning(false);
    const run = async () => {
      const nextWorker = createWorker();
      nextWorker.addEventListener('message', (event) => {
        const { type } = JSON.parse(event.data);
        switch (type) {
          case 'setup': {
            setRunning(true);
            nextWorker.postMessage(JSON.stringify({ type: 'run', payload: {
              script,
              data,
            }}));
            break;
          }
        }
      });
      const connection = new WorkerConnection(nextWorker);
      const bridge = new Bridge(connection);
      nextWorker.postMessage(JSON.stringify({ type: 'setup', payload: map }));
      if (onRun) {
        onRun();
      }
      setWorker(nextWorker);
      setBridge(bridge);
    }
    run();
  }, [map]);

  const launch = useCallback((script: string, data?: Partial<Omit<Vessel, 'captain'>>) => {
    const run = async () => {
      if (!worker) {
        return;
      }
      worker.postMessage(JSON.stringify({ type: 'run', payload: {
        script,
        data,
      }}));
    }
    run();
  }, [worker]);


  const stop = useCallback(() => {
    worker?.terminate();
    setWorker(undefined);
  }, [worker]);

  useEffect(() => {
    return () => {
      stop();
    }
  }, []);

  return (
    <PlaygroundContext.Provider value={{
      bridge,
      launch,
      running,
      run,
      stop,
      errors: [],
    }}>
      <BridgeProvider bridge={bridge}>
        {children}
      </BridgeProvider>
    </PlaygroundContext.Provider>
  )
}

export { PlaygroundContext, PlaygroundProvider };
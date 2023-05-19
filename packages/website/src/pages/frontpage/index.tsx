import { Link } from "react-router-dom";
import { FleetMap } from "@shipped/fleet-map";
import { PlaygroundProvider, usePlaygroundLaunch, usePlaygroundRun, usePlaygroundRunning } from "@shipped/playground"
import { useEffect } from "react";
import script from './script.ts?raw';

const createWorker = () => new Worker(new URL('../../worker.ts', import.meta.url), { type: 'module' });

const Demo = () => {
  const run = usePlaygroundRun();
  const running = usePlaygroundRunning();
  const launch = usePlaygroundLaunch();

  useEffect(() => {
    run(script);
  }, [run]);

  useEffect(() => {
    if (!running) {
      return;
    }
    for (let i = 0; i < 7; i++) {
      launch(script);
    }
  }, [running, launch]);

  return (
    <FleetMap />
  )
}

const Frontpage = () => {
  return (
    <PlaygroundProvider createWorker={createWorker}> 
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-600 -z-10">
        <div className="opacity-50">
          <Demo />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full" style={{ backdropFilter: 'blur(2px)' }}>
        <div className="bg-white flex flex-col items-center justify-center p-10 shadow-2xl rounded-lg">
          <h1 className='text-8xl tracking-widest uppercase font-thin'>Shipped</h1>
          <p className='text-2xl pb-8 font-light'>Launch your bot based shipping empire</p>
          <div className='flex flex-row space-x-4'>
            <Link to="/articles/intro">
              <button className="button">
                Learn
              </button>
            </Link>
            <Link to="/game">
              <button className="button">
                Play
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PlaygroundProvider>
  );
}

export { Frontpage }
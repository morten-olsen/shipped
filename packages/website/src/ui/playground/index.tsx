import { StateOptions, Vessel } from '@shipped/engine';
import { FleetMap } from '@shipped/fleet-map';
import { PlaygroundProvider, Editor, usePlaygroundRun } from '@shipped/playground';
import { useCallback, useEffect, useState } from 'react';

const createWorker = () => new Worker(new URL('../../worker.ts', import.meta.url), { type: 'module' });

type Props = {
  map?: StateOptions
  script?: Promise<{ default: string }>
  utils?: any;
  vessel?: Partial<Omit<Vessel, 'captain'>>;
};

const PlaygroundView: React.FC<Props> = ({ script, vessel, utils  }) => {
  const [, setInitialScript] = useState<string>('');
  const [currentScript, setCurrentScript] = useState<string>('');
  useEffect(() => {
    const run = async () => {
      if (!script) return;
      const raw = await script;
      setInitialScript(raw.default);
      setCurrentScript(raw.default);
    }
    run();
  }, [script])
  const runPlayground = usePlaygroundRun();
  const run = useCallback(() => {
    runPlayground(currentScript, vessel);
  }, [currentScript, runPlayground, vessel]);
  return (
    <div className='flex flex-col sm:flex-row h-full w-full items-stretch justify-stretch bg-slate-600'>
      <div className='flex-1'>
        <Editor onRun={run} className='h-full min-h-[400px]' value={currentScript} onValueChange={setCurrentScript} />
      </div>
      <div className='flex-1'>
        <div className='m-4 flex flex-col items-stretch justify-items-stretch'>
          <div className='flex-1 rounded-lg overflow-hidden'>
          <FleetMap />
          </div>
          {utils && (
            <div className='flex-1'>
              {utils}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Playground: React.FC<Props> = (props) => {
  const { map } = props;
  return (
    <PlaygroundProvider createWorker={createWorker} map={map}>
      <PlaygroundView  {...props} /> 
    </PlaygroundProvider>
  );
};

export { Playground }
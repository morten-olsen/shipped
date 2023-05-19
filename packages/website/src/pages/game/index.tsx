import { FleetMap } from "@shipped/fleet-map"
import { PlaygroundProvider } from "@shipped/playground"
import { GameProvider } from "./context";
import { Editor } from "./editor";
import { Sidebar } from "./sidebar";
import { VesselInfo } from "@/ui/playground/utils/vessel";

const createWorker = () => new Worker(new URL('../../worker.ts', import.meta.url), { type: 'module' });

const Game = () => {
  return (
    <PlaygroundProvider createWorker={createWorker}>
      <GameProvider>
        <div className="flex h-full w-full bg-slate-600">
          <Sidebar />
          <Editor />
          <div className="flex-1 flex-col bg-slate-800 flex p-4">
            <FleetMap />
            <VesselInfo />
          </div>
        </div>
      </GameProvider>
    </PlaygroundProvider>
  )
}

export { Game }
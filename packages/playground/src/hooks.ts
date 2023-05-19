import { useContext } from "react"
import { PlaygroundContext } from "./context";

const usePlaygroundRun = () => {
  const { run } = useContext(PlaygroundContext);
  return run;
}

const usePlaygroundRunning = () => {
  const { running } = useContext(PlaygroundContext);
  return running;
}

const usePlaygroundLaunch = () => {
  const { launch } = useContext(PlaygroundContext);
  return launch;
}

export { usePlaygroundRun, usePlaygroundRunning, usePlaygroundLaunch }
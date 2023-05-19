import { CaptainAI } from "@shipped/engine";

// We start by defining a function that will be called every turn
const captain: CaptainAI = ({ vessel }) => {
  // If the vessel already have a plan we don't want to do anything
  if (vessel.plan && vessel.plan.length > 0) {
    return;
  }

  // If the vessel doesn't have a plan, give it one
  return [{
    type: 'update-plan',
    // This is a plan to move to the tile at (8, 1)
    plan: [{ x: 8, y: 1 }],
  }];
}

export default captain;
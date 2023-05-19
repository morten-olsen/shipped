// eslint-disable @typescript-eslint/ban-ts-comment

// @ts-ignore
import pathfinding from '@types/pathfinding/index.d.ts?raw';
// @ts-ignore
import engine from '@shipped/engine/dist/esm/types/index.d.ts?raw';
// @ts-ignore
import engineVessel from '@shipped/engine/dist/esm/types/types/vessel.d.ts?raw';
// @ts-ignore
import engineCaptain from '@shipped/engine/dist/esm/types/types/captain.d.ts?raw';
// @ts-ignore
import engineMap from '@shipped/engine/dist/esm/types/types/map.d.ts?raw';
// @ts-ignore
import enginePort from '@shipped/engine/dist/esm/types/types/port.d.ts?raw';
// @ts-ignore
import engineMath from '@shipped/engine/dist/esm/types/types/math.d.ts?raw';

// @ts-ignore
import engineUtilsMath from '@shipped/engine/dist/esm/types/utils/math.d.ts?raw';
// @ts-ignore
import engineUtilsMap from '@shipped/engine/dist/esm/types/utils/map.d.ts?raw';
// @ts-ignore
import engineUtilsPort from '@shipped/engine/dist/esm/types/utils/port.d.ts?raw';
// @ts-ignore
import engineUtilsVessel from '@shipped/engine/dist/esm/types/utils/vessel.d.ts?raw';

const typings = {
  pathfinding,
  '@shipped/engine/types/captain.d.ts': engineCaptain,
  '@shipped/engine/types/vessel.d.ts': engineVessel,
  '@shipped/engine/types/map.d.ts': engineMap,
  '@shipped/engine/types/port.d.ts': enginePort,
  '@shipped/engine/types/math.d.ts': engineMath,
  '@shipped/engine/utils/math.d.ts': engineUtilsMath,
  '@shipped/engine/utils/map.d.ts': engineUtilsMap,
  '@shipped/engine/utils/port.d.ts': engineUtilsPort,
  '@shipped/engine/utils/vessel.d.ts': engineUtilsVessel,
  '@shipped/engine/index.d.ts': engine,
}

export { typings };
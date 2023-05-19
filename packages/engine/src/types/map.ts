type PortMapTile = {
  type: 'port';
  id: string;
};

type MapTile = {
  type: 'water' | 'land';
} | PortMapTile;

export type { MapTile, PortMapTile };
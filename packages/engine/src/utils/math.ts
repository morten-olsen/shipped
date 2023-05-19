import { Position } from "../types/math";

const distance = (a: Position, b: Position) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const direction = (a: Position, b: Position) => {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

const intersect = (aposition: Position, asize: number, bposition: Position, bsize: number) => {
  const dist = distance(aposition, bposition);
  return dist < asize + bsize;
}

const move = (a: Position, b: Position, length: number) => {
  const dist = distance(a, b);
  const dir = direction(a, b);
  if (dist < length) return {
    position: b,
    direction: dir,
    reached: true,
    travelled: dist,
  };
  const x = a.x + Math.cos(dir) * Math.min(dist, length);
  const y = a.y + Math.sin(dir) * Math.min(dist, length);
  return {
    position: { x, y },
    travelled: length,
    direction: dir,
    reached: false,
  };
}

export { distance, direction, move, intersect }
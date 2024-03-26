import { Point } from "./ball";
import Movement from "./movement";

export default class MouseObject {
  position: Point;
  prevPosition: Point;
  radius: number;
  movement: Movement;

  constructor({ radius }: { radius: number }) {
    this.position = { x: Infinity, y: Infinity };
    this.prevPosition = { x: Infinity, y: Infinity };
    this.radius = radius;

    this.movement = new Movement({ velocity: { x: 0, y: 0 } });
  }
}

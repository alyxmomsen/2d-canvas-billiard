import Ball, { Point } from "./ball";
import { detectCollision, resolveCollision } from "./lib/my-lib";
import MouseObject from "./mouse-object";

export default class BillardGame {
  balls: Ball[];
  frame: { width: number; height: number };
  // mouse: Point;
  mouseObject: MouseObject;

  update({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
    this.balls.forEach((subject) => {
      for (const object of [...this.balls, this.mouseObject]) {
        if (object === subject) continue;

        const collision = detectCollision(subject, object, this.frame);

        if (collision) {
          resolveCollision(subject, object, 0.91);
        }
      }

      subject.update();
    });
  }

  render({
    ctx,
    canvasRef,
  }: {
    ctx: CanvasRenderingContext2D;
    canvasRef: React.RefObject<HTMLCanvasElement>;
  }) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 600);

    const canvasPosition = canvasRef.current?.getBoundingClientRect();

    this.balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });

    ctx.beginPath();
    ctx.arc(
      this.mouseObject.position.x -
        (canvasPosition !== undefined ? canvasPosition.x : 0),
      this.mouseObject.position.y -
        (canvasPosition !== undefined ? canvasPosition.y : 0),
      this.mouseObject.radius,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
  }

  constructor() {
    this.mouseObject = new MouseObject({ radius: 50 });
    window.addEventListener("mousemove", (e) => {
      this.mouseObject.position.x = e.clientX;
      this.mouseObject.position.y = e.clientY;
    });

    this.frame = { width: 800, height: 600 };
    this.balls = [
      new Ball({
        position: { x: Math.random() * 700, y: Math.random() * 500 },
        velocity: { x: Math.random() * 2, y: Math.random() * 2 },
        radius: 50,
        color: "red",
      }),
    ];

    for (let i = 0; i < 50; i++) {
      this.balls.push(
        new Ball({
          position: { x: Math.random() * 600, y: Math.random() * 400 },
          velocity: { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 },
          radius: 25,
          color: randomColor(),
        }),
      );
    }
  }
}

function randomColor() {
  let str = "#";
  const letters = ["a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < 6; i++) {
    const number = Math.floor(Math.random() * 16);

    str += number > 9 ? letters[number - 9] : number;
  }

  return str;
}

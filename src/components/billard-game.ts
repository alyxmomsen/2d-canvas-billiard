import Ball, { Point } from "./ball";
import MouseObject from "./mouse-object";

export default class BillardGame {
  balls: Ball[];
  frame: { width: number; height: number };
  mouse: Point;
  mouseObject:MouseObject ;

  update() {
    this.balls.forEach((subject) => {
      for (const object of this.balls) {
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
      this.mouseObject.position.x - (canvasPosition !== undefined ? canvasPosition.x : 0),
      this.mouseObject.position.y - (canvasPosition !== undefined ? canvasPosition.y : 0),
      this.mouseObject.radius , 
      0 ,
      2 * Math.PI ,
    );
    ctx.fillStyle = "purple" ;
    ctx.fill();
    ctx.closePath();
  }

  constructor() {
    this.mouse = { x: Infinity, y: Infinity };
    this.mouseObject = new MouseObject({radius:50});
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      this.mouseObject.position.x = e.clientX ;
      this.mouseObject.position.y = e.clientY ;


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

function detectCollision(
  ballA: Ball,
  ballB: Ball,
  frame: { width: number; height: number },
): boolean {
  if (ballA.position.x + ballA.movement.velocity.x - ballA.radius <= 0) {
    ballA.movement.velocity.x = -ballA.movement.velocity.x;
  } else if (
    ballA.position.x + ballA.movement.velocity.x + ballA.radius >=
    frame.width
  ) {
    ballA.movement.velocity.x = -ballA.movement.velocity.x;
  }

  if (ballA.position.y + ballA.movement.velocity.y - ballA.radius <= 0) {
    ballA.movement.velocity.y = -ballA.movement.velocity.y;
  } else if (
    ballA.position.y + ballA.movement.velocity.y + ballA.radius >=
    frame.height
  ) {
    ballA.movement.velocity.y = -ballA.movement.velocity.y;
  }

  const distance = Math.sqrt(
    Math.pow(
      ballB.position.x +
        ballB.movement.velocity.x -
        (ballA.position.x + ballA.movement.velocity.x),
      2,
    ) +
      Math.pow(
        ballB.position.y +
          ballB.movement.velocity.y -
          (ballA.position.y - ballA.movement.velocity.y),
        2,
      ),
  );
  return distance <= ballA.radius + ballB.radius;
}

function resolveCollision(ballA: Ball, ballB: Ball, speedLoss: number): void {
  const collisionNormal = {
    x: ballB.position.x - ballA.position.x,
    y: ballB.position.y - ballA.position.y,
  };
  const magnitude = Math.sqrt(
    Math.pow(collisionNormal.x, 2) + Math.pow(collisionNormal.y, 2),
  );
  collisionNormal.x /= magnitude;
  collisionNormal.y /= magnitude;

  const relativeVelocity = {
    x: ballB.movement.velocity.x - ballA.movement.velocity.x,
    y: ballB.movement.velocity.y - ballA.movement.velocity.y,
  };
  const speedAlongNormal =
    relativeVelocity.x * collisionNormal.x +
    relativeVelocity.y * collisionNormal.y;

  if (speedAlongNormal > 0) {
    return; // Balls are moving away from each other, no collision
  }

  const impulseMagnitude =
    (-2 * speedAlongNormal) / (1 / ballA.radius + 1 / ballB.radius);

  const impulse = {
    x: impulseMagnitude * collisionNormal.x,
    y: impulseMagnitude * collisionNormal.y,
  };

  ballA.movement.velocity.x -= (1 / ballA.radius) * impulse.x;
  ballA.movement.velocity.y -= (1 / ballA.radius) * impulse.y;
  ballB.movement.velocity.x += (1 / ballB.radius) * impulse.x;
  ballB.movement.velocity.y += (1 / ballB.radius) * impulse.y;

  /* test */

  ballA.movement.velocity.x *= speedLoss;
  ballA.movement.velocity.y *= speedLoss;
  ballB.movement.velocity.x *= speedLoss;
  ballB.movement.velocity.y *= speedLoss;
}

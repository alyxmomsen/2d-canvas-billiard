import Ball from "../ball";
import MouseObject from "../mouse-object";

export function resolveCollision(
  ballA: Ball,
  ballB: Ball | MouseObject,
  speedLoss: number,
): void {
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

  if (ballB instanceof MouseObject) {
    // alert();
  }
}

export function detectCollision(
  ballA: Ball | MouseObject,
  ballB: Ball | MouseObject,
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

  if (ballB instanceof MouseObject && distance <= ballA.radius + ballB.radius) {
    console.log("mouse collision ");
  }

  return distance <= ballA.radius + ballB.radius;
}

export function randomColor() {
    let str = "#";
    const letters = ["a", "b", "c", "d", "e", "f"];
    for (let i = 0; i < 6; i++) {
      const number = Math.floor(Math.random() * 16);
  
      str += number > 9 ? letters[number - 9] : number;
    }
  
    return str;
  }

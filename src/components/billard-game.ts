import Ball from "./ball";

export default class BillardGame {
  balls: Ball[];
  

  update() {

    this.balls.forEach((subject) => {
        for (const object of this.balls) {

            if(object === subject) continue ;

            const collision = detectCollision(subject , object);

            if(collision) {
                // alert();

                console.log('collision');

            }


        }


        subject.update() ;
    });



  }

  render(ctx:CanvasRenderingContext2D) {
 
    ctx.fillStyle = 'white' ;
    ctx.fillRect(0 , 0 , 800 , 600) ;

      this.balls.forEach(ball => {
          
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });

  }

  constructor() {

    

    this.balls = [
        new Ball({position:{ x: 0, y: 100 } , velocity:{ x: 1, y: 0 } , radius:50 , color:'red'}) ,
        new Ball({position:{ x: 500, y: 100 } , velocity:{ x: -1, y: 0 } , radius:50 , color:'green'}) ,
    ];
  }
}

function detectCollision(ballA: Ball, ballB: Ball): boolean {
  const distance = Math.sqrt(
    Math.pow(ballB.position.x - ballA.position.x, 2) +
      Math.pow(ballB.position.y - ballA.position.y, 2),
  );
  return distance <= ballA.radius + ballB.radius;
}

function resolveCollision(ballA: Ball, ballB: Ball): void {
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
    x: ballB.velocity.x - ballA.velocity.x,
    y: ballB.velocity.y - ballA.velocity.y,
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

  ballA.velocity.x -= (1 / ballA.radius) * impulse.x;
  ballA.velocity.y -= (1 / ballA.radius) * impulse.y;
  ballB.velocity.x += (1 / ballB.radius) * impulse.x;
  ballB.velocity.y += (1 / ballB.radius) * impulse.y;
}

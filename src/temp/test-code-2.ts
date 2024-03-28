// Определяем интерфейс для шара
interface Ball {
    x: number; // координата x шара
    y: number; // координата y шара
    speed: number; // скорость шара
    angle: number; // угол движения шара (в радианах)
    radius: number; // радиус шара
  }
  
  // Функция для вычисления взаимодействия двух шаров
  export function collide_TestFunction(b1: Ball, b2: Ball): void {
    // Вычисляем разницу координат между шарами
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
  
    // Вычисляем расстояние между центрами шаров
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    // Вычисляем сумму радиусов шаров
    const sumOfRadii = b1.radius + b2.radius;
  
    // Проверяем, если шары пересекаются
    if (distance < sumOfRadii) {
      // Вычисляем угол столкновения
      const angle = Math.atan2(dy, dx);
  
      // Вычисляем новые скорости шаров после столкновения
      const v1x = b1.speed * Math.cos(b1.angle - angle);
      const v1y = b1.speed * Math.sin(b1.angle - angle);
      const v2x = b2.speed * Math.cos(b2.angle - angle);
      const v2y = b2.speed * Math.sin(b2.angle - angle);
  
      // Вычисляем новые скорости шаров после потери энергии
      const newSpeed1 = (v1x * (b1.radius - b2.radius) + 2 * b2.radius * v2x) / sumOfRadii;
      const newSpeed2 = (v2x * (b2.radius - b1.radius) + 2 * b1.radius * v1x) / sumOfRadii;
  
      // Вычисляем новые углы движения шаров
      b1.angle = Math.atan2(newSpeed1, v1y) + angle;
      b2.angle = Math.atan2(newSpeed2, v2y) + angle;
  
      // Обновляем скорости шаров после потери энергии
      b1.speed = Math.sqrt(newSpeed1 * newSpeed1 + v1y * v1y);
      b2.speed = Math.sqrt(newSpeed2 * newSpeed2 + v2y * v2y);
    }
  }


  // Функция для предсказания будущих столкновений шаров
  function predictCollisions(balls: Ball[], duration: number): Ball[] {
    const predictedBalls: Ball[] = [];
  
    // Создаем копию массива шаров для предсказания
    const predictedBallsCopy = balls.map((ball) => ({ ...ball }));
  
    // Проходимся по каждому шару для предсказания столкновий
    for (let i = 0; i < predictedBallsCopy.length; i++) {
      const ball = predictedBallsCopy[i];
  
      // Предсказываем будущую позицию шара в течение заданной длительности
      const predictedX = ball.x + ball.speed * Math.cos(ball.angle) * duration;
      const predictedY = ball.y + ball.speed * Math.sin(ball.angle) * duration;
  
      // Обновляем предсказанную позицию шара
      ball.x = predictedX;
      ball.y = predictedY;
  
      // Добавляем шар в список предсказанных шаров
      predictedBalls.push(ball);
    }
  
    return predictedBalls;
  }

  interface Ball_test {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    radius: number;
  }

  function calculateCollisions(ball1: Ball_test, ball2: Ball_test): void {
    // Calculate next positions
    const nextPosition1 = {
      x: ball1.position.x + ball1.velocity.x,
      y: ball1.position.y + ball1.velocity.y,
    };
    const nextPosition2 = {
      x: ball2.position.x + ball2.velocity.x,
      y: ball2.position.y + ball2.velocity.y,
    };
  
    // Calculate distance and collision direction
    const dx = nextPosition2.x - nextPosition1.x;
    const dy = nextPosition2.y - nextPosition1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collisionAngle = Math.atan2(dy, dx);
  
    if (distance < ball1.radius + ball2.radius) {
      // Calculate overlap and penetration depth
      const overlap = ball1.radius + ball2.radius - distance;
      const penetrationDepth = overlap / 2;
  
      // Calculate correction vectors
      const correctionVector = {
        x: penetrationDepth * Math.cos(collisionAngle),
        y: penetrationDepth * Math.sin(collisionAngle),
      };
  
      // Adjust positions to prevent penetration
      ball1.position.x -= correctionVector.x;
      ball1.position.y -= correctionVector.y;
      ball2.position.x += correctionVector.x;
      ball2.position.y += correctionVector.y;
  
      // Calculate relative velocity
      const relativeVelocity = {
        x: ball2.velocity.x - ball1.velocity.x,
        y: ball2.velocity.y - ball1.velocity.y,
      };
  
      // Calculate collision impulse
      const impulse = 2 * (relativeVelocity.x * dx + relativeVelocity.y * dy) / distance;
  
      // Update velocities
      ball1.velocity.x += (impulse * dx) / distance;
      ball1.velocity.y += (impulse * dy) / distance;
      ball2.velocity.x -= (impulse * dx) / distance;
      ball2.velocity.y -= (impulse * dy) / distance;
    }
  
    // Update positions
    ball1.position.x = nextPosition1.x;
    ball1.position.y = nextPosition1.y;
    ball2.position.x = nextPosition2.x;
    ball2.position.y = nextPosition2.y;
  }


  
  
  

  
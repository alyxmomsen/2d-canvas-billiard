import Ball from "../components/ball";

function resolveCollision(ballA:Ball, ballB:Ball, speedLoss:number) {
    // 1. Вычисление вектора нормали столкновения между шарами
    const collisionNormal = {
      x: ballB.position.x - ballA.position.x,
      y: ballB.position.y - ballA.position.y,
    };
  
    // 2. Вычисление угла столкновения
    const collisionAngle = Math.atan2(collisionNormal.y, collisionNormal.x);
  
    // 3. Вычисление относительной скорости вдоль нормали столкновения
    const relativeVelocity = {
      x: ballB.movement.velocity.x - ballA.movement.velocity.x,
      y: ballB.movement.velocity.y - ballA.movement.velocity.y,
    };
    const speedAlongNormal =
      relativeVelocity.x * Math.cos(collisionAngle) +
      relativeVelocity.y * Math.sin(collisionAngle);
  
    // 4. Проверка, движутся ли шары друг от друга
    if (speedAlongNormal > 0) {
      // Шары движутся друг от друга, нет столкновения
      return;
    }
  
    // 5. Вычисление величины импульса
    const impulseMagnitude =
      (-2 * speedAlongNormal) / (1 / ballA.radius + 1 / ballB.radius);
  
    // 6. Вычисление вектора импульса
    const impulse = {
      x: impulseMagnitude * Math.cos(collisionAngle),
      y: impulseMagnitude * Math.sin(collisionAngle),
    };
  
    // 7. Применение импульса к шарам для изменения их скоростей
    // Уменьшение скорости шара A
    ballA.movement.velocity.x -= (1 / ballA.radius) * impulse.x;
    ballA.movement.velocity.y -= (1 / ballA.radius) * impulse.y;
    // Увеличение скорости шара B
    ballB.movement.velocity.x += (1 / ballB.radius) * impulse.x;
    ballB.movement.velocity.y += (1 / ballB.radius) * impulse.y;
  
    // 8. Применение коэффициента потери скорости к шарам
    ballA.movement.velocity.x *= speedLoss;
    ballA.movement.velocity.y *= speedLoss;
    ballB.movement.velocity.x *= speedLoss;
    ballB.movement.velocity.y *= speedLoss;
  
    // 9. Вычисление угла отклонения на основе разницы в диаметрах
    const diameterDifference = ballB.radius - ballA.radius;
    const deflectionAngle =
      Math.atan2(collisionNormal.y, collisionNormal.x) + Math.PI / 2;
  
    // 10. Применение отклонения к шару A
    // Изменение скорости шара A в соответствии с отклонением
    ballA.movement.velocity.x += diameterDifference * Math.cos(deflectionAngle);
    ballA.movement.velocity.y += diameterDifference * Math.sin(deflectionAngle);
  
    // 11. Применение отклонения к шару B
    // Изменение скорости шара B в противоположном направлении отклонения
    ballB.movement.velocity.x -= diameterDifference * Math.cos(deflectionAngle);
    ballB.movement.velocity.y -= diameterDifference * Math.sin(deflectionAngle);
  }


  
  module.exports = {
    resolveCollision,
  };



  
  
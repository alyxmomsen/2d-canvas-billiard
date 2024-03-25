interface Point {
  x: number;
  y: number;
}

export default class Ball {
  position: Point;
  velocity: Point;
  radius: number;
  color:string ;
  
  update () {
    this.position.x += this.velocity.x ;
    this.position.y += this.velocity.y ;
  }

  constructor({
    position,
    velocity,
    radius,
    color ,
  }: {
    position: Point;
    velocity: Point;
    radius: number;
    color:string ;
  }) {
    this.position = { ...position };
    this.velocity = { ...velocity };
    this.radius = radius;
    this.color = color ;
  }
}

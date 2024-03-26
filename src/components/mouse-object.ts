import { Point } from "./ball";

export default class MouseObject {

    position:Point ;
    prevPosition:Point ;
    radius:number ;

    constructor ({radius}:{radius:number}) {
        this.position = {x:Infinity , y:Infinity} ;
        this.prevPosition = {x:Infinity , y:Infinity} ;
        this.radius = radius ;
    }
}
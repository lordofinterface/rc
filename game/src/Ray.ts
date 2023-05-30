import {RayCaster} from "./RayCaster";
import {degreeToRadians} from "./utils";

export class Ray {
  x: f32;
  y: f32;
  cos: f32;
  sin: f32;

  constructor(x: f32, y: f32, angle: f32) {
    this.x = x;
    this.y = y;
    this.cos = f32(Math.cos(degreeToRadians(angle)) / RayCaster.precision);
    this.sin = f32(Math.sin(degreeToRadians(angle)) / RayCaster.precision);
  }
}

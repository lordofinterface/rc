import {degreeToRadians} from "./utils";
import {BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT, BUTTON_UP, GAMEPAD1} from "./wasm4";

export class Player {
  static fov: f32 = 60;
  static movement: f32 = 0.05;
  static rotation: f32 = 1.0;

  angle: f32 = 90;
  x: f32 = 2;
  y: f32 = 2;

  constructor() {};

  update(): void {
    const gamepad = load<u8>(GAMEPAD1);

    if (gamepad & BUTTON_UP) {
      const playerCos = Math.cos(degreeToRadians(this.angle)) * Player.movement;
      const playerSin = Math.sin(degreeToRadians(this.angle)) * Player.movement;
      this.x += f32(playerCos);
      this.y += f32(playerSin);
    } else if (gamepad & BUTTON_DOWN) {
      const playerCos = Math.cos(degreeToRadians(this.angle)) * Player.movement;
      const playerSin = Math.sin(degreeToRadians(this.angle)) * Player.movement;
      this.x -= f32(playerCos);
      this.y -= f32(playerSin);
    } else if (gamepad & BUTTON_LEFT) {
      this.angle -= Player.rotation;
    } else if (gamepad & BUTTON_RIGHT) {
      this.angle += Player.rotation;
    }
  }
}

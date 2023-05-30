import {MAP} from "./constants";
import {Player} from "./Player";
import {Ray} from "./Ray";
import {degreeToRadians} from "./utils";
import {DRAW_COLORS, line, SCREEN_SIZE, trace} from "./wasm4";

export class RayCaster {
  static precision: i32 = 64;
  private incrementAngle: f32;

  constructor(playerFov: f32) {
    this.incrementAngle = playerFov / f32(SCREEN_SIZE);
  }

  render(player: Player): void {
    let rayAngle = player.angle - Player.fov / 2;

    for (let rayCount: u32 = 0; rayCount < SCREEN_SIZE; rayCount++) {
      const ray = new Ray(player.x, player.y, rayAngle);

      let wall: i8 = 0;
      while (wall === 0) {
        ray.x += ray.cos;
        ray.y += ray.sin;
        wall = <i8>MAP[i32(Math.floor(ray.y))][i32(Math.floor(ray.x))];
      }

      let distance = Math.sqrt(Math.pow(player.x - ray.x, 2) + Math.pow(player.y - ray.y, 2));
      distance *= Math.cos(degreeToRadians(player.angle - rayAngle));
      const wallHeight = i32(Math.floor(SCREEN_SIZE / 2 / distance));

      store<u16>(DRAW_COLORS, 0x4);
      line(rayCount, 0, rayCount, SCREEN_SIZE - wallHeight);
      store<u16>(DRAW_COLORS, 0x3);
      line(rayCount, SCREEN_SIZE / 2 - wallHeight, rayCount, SCREEN_SIZE / 2 + wallHeight);
      store<u16>(DRAW_COLORS, 0x2);
      line(rayCount, SCREEN_SIZE / 2 + wallHeight, rayCount, SCREEN_SIZE);

      rayAngle += this.incrementAngle;
    }
  }
}

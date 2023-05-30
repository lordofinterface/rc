import {Player} from "./Player";
import {RayCaster} from "./RayCaster";
import * as w4 from './wasm4';

const player = new Player();
const rayCaster = new RayCaster(Player.fov);

export function update (): void {
  player.update();
  rayCaster.render(player);
}

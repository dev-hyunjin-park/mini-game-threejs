import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SWorld } from "./core/World";
import { Game } from "./scenes/game/Game";

export default function () {
  const game = new Game();

  const initialize = () => {
    game.play();
  };

  initialize();
}

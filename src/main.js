import { Load } from "./scenes/Load";
import { Menu } from "./scenes/Menu";
import { Options } from "./scenes/Options";
import { Level1 } from "./scenes/Level1";
import { Level2 } from "./scenes/Level2";
import { Level3 } from "./scenes/Level3";
import { Level4 } from "./scenes/Level4";
import { Credits } from "./scenes/Credits";


export const config = {
    width: 800,
    height: 600,
    scene: [
        Load, Menu, Options, Level1, Level2, Level3, Level4, Credits
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
        // gravity: { y: 500}
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};


export const gameState = {
    active: true,
    complete: false,
    player: {x: 400, y: 450},
    

  
    bullets: {},
    bulletTime: 0,

    enemyVelocity: 3,
  
    enemyBombs: {},
  
    level: 0,
    lives: 3,
    score: 0,


}

  export let game = new Phaser.Game(config);
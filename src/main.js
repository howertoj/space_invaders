import { Load } from "./scenes/Load";
import { Menu } from "./scenes/Menu";
import { Level1 } from "./scenes/Level1";
import { Level2 } from "./scenes/Level2";
import { Level3 } from "./scenes/Level3";
import { Credits } from "./scenes/Credits";


export const config = {
    width: 800,
    height: 600,
    scene: [
        Load, Menu, Level1, Level2, Level3, Credits
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};


export const gameState = {
    
    // cursors: 7
    
    // active: true,
  
    // player: {x: 225, y: 470},
    // platform: {},
  
    // bullets: {},
    // bulletTime: 0,
  
    // enemies: 7,
    // enemyVelocity: 1,
  
    // enemyBombs: {},
  
    // level: 0,
    // lives: 3,
    // score: 0,
  }

  let game = new Phaser.Game(config);
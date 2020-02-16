import { CST } from "../CST";
import { gameState } from "../main";
// import { config } from "../main";
import { Level } from "./Level"

import { game } from "../main"
export class Level1 extends Level {
    constructor() {
        super({
            key: CST.SCENES.LEVEL1
        })
        this.levelNumber = 1;
    }
    init() {

    }
    preload() {

    }
    create() {
        
        // level setup - platform, player, enemies
        // this.createBackground(0x110022)
        this.add.image(0, 0, 'sanfrancisco').setOrigin(0, 0);
        this.createAnimations();
        this.createPlatform();
        this.setScoreboardBackground();
        this.createPlayer();
        this.createBullets();
        
        this.createEnemies();
        this.startBombing();
        this.createColliders();
        this.createControls();
        gameState.active = true;



        

        // this.add.sprite(400, 100, 'ufogreen')

        // for testing: button to cycle through levels
        // this.add.text(100, 100, "Level1", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5)
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.stop(CST.SCENES.LEVEL1);
            this.scene.start(CST.SCENES.LEVEL2);
        })
        last.on('pointerup', () => {
            this.scene.stop(CST.SCENES.LEVEL1);
            this.scene.start(CST.SCENES.MENU);
        })

        
    }

    update(time) {
        if (this.enemiesCount() === 0) {
            gameState.active = false;
            this.scene.start(CST.SCENES.LEVEL2);
        }
        if (gameState.active) {
            this.playerMove();
            this.playerShoot(time);
            this.setScoreboard();
            this.enemiesMove();
        }
    }



    

}
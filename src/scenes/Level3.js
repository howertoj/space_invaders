import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
import { Level } from "./Level"
export class Level3 extends Level {
    constructor() {
        super({
            key: CST.SCENES.LEVEL3
        })
        this.levelNumber = 3;
    }
    init() {

    }
    preload() {

    }
    create() {
        // level setup - platform, player, enemies
        this.createBackground(0x110022)
        this.createPlatform();
        this.createPlayer();
        this.createBullets();
        this.createEnemies();
        // this.startBombing();
        this.createColliders();
        this.createControls();
        gameState.active = true;
        

        // for testing: button to cycle through levels
        this.add.text(100, 100, "Level3", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5)
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.start(CST.SCENES.CREDITS);
        })
        last.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL2);
        })
    }

    update(time) {
        if (this.enemiesCount() === 0) {
            gameState.active = false;
            this.scene.start(CST.SCENES.LEVEL3);
        }
        if (gameState.active) {
            this.playerMove();
            this.playerShoot(time);
            this.setScoreboard();
            // this.enemiesMove();
        }
    }
}
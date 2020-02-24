import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
import { Level } from "./Level"
export class Level2 extends Level {
    constructor() {
        super({
            key: CST.SCENES.LEVEL2
        })
        this.levelNumber = 2;
    }
    init() {

    }
    preload() {

    }
    create() {
        // level setup - platform, player, enemies
        this.add.image(0, 0, 'moon').setOrigin(0, 0);
        this.createAnimations();
        this.createPlatform();
        this.setScoreboardBackground();
        this.createPlayer();
        this.createBullets();
        
        this.createEnemies();
        this.createEnemyBombs();
        this.startBombing();
        this.createColliders();
        this.createControls();
        gameState.active = true;
        

    // for testing: button to cycle through levels
    // this.add.text(100, 100, "Level2", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
    let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
    let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
    next.on('pointerup', () => {
        this.scene.stop(CST.SCENES.LEVEL2)
        this.scene.start(CST.SCENES.LEVEL3);
    })
    last.on('pointerup', () => {
        this.scene.stop(CST.SCENES.LEVEL2)
        this.scene.start(CST.SCENES.LEVEL1);
    })


    }

    update(time) {
        this.playerCheck();
        if (this.enemiesCount() === 0) {
            gameState.active = false;
            this.scene.start(CST.SCENES.LEVEL3);
        }
        if (gameState.active) {
            this.playerMove();
            this.playerShoot(time);
            this.setScoreboard();
            this.enemiesMove();
        }
    }
}
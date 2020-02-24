import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
import { Level } from "./Level"
export class Level4 extends Level {
    constructor() {
        super({
            key: CST.SCENES.LEVEL4
        })
        this.levelNumber = 4;
    }
    init() {

    }
    preload() {

    }
    create() {
        // level setup - platform, player, enemies
        this.add.image(0, 0, 'wormhole').setOrigin(0, 0);
        this.createAnimations();
        this.createPlatform();
        this.setScoreboardBackground();
        this.createPlayer();
        this.createBullets();

        this.createBoss();
        this.createEnemyBombs();
        this.createBossColliders();
        this.startBossBombing();
        this.createControls();
        gameState.active = true;
        

        // for testing: button to cycle through levels
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.start(CST.SCENES.CREDITS);
        })
        last.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL3);
        })
    }

    update(time) {
        this.playerCheck();

        


        if (gameState.bosses.getChildren().length === 0) {
            gameState.active = false;
            // this.scene.start(CST.SCENES.CREDITS);

            if(gameState.complete != true) {
                this.victory();
                gameState.complete = true;
            }
            
            

        }




        if (gameState.active) {
            this.playerMove();
            this.playerShoot(time);
            this.setScoreboard();
            // this.enemiesMove();
            this.bossMove();
        }
    }
}
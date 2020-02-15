import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
export class Level3 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL3
        })
    }
    init() {

    }
    preload() {

    }
    create() {
        // create background and scene label in top left
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0);
        this.add.text(100, 100, "Level3", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        // for testing: button to cycle through levels
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.start(CST.SCENES.CREDITS);
        })
        last.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL2);
        })
    }
}
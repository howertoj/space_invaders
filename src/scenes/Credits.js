import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
export class Credits extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.CREDITS
        })
    }
    init() {

    }
    preload() {

    }
    create() {
        // let newGame = this.add.text(400, 300, "New Game", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        // create background and scene label in top left
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0);
        this.add.text(100, 100, "CREDITS", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        // for testing: button to cycle through levels
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU);
        })
        last.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL3);
        })

        // for testing: button to cycle through levels
        let back = this.add.text(700, 500, "Return to Menu", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        back.on('pointerover', () => {
            console.log("OVER - back")
        })

        back.on('pointerout', () => {
            console.log("OUT - back")
        })

        back.on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU);
        })
    }
}
import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
// import { leftSprite } from "../Menu"

export class Options extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.OPTIONS
        })
    }

    create() {

        // create black background, title text
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0);
        this.add.text(400, 150, "OPTIONS MENU", { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5)

        // create hovering sprites and set to invisible
        let leftSprite = this.add.sprite(100, 100, "orange-square").setVisible(false);
        

        let back = this.add.text(400, 450, "Return to Menu", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        back.on('pointerover', () => {
            console.log("OVER - back")
            leftSprite.setVisible(true).setX(back.x - 100).setY(back.y);
        })

        back.on('pointerout', () => {
            console.log("OUT - back")
            leftSprite.setVisible(false);
        })

        back.on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU);
        })
        

    }

}
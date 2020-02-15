import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";
export class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {

    }   
    preload() {

        
    }

    create() {

        // create black background, title text
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0);
        this.add.text(400, 150, "SPACE INVADERS", { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5)

        // add buttons for new game / options
        let newGame = this.add.text(400, 300, "New Game", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let options = this.add.text(400, 450, "Options", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        // let newGame = this.add.rectangle(newGameText.x, newGameText.y, 300, 100).fill("0xffffff")
        // let options = this.add.rectangle()

        // create hovering sprites and set to invisible
        let leftSprite = this.add.sprite(100, 100, "orange-square").setVisible(false);
        // let rightSprite = this.add.sprite(100, 100, "orange-square").setVisible(false);


        

        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        newGame.on('pointerover', () => {
            console.log("OVER - newgame")
            leftSprite.setVisible(true).setX(newGame.x - 100).setY(newGame.y);
        })

        newGame.on('pointerout', () => {
            console.log("OUT - newgame")
            leftSprite.setVisible(false);
        })

        newGame.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL1);
        })

        options.on('pointerover', () => {
            console.log("OVER - options")
            leftSprite.setVisible(true).setX(options.x - 100).setY(options.y);
        })

        options.on('pointerout', () => {
            console.log("OUT - options")
            leftSprite.setVisible(false);
        })

        options.on('pointerup', () => {
            this.scene.start(CST.SCENES.OPTIONS);
        })




    }
}
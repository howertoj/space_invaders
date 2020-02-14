import { CST } from "../CST";

export class OptionScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.OPTION
        })
    }

    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0,0).setDepth(0);
        this.add.text(0,0, "Options Menu")

        let hoverSprite = this.add.sprite(100, 100, "cat");
        hoverSprite.setVisible(false);
        hoverSprite.setScale(2);

        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("cat", {
                frames: [0,1,2,3]
            })
        });


        let mainMenuButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 100, "main_menu_button").setScale(0.5).setDepth(1)
        
        
        mainMenuButton.setInteractive();

        mainMenuButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = mainMenuButton.x - 100;
            hoverSprite.y = mainMenuButton.y;
        })
        mainMenuButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
        })
        mainMenuButton.on("pointerup", ()=>{
            console.log("Option Open the gate")
            this.scene.start(CST.SCENES.MENU);
        })
    }

}
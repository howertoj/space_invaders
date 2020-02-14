import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data) {
        console.log(data);
        console.log("MESSAGE RECEIVED");
    }

    create() {
        
        // create background, logo, and play/option buttons
        this.stage.backgroundColor = "0xffffff"
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
        let optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 100, "options_button").setDepth(1).setInteractive();
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "play_button").setDepth(1).setInteractive();

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

        // this.sound.play("title_music", {
        //     loop: true
        // })


        playButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - 100;
            hoverSprite.y = playButton.y;
        })
        playButton.on("pointerout", ()=>{
            console.log("Pointer Out")
            hoverSprite.setVisible(false);
        })
        playButton.on("pointerup", ()=>{
            console.log("Open the gate")
            this.scene.start(CST.SCENES.LEVEL1)
        })

        optionButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionButton.x - 100;
            hoverSprite.y = optionButton.y;
        })
        optionButton.on("pointerout", ()=>{
            // console.log("Option Pointer Out")
            hoverSprite.setVisible(false);
        })
        optionButton.on("pointerup", ()=>{
            console.log("Option Open the gate")
            this.scene.start(CST.SCENES.OPTION);
        })

    }
}
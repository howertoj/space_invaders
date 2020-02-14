import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }

    preload() {




        // create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        /*
        Loader Events:
            complete - when everything is loaded
            progress - loader number progress in decimal
        */

        // simulate large load
        for(let i = 0; i < 500; i++) {
            this.load.image('logo' + i, './assets/image/logo.png')
        }


        
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on("complete", ()=>{
            console.log("LOADING COMPLETE")
        })

    }

    create() {
        this.scene.start(CST.SCENES.MENU, "LoadScene --> MenuScene");
    }
}
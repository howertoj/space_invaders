import { CST } from "../CST";
export class Load extends Phaser.Scene {
    
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {

    }
    preload() {
        // preload files here

        // test files
        this.load.image('orange-square', 'assets/art/orange-square.png');
        this.load.image('yellow-square', 'assets/art/yellow-square.png');
        this.load.image('green-square', 'assets/art/green-square.png');
        this.load.image('gray-square', 'assets/art/gray-square.png');
        this.load.image('red-square', 'assets/art/red-square.png');
        this.load.image('gray-square', 'gray-square.png');
        this.load.image('gray-platform', 'assets/art/gray-platform.png');
        this.load.image('moon', 'assets/art/moon.png');
        this.load.image('sanfrancisco', 'assets/art/sanfrancisco.png');
        this.load.image('tokyo', 'assets/art/tokyo.png');
        this.load.image('wormhole', 'assets/art/wormhole.png');
        this.load.image('nebula', 'assets/art/nebula.png');
        // this.load.spriteSheet('ufogreen', 'assets/art/ufogreen.png', 512, 160, 8);

        this.load.spritesheet('ufogreen', 'assets/art/ufogreen.png', { frameWidth: 512, frameHeight: 160 });

        


        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        /*
        for(let i = 0; i < 100; i++){
            this.load.spritesheet("cat" + i, "./assets/cat.png", {
                frameHeight: 32,
                frameWidth: 32
            });        
        }*/

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })


    }
    create() {
        this.scene.start(CST.SCENES.MENU);
    }
}
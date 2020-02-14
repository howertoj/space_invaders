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

    }

}
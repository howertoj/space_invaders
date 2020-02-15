import { CST } from "../CST";
import { gameState } from "../main";
import { config } from "../main";


export class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL1
        })
        this.levelNumber = 1;
    }
    init() {

    }
    preload() {

    }

    create() {
        // create background and scene label in top left
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0).setDepth(0);
        this.add.text(100, 100, "Level1", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        // for testing: button to cycle through levels
        let next = this.add.text(700, 550, "NEXT LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        let last = this.add.text(100, 550, "PREV LEVEL", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        next.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL2);
        })
        last.on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU);
        })


        // level setup - platform, player, enemies
        this.createPlatform();
        this.createPlayer();
        this.createEnemies();
        this.createColliders();
        this.setControls();
        this.createInstructions();
        this.createScoreboard();

        gameState.active = true;
        
    }

    update(updateTime) {

        gameState.speak();
        if (this.enemiesCount() === 0) {
            gameState.active = false;
            // this.scene.stop();
            this.scene.start(CST.SCENES.LEVEL2);
        }

        if (gameState.active) {
            this.playerMove();
            this.playerShoot(updateTime);
            this.updateScoreboard();
            // this.enemiesMove()
        }

    }

    // level setup

    //create scoreboard
    createScoreboard() {
        gameState.levelText = this.add.text(400, 510, `Level: ${this.levelNumber}`, { fontSize: '20px', fill: '#ffffff' });
        gameState.enemiesText = this.add.text(400, 530, "Enemies: 0", { fontSize: '20px', fill: '#ffffff' });
        gameState.livesText = this.add.text(400, 550, "Lives: 0", { fontSize: '20px', fill: '#ffffff' });
    }

    //Update scoreboard
    updateScoreboard() {
        // gameState.levelText.setText(`Level: ${this.levelNumber}`);
        gameState.enemiesText.setText(`Enemies: ${this.enemiesCount()}`);
        gameState.livesText.setText(`Lives: ${gameState.lives}`);
    }

    //List controls
    createInstructions() {
        const controls1 = this.add.text(200, 510, "Controls:", { fontSize: '20px', fill: '#ffffff' });
        const controls2 = this.add.text(200, 530, "- Move: arrows", { fontSize: '20px', fill: '#ffffff' });
        const controls3 = this.add.text(200, 550, "- Fire: space", { fontSize: '20px', fill: '#ffffff' });
    }




    createPlatform() {
        gameState.platform = this.physics.add.staticGroup().create(400, 490, 'gray-platform');
    }

    createPlayer() {
        gameState.player = this.physics.add.sprite(gameState.player.x, gameState.player.y, "orange-square").setCollideWorldBounds(true);
        gameState.bullets = this.physics.add.group();
    }

    playerMove() {
        // if (gameState.active) {
            if (gameState.cursors.left.isDown) {
              gameState.player.setVelocityX(-500);
            } else if (gameState.cursors.right.isDown) {
              gameState.player.setVelocityX(500);
            } else {
              gameState.player.setVelocityX(0);
            }
        // }
    }

    playerShoot(time) {
        // if (gameState.active) {
            if (gameState.cursors.space.isDown) {
              if (time > gameState.bulletTime) {
                gameState.bullets.create(gameState.player.x, gameState.player.y - 20, 'yellow-square').setVelocityY(-600);
                gameState.bulletTime = time + 150;
              }
            }
        // }
        // console.log("SHOOT")
    }

    createEnemies() {
        gameState.enemies = this.physics.add.group()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 13; j++) {
              gameState.enemies.create(100 + 50 * j, 50 + 50 * i, 'red-square')
            }
        }
        this.startBombing();
    }

    enemiesMove() {
        gameState.enemies.getChildren().forEach(enemy => enemy.x += gameState.enemyVelocity)
        if (this.enemiesSortByX()[0].x < 10 || this.enemiesSortByX()[this.enemiesCount()-1].x > 790) {
        // enemy velocity increases 5% on each turn
        gameState.enemyVelocity *= -1.05;
        gameState.enemies.getChildren().forEach(enemy => enemy.y += 20);
        } 
    }
    
    //Returns count of remaining enemies
    enemiesCount() {
        return gameState.enemies.getChildren().length;
        console.log("enemy count")
    }
    
    //Sort enemies by their x-coordinate 
    enemiesSortByX() {
    return gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    }

    // Returns an array of the lowest flying enemy in each column (can drop bombs without hitting others)
    getLowEnemies() {
        let sorted = this.enemiesSortByX();
        let low = [];
        for (let i = 0; i < this.enemiesCount() - 1; i++) {
        if (sorted[i].x < sorted[i+1].x) low.push(sorted[i]);
        }
        low.push(sorted[sorted.length-1]);
        return low;
    }

    // Select all of the low-flying enemies and randomly drop bombs
    enemyFire() {
        this.getLowEnemies().forEach(function(enemy) {
            if(Math.random() > 0.8) gameState.enemyBombs.create(enemy.x, enemy.y + 20, 'gray-square').setGravityY(200);
        })
    }

    startBombing() {
        gameState.enemyBombs = this.physics.add.group();
        gameState.enemyBombLoop = this.time.addEvent({
          delay: 600,
          callback: this.enemyFire,
          callbackScope: this,
          loop: true,
        });
      }
    

    createColliders() {
        this.physics.add.collider(gameState.player, gameState.platform);
    
        gameState.bulletsEnemiesCollider = this.physics.add.collider(gameState.bullets, gameState.enemies, (bullet, enemy) => {
          bullet.destroy();
          enemy.destroy();
        });
        this.physics.add.collider(gameState.platform, gameState.enemyBombs, (platform, bomb) => {
          bomb.destroy();
        });
    
        gameState.playerBombCollider = this.physics.add.collider(gameState.player, gameState.enemyBombs, (player, bomb) => {
          
          gameState.lives --;
          if (gameState.lives > 0) {
            gameState.enemyBombs.getChildren().forEach(bomb => bomb.destroy());
          } else {
            this.gameOver();
          }
        });
    }

    setControls() {
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }

    gameOver() {
        console.log("GAME OVER")
        gameState.active = false;
        gameState.bullets.destroy();
        gameState.enemyBombLoop.destroy();
        gameState.playerBombCollider.destroy();
        gameState.bulletsEnemiesCollider.destroy();
        this.add.text(400, 250, "GAME OVER", { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5)
        let back = this.add.text(400, 350, "Return to Menu", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        back.on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU)
        })
    }

}
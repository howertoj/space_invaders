import { gameState } from "../main";
import { config } from "../main";
import { CST } from "../CST";

export class Level extends Phaser.Scene{
    constructor(key) {
        super(key)
    }

    playerShoot(time) {
        if (gameState.cursors.space.isDown) {
            if (time > gameState.bulletTime) {
                let newRocket = gameState.bullets.create(gameState.player.x, gameState.player.y - 20, 'rocket').setScale(.3);
                newRocket.setGravityY(-500);
                newRocket.setVelocityY(-250);
                newRocket.anims.play('rocketFlight', true)
                gameState.bulletTime = time + 250;
            }
        }
    }

    // Select all of the low-flying enemies and randomly drop bombs
    enemyFire() {
        this.getLowEnemies().forEach(function(enemy) {
            if(Math.random() > 0.7) {
                let newBomb = gameState.enemyBombs.create(enemy.x, enemy.y + 20, 'alienblast').setAngle(90)
                // newBomb.setVelocityY(0);
                newBomb.setGravityY(500)
                newBomb.setScale(0.3);
                newBomb.anims.play('laserBlast', true)


            }
            
        })
    }

    dropBomb(xCoord, yCoord) {
        let newBomb = gameState.enemyBombs.create(xCoord, yCoord, 'alienblast').setAngle(90);
        newBomb.setGravityY(500)
        newBomb.setScale(0.3);
        newBomb.anims.play('laserBlast', true)
    }

    bossFire() {
        if(Math.random() > 0.5) {
            console.log("BOSS FIRE")
            let boss = gameState.bosses.getChildren()[0];

            for (let i = 0; i < 3; i++) {
                this.dropBomb(boss.x + i * 10, boss.y)
            }

            



        }
        

        
        

        // this.getLowEnemies().forEach(function(enemy) {
        //     if(Math.random() > 0.7) {
        //         let newBomb = gameState.enemyBombs.create(enemy.x, enemy.y + 20, 'alienblast').setAngle(90)
        //         // newBomb.setVelocityY(0);
        //         newBomb.setGravityY(500)
        //         newBomb.setScale(0.3);
        //         newBomb.anims.play('laserBlast', true)


        //     }
    }

    
    playerMove() {
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-500);
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(500);
            } else {
                gameState.player.setVelocityX(0);
            }
    }
    
    enemiesCount() {
        return gameState.enemies.getChildren().length;
        console.log("enemy count")
    }

    bossesCount() {
        return gameState.bosses.getChildren().length;
        console.log("boss count")
    }
    
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
    
    
    
    enemiesMove() {
        gameState.enemies.getChildren().forEach(enemy => enemy.x += gameState.enemyVelocity)
        if (this.enemiesSortByX()[0].x < 10 || this.enemiesSortByX()[this.enemiesCount()-1].x > 790) {
        // enemy velocity increases 5% on each turn
        gameState.enemyVelocity *= -1.05;
        gameState.enemies.getChildren().forEach(enemy => enemy.y += 20);
        } 
    }

    bossMove() {
        gameState.bosses.getChildren().forEach(boss => boss.x += gameState.bossVelocity)

        if (gameState.bosses.getChildren()[0].x < 10 || gameState.bosses.getChildren()[0].x > 790) {
            gameState.bossVelocity *= -1.05;
        } 
    }

    startBossBombing() {
        gameState.enemyBombLoop = this.time.addEvent({
          delay: 600,
          callback: this.bossFire,
          callbackScope: this,
          loop: true,
        });
    }
    



    startBombing() {
        gameState.enemyBombLoop = this.time.addEvent({
          delay: 600,
          callback: this.enemyFire,
          callbackScope: this,
          loop: true,
        });
    }

    setScoreboardBackground() {
        this.add.rectangle(0, gameState.platform.y -10, config.width, config.height - gameState.platform.y + 10, "0x000000").setOrigin(0, 0).setDepth(0);
    }

    //Update scoreboard
    setScoreboard() {
        if (!this.levelText) this.levelText = this.add.text(400, 510, `Level: ${this.levelNumber}`, { fontSize: '20px', fill: '#ffffff' });
        
        if (!this.livesText) this.livesText = this.add.text(400, 550, `Lives: ${gameState.lives}`, { fontSize: '20px', fill: '#ffffff' });
        
        if (this.levelNumber != 4) {
            if (!this.enemiesText) this.enemiesText = this.add.text(400, 530, `Enemies: ${this.enemiesCount()}`, { fontSize: '20px', fill: '#ffffff' });
            this.enemiesText.setText(`Enemies: ${this.enemiesCount()}`);
        } else {
            if (!this.bossText) this.bossText = this.add.text(400, 530, `Boss HP: ${gameState.bossHealth}`, { fontSize: '20px', fill: '#ffffff' });
            this.bossText.setText(`Boss HP: ${gameState.bossHealth}`)
        }

        // if (gameState.enemies) {
        //     console.log("WE GOT ENEMIES")
        // }

        // console.log(gameState.enemies)
        
        

        this.levelText.setText(`Level: ${this.levelNumber}`);
        this.livesText.setText(`Lives: ${gameState.lives}`);
    }

    createPlatform() {
        gameState.platform = this.physics.add.staticGroup().create(400, 500, 'gray-platform').setVisible(true);
    }

    createPlayer() {
        gameState.player = this.physics.add.sprite(gameState.player.x, gameState.player.y, "moonlander");
        gameState.player.setCollideWorldBounds(true);
        gameState.player.setScale(.5)
        gameState.player.anims.play('landerAnim', true)
    }

    createBullets() {
        gameState.bullets = this.physics.add.group();



    }

    createEnemies() {
        gameState.enemyVelocity = 3;
        gameState.enemies = this.physics.add.group();
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
              gameState.enemies.create(125 + 120 * j, 50 * i, 'ufo-green').setScale(0.25)
            }
        }
        gameState.enemies.getChildren().forEach(function(each) {
            each.anims.play('ufoLights', true);
        })
    }

    createBoss() {
        gameState.bossVelocity = 5;
        gameState.bosses = this.physics.add.group();
        gameState.bossHealth = 10;
        gameState.bosses.create(400, 100, 'ufo-green').setBounce(0);
    }

    createEnemyBombs() {
        gameState.enemyBombs = this.physics.add.group();
    }



    createColliders() {
        this.physics.add.collider(gameState.platform, gameState.player);
    
        gameState.bulletsEnemiesCollider = this.physics.add.collider(gameState.bullets, gameState.enemies, (bullet, enemy) => {
            bullet.destroy();
            enemy.destroy();

            let newExplosion = this.add.sprite(enemy.x, enemy.y, 'explosion1');
            newExplosion.anims.play('explosion1anim', true)

        });
        this.physics.add.collider(gameState.platform, gameState.enemyBombs, (platform, bomb) => {
          bomb.destroy();
        });
    
        gameState.playerBombCollider = this.physics.add.collider(gameState.player, gameState.enemyBombs, (player, bomb) => {
          
            let newExplosion = this.add.sprite(player.x, player.y, 'explosion1');
            newExplosion.anims.play('explosion1anim', true)

          gameState.lives --;
          if (gameState.lives > 0) {
            gameState.enemyBombs.getChildren().forEach(bomb => bomb.destroy());
          } else {
            this.gameOver();
          }
        });
    }


    destroyBoss() {
        let boss = gameState.bosses.getChildren()[0];
        this.time.addEvent({
            delay: 400,
            callback: ()=>{
                let newExplosion = this.add.sprite(boss.x, boss.y, 'explosion1').setScale(1);
                newExplosion.anims.play('explosion1anim', true);
            },
            loop: false,
            repeat: 4      
        })

        gameState.bossVelocity = 0;
        
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                let newExplosion = this.add.sprite(boss.x, boss.y, 'explosion1').setScale(4);
                newExplosion.anims.play('explosion1anim', true);
                boss.destroy();
                gameState.enemyBombLoop.destroy();
            },
            loop: false,
            repeat: 0,
            onComplete: console.log(7)          
        })

        
        
    }

    createBossColliders() {
        this.physics.add.collider(gameState.platform, gameState.player);

        gameState.bulletsBossesCollider = this.physics.add.collider(gameState.bullets, gameState.bosses, (bullet, boss) => {
            boss.setVelocityY(0);
            let newExplosion = this.add.sprite(bullet.x, bullet.y - 50, 'explosion1');
            newExplosion.anims.play('explosion1anim', true);
            bullet.destroy();
            gameState.bossHealth --;
            if (gameState.bossHealth == 0) {
                this.destroyBoss();
            }
        });

        this.physics.add.collider(gameState.platform, gameState.enemyBombs, (platform, bomb) => {
          bomb.destroy();
        });
    
        gameState.playerBombCollider = this.physics.add.collider(gameState.player, gameState.enemyBombs, (player, bomb) => {
          
            let newExplosion = this.add.sprite(player.x, player.y, 'explosion1');
            newExplosion.anims.play('explosion1anim', true)

          gameState.lives --;
          if (gameState.lives > 0) {
            gameState.enemyBombs.getChildren().forEach(bomb => bomb.destroy());
          } else {
            this.gameOver();
          }
        });
    }

    playerCheck(){
        if(gameState.player.y > gameState.platform.y) {
            gameState.player.y -= 200;
        }
    }

    createAnimations() {

        this.anims.create({
            key: 'explosion1anim',
            frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 4 }),
            frameRate: 16,
            duration: 24,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'ufoLights',
            frames: this.anims.generateFrameNumbers('ufo-green', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ufoLights',
            frames: this.anims.generateFrameNumbers('ufo-green', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'laserBlast',
            frames: this.anims.generateFrameNumbers('alienblast', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'landerAnim',
            frames: this.anims.generateFrameNumbers('moonlander', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'rocketFlight',
            frames: this.anims.generateFrameNumbers('rocket', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

    }

    createControls() {
        gameState.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(200, 510, "Controls:", { fontSize: '20px', fill: '#ffffff' });
        this.add.text(200, 530, "- Move: arrows", { fontSize: '20px', fill: '#ffffff' });
        this.add.text(200, 550, "- Fire: space", { fontSize: '20px', fill: '#ffffff' });

        console.log("create controls!")
    }

    createBackground(color) {
        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, color).setOrigin(0, 0).setDepth(0);
    }

    gameOver() {
        this.playerCheck();
        console.log("GAME OVER")
        this.setScoreboard();
        gameState.active = false;
        gameState.player.setVelocityX(0);
        gameState.bullets.destroy();
        gameState.enemyBombLoop.destroy();
        gameState.playerBombCollider.destroy();
        gameState.bulletsEnemiesCollider.destroy();
        this.add.text(400, 250, "GAME OVER", { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5)
        let back = this.add.text(400, 350, "To Credits", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        back.on('pointerup', () => {
            // this.scene.stop(CST.SCENES.LEVEL1);
            this.scene.start(CST.SCENES.CREDITS);
        })
    }

    victory() {
        this.playerCheck();
        this.setScoreboard();
        gameState.player.setVelocityX(0);
        this.add.text(400, 250, "VICTORY", { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5)
        let credits = this.add.text(400, 350, "To Credits", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        credits.on('pointerup', () => {
            this.scene.start(CST.SCENES.CREDITS);
        })
    }



}
class Level extends Phaser.Scene {
  constructor(key) {
    super({key});
    this.levelKey = key
    this.nextLevel = {
      'Level1': 'Level2',
      'Level2': 'Level3',
      'Level3': 'Credits',
    }
  }

  preload() {
    this.load.image('orange-square', 'assets/art/orange-square.png');
    this.load.image('yellow-square', 'assets/art/yellow-square.png');
    this.load.image('green-square', 'assets/art/green-square.png');
    this.load.image('gray-square', 'assets/art/gray-square.png');
    this.load.image('red-square', 'assets/art/red-square.png');
    this.load.spritesheet('ufo-green', 'assets/art/ufogreen.png', { frameWidth: 280, frameHeight: 160});


    this.load.image('gray-platform', 'assets/art/gray-platform.png');
  }

  create() {
    gameState.active = true;

    this.createScoreboard();
    this.listControls();

    this.createEnemies(this.enemyType);
    this.createPlayer();
    this.createPlatform();
    this.createColliders();

    // Create cursor objects to be used in the update
    gameState.cursors = this.input.keyboard.createCursorKeys();


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
        gameState.enemyBombs.getChildren().forEach(bomb => bomb.destroy());
      } else {
        this.gameOver();
      }
      
    });
  }

  createPlatform() {
    gameState.platform = this.physics.add.staticGroup().create(225, 490, 'gray-platform');

  }

  createPlayer() {
    gameState.player = this.physics.add.sprite(gameState.player.x, gameState.player.y, 'green-square').setCollideWorldBounds(true);
    gameState.bullets = this.physics.add.group();
  }


  createEnemies(enemyType) {
    gameState.enemies = this.physics.add.group();
    
    // SPAWN 24 ENEMIES
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        gameState.enemies.create(50 + 50 * j, 50 + 50 * i, enemyType).setGravityY(0);
      }
    }

    // FOR TESTING TRANSITIONS: spawns 1 enemy
    // gameState.enemies.create(100, 100, 'orange-square').setGravityY(0);
    
    this.startBombing();
  }





  enemyFire = () => {  
    let selected = Phaser.Utils.Array.GetRandom(this.lowFlyers())
    gameState.enemyBombs.create(selected.x, selected.y + 20, 'gray-square').setGravityY(200)
  }


  // Lower flying enemies will periodically drop bombs
  startBombing() {
    gameState.enemyBombs = this.physics.add.group();
    gameState.enemyBombLoop = this.time.addEvent({
      delay: 600,
      callback: this.enemyFire,
      callbackScope: this,
      loop: true,
    });
  }

  enemyMove() {
    gameState.enemies.getChildren().forEach(enemy => enemy.x += gameState.enemyVelocity)
    if (this.enemiesSortByX()[0].x < 10 || this.enemiesSortByX()[this.enemiesCount()-1].x > 440) {
      
      // enemy velocity increases 3% on each turn
      gameState.enemyVelocity *= -1.03;
      gameState.enemies.getChildren().forEach(enemy => enemy.y += 20);
    } 
  }

  //Returns count of remaining enemies
  enemiesCount() {
    return gameState.enemies.getChildren().length;
  }

  //Sort enemies by their x-coordinate 
  enemiesSortByX() {
    return gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
  }

  // Returns an array of the lowest flying enemy in each column (can drop bombs without hitting others)
  lowFlyers() {
    let sorted = this.enemiesSortByX();
    let low = [];
    for (let i = 0; i < this.enemiesCount() - 1; i++) {
      if (sorted[i].x < sorted[i+1].x) low.push(sorted[i]);
    }
    low.push(sorted[sorted.length-1]);
    return low;
  }

  //Create scoreboard
  createScoreboard() {
    gameState.levelText = this.add.text(10, 510, "Level: 0", { fontSize: '15px', fill: '#ffffff' });
    gameState.enemiesText = this.add.text(10, 530, "Enemies: 0", { fontSize: '15px', fill: '#ffffff' });
    gameState.livesText = this.add.text(10, 550, "Lives: 0", { fontSize: '15px', fill: '#ffffff' });
  }

  //Update scoreboard
  updateScoreboard() {
    gameState.levelText.setText(`Level: ${this.levelNumber}`);
    gameState.enemiesText.setText(`Enemies: ${this.enemiesCount()}`);
    gameState.livesText.setText(`Lives: ${gameState.lives}`);
  }

  listControls() {
    const controls1 = this.add.text(10, 590, "Controls:", { fontSize: '15px', fill: '#ffffff' });
    const controls2 = this.add.text(10, 610, "- Move: arrow keys", { fontSize: '15px', fill: '#ffffff' });
    const controls3 = this.add.text(10, 630, "- Fire: spacebar", { fontSize: '15px', fill: '#ffffff' });
  }

  gameOver() {
    console.log("GAME OVER")
    gameState.active = false;

    gameState.bullets.destroy();

    gameState.enemyBombLoop.destroy();
    gameState.playerBombCollider.destroy();
    gameState.bulletsEnemiesCollider.destroy();
    this.add.text(225, 200, "GAME OVER", { fontSize: '15px', fill: '#ffffff' })
  }

  update(time){

    this.updateScoreboard();

      //If all enemies are eliminated, turns off the bombing loop
    if (this.enemiesCount() === 0) {
      gameState.active = false;
      this.scene.stop(this.levelKey);
      this.scene.start(this.nextLevel[this.levelKey]);
    }


    if (gameState.active) {
      if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-350);
      } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(350);
      } else {
        gameState.player.setVelocityX(0);
      }

      if (gameState.cursors.space.isDown) {
        if (time > gameState.bulletTime) {
          gameState.bullets.create(gameState.player.x, gameState.player.y - 20, 'yellow-square').setVelocityY(-400);
          gameState.bulletTime = time + 200;
        }
      }
    }
    
    if (gameState.active) {
      this.enemyMove();
    }

  }
}



class StartMenu extends Phaser.Scene {
  constructor() {
    super('StartMenu');
  }

  preload() {

  }

  create() {
    gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0, 0);

    this.add.text(225, 220, "SPACE INVADERS", { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5)

    this.add.text(225, 340, "Press space to start", { fontSize: '15px', fill: '#ffffff' }).setOrigin(0.5)

    gameState.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (gameState.cursors.space.isDown) {
      this.scene.stop(this.levelKey);
      this.scene.start('Level1');
    }
  }
}

class Credits extends Phaser.Scene {
  constructor() {
    super('Credits');
  }
  preload() {

  }
  create() {
    gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0, 0);
    this.add.text(200, 200, "CREDITS", { fontSize: '15px', fill: '#ffffff' })
    // this.add.text(200, 220, "PRESS SPACEBAR TO CONTINUE", { fontSize: '15px', fill: '#ffffff' })

    gameState.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (gameState.cursors.space.isDown) {
      this.scene.stop(this.levelKey);
      this.scene.start('Start');
    }
  }
}

class Level1 extends Level {
  constructor() {
    super('Level1')
    this.levelNumber = 1;
    this.enemyType = 'orange-square';
    // this.enemyType = 'ufo-green'
  }
}

class Level2 extends Level {
  constructor() {
    super('Level2')
    this.levelNumber = 2;
    this.enemyType = 'red-square';
  }
}

class Level3 extends Level {
  constructor() {
    super('Level3')
    this.levelNumber = 3;
    this.enemyType = 'yellow-square';
  }
}

const gameState = {
  active: true,

  player: {x: 225, y: 470},
  platform: {},

  bullets: {},
  bulletTime: 0,

  enemies: 7,
  enemyVelocity: 1,

  enemyBombs: {},

  level: 0,
  lives: 3,
  score: 0,
}


const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 660,
  backgroundColor: "0x000000",
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
    }
  },
  scene: [StartMenu, Level1, Level2, Level3, Credits]
};

const game = new Phaser.Game(config);
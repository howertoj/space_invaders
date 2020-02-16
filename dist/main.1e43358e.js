// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    OPTIONS: "OPTIONS",
    LEVEL1: "LEVEL1",
    LEVEL2: "LEVEL2",
    LEVEL3: "LEVEL3",
    CREDITS: "CREDITS"
  }
};
exports.CST = CST;
},{}],"src/scenes/Load.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Load = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Load =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Load, _Phaser$Scene);

  function Load() {
    _classCallCheck(this, Load);

    return _possibleConstructorReturn(this, _getPrototypeOf(Load).call(this, {
      key: _CST.CST.SCENES.LOAD
    }));
  }

  _createClass(Load, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

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
      this.load.image('nebula', 'assets/art/nebula.png'); // this.load.spriteSheet('ufogreen', 'assets/art/ufogreen.png', 512, 160, 8);

      this.load.spritesheet('ufogreen', 'assets/art/ufogreen.png', {
        frameWidth: 512,
        frameHeight: 160
      });
      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff //white

        }
      });
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

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
        console.log(percent);
      });
      this.load.on("complete", function () {//this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
      });
      this.load.on("load", function (file) {
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.MENU);
    }
  }]);

  return Load;
}(Phaser.Scene);

exports.Load = Load;
},{"../CST":"src/CST.js"}],"src/scenes/Menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var _CST = require("../CST");

var _main = require("../main");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Menu =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Menu, _Phaser$Scene);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      // create black background, title text
      // gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x110022).setOrigin(0, 0);
      this.add.image(0, 0, 'nebula').setOrigin(0, 0);
      this.add.text(400, 150, "SPACE INVADERS", {
        fontSize: '30px',
        fill: '#ffffff'
      }).setOrigin(0.5); // add buttons for new game / options

      var newGame = this.add.text(400, 300, "New Game", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      var options = this.add.text(400, 450, "Options", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive(); // let newGame = this.add.rectangle(newGameText.x, newGameText.y, 300, 100).fill("0xffffff")
      // let options = this.add.rectangle()
      // create hovering sprites and set to invisible

      var leftSprite = this.add.sprite(100, 100, "orange-square").setVisible(false); // let rightSprite = this.add.sprite(100, 100, "orange-square").setVisible(false);

      newGame.on('pointerover', function () {
        console.log("OVER - newgame");
        leftSprite.setVisible(true).setX(newGame.x - 100).setY(newGame.y);
      });
      newGame.on('pointerout', function () {
        leftSprite.setVisible(false);
      });
      newGame.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.LEVEL1);
      });
      options.on('pointerover', function () {
        leftSprite.setVisible(true).setX(options.x - 100).setY(options.y);
      });
      options.on('pointerout', function () {
        leftSprite.setVisible(false);
      });
      options.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.OPTIONS);
      });
    }
  }]);

  return Menu;
}(Phaser.Scene);

exports.Menu = Menu;
},{"../CST":"src/CST.js","../main":"src/main.js"}],"src/scenes/Options.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = void 0;

var _CST = require("../CST");

var _main = require("../main");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import { leftSprite } from "../Menu"
var Options =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Options, _Phaser$Scene);

  function Options() {
    _classCallCheck(this, Options);

    return _possibleConstructorReturn(this, _getPrototypeOf(Options).call(this, {
      key: _CST.CST.SCENES.OPTIONS
    }));
  }

  _createClass(Options, [{
    key: "create",
    value: function create() {
      var _this = this;

      // create black background, title text
      _main.gameState.bgColor = this.add.rectangle(0, 0, _main.config.width, _main.config.height, 0x110022).setOrigin(0, 0);
      this.add.text(400, 150, "OPTIONS MENU", {
        fontSize: '30px',
        fill: '#ffffff'
      }).setOrigin(0.5); // create hovering sprites and set to invisible

      var leftSprite = this.add.sprite(100, 100, "orange-square").setVisible(false);
      var back = this.add.text(400, 450, "Return to Menu", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      back.on('pointerover', function () {
        console.log("OVER - back");
        leftSprite.setVisible(true).setX(back.x - 100).setY(back.y);
      });
      back.on('pointerout', function () {
        console.log("OUT - back");
        leftSprite.setVisible(false);
      });
      back.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }]);

  return Options;
}(Phaser.Scene);

exports.Options = Options;
},{"../CST":"src/CST.js","../main":"src/main.js"}],"src/scenes/Level.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level = void 0;

var _main = require("../main");

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Level =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Level, _Phaser$Scene);

  function Level(key) {
    _classCallCheck(this, Level);

    return _possibleConstructorReturn(this, _getPrototypeOf(Level).call(this, key));
  }

  _createClass(Level, [{
    key: "playerShoot",
    value: function playerShoot(time) {
      if (_main.gameState.cursors.space.isDown) {
        if (time > _main.gameState.bulletTime) {
          _main.gameState.bullets.create(_main.gameState.player.x, _main.gameState.player.y - 20, 'yellow-square').setVelocityY(-600);

          _main.gameState.bulletTime = time + 250;
        }
      }
    }
  }, {
    key: "playerMove",
    value: function playerMove() {
      if (_main.gameState.cursors.left.isDown) {
        _main.gameState.player.setVelocityX(-500);
      } else if (_main.gameState.cursors.right.isDown) {
        _main.gameState.player.setVelocityX(500);
      } else {
        _main.gameState.player.setVelocityX(0);
      }
    }
  }, {
    key: "enemiesCount",
    value: function enemiesCount() {
      return _main.gameState.enemies.getChildren().length;
      console.log("enemy count");
    }
  }, {
    key: "enemiesSortByX",
    value: function enemiesSortByX() {
      return _main.gameState.enemies.getChildren().sort(function (a, b) {
        return a.x - b.x;
      });
    } // Returns an array of the lowest flying enemy in each column (can drop bombs without hitting others)

  }, {
    key: "getLowEnemies",
    value: function getLowEnemies() {
      var sorted = this.enemiesSortByX();
      var low = [];

      for (var i = 0; i < this.enemiesCount() - 1; i++) {
        if (sorted[i].x < sorted[i + 1].x) low.push(sorted[i]);
      }

      low.push(sorted[sorted.length - 1]);
      return low;
    }
  }, {
    key: "enemiesMove",
    value: function enemiesMove() {
      _main.gameState.enemies.getChildren().forEach(function (enemy) {
        return enemy.x += _main.gameState.enemyVelocity;
      });

      if (this.enemiesSortByX()[0].x < 10 || this.enemiesSortByX()[this.enemiesCount() - 1].x > 790) {
        // enemy velocity increases 5% on each turn
        _main.gameState.enemyVelocity *= -1.05;

        _main.gameState.enemies.getChildren().forEach(function (enemy) {
          return enemy.y += 20;
        });
      }
    }
  }, {
    key: "startBombing",
    value: function startBombing() {
      _main.gameState.enemyBombs = this.physics.add.group();
      _main.gameState.enemyBombLoop = this.time.addEvent({
        delay: 600,
        callback: this.enemyFire,
        callbackScope: this,
        loop: true
      });
    }
  }, {
    key: "setScoreboardBackground",
    value: function setScoreboardBackground() {
      this.add.rectangle(0, _main.gameState.platform.y - 10, _main.config.width, _main.config.height - _main.gameState.platform.y + 10, "0x000000").setOrigin(0, 0).setDepth(0);
    } //Update scoreboard

  }, {
    key: "setScoreboard",
    value: function setScoreboard() {
      if (!this.levelText) this.levelText = this.add.text(400, 510, "Level: ".concat(this.levelNumber), {
        fontSize: '20px',
        fill: '#ffffff'
      });
      if (!this.enemiesText) this.enemiesText = this.add.text(400, 530, "Enemies: ".concat(this.enemiesCount()), {
        fontSize: '20px',
        fill: '#ffffff'
      });
      if (!this.livesText) this.livesText = this.add.text(400, 550, "Lives: ".concat(_main.gameState.lives), {
        fontSize: '20px',
        fill: '#ffffff'
      });
      this.levelText.setText("Level: ".concat(this.levelNumber));
      this.enemiesText.setText("Enemies: ".concat(this.enemiesCount()));
      this.livesText.setText("Lives: ".concat(_main.gameState.lives));
    }
  }, {
    key: "createPlatform",
    value: function createPlatform() {
      _main.gameState.platform = this.physics.add.staticGroup().create(0, 500, 'gray-platform').setVisible(true).setOrigin(0, 0); // gameState.platform = this.physics.add.staticGroup().create(400, 490, 'gray-platform').setVisible(false);
      // this.add.rectangle(0, gameState.platform.y, config.width, config.height - gameState.platform.y, "0x000000").setOrigin(0, 0).setDepth(0);
    }
  }, {
    key: "createPlayer",
    value: function createPlayer() {
      _main.gameState.player = this.physics.add.sprite(_main.gameState.player.x, _main.gameState.player.y, "orange-square").setCollideWorldBounds(true);
    }
  }, {
    key: "createBullets",
    value: function createBullets() {
      _main.gameState.bullets = this.physics.add.group();
    }
  }, {
    key: "createEnemies",
    value: function createEnemies() {
      _main.gameState.enemies = this.physics.add.group();

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 13; j++) {
          _main.gameState.enemies.create(100 + 50 * j, 50 + 50 * i, 'red-square');
        }
      } // this.startBombing();

    } // Select all of the low-flying enemies and randomly drop bombs

  }, {
    key: "enemyFire",
    value: function enemyFire() {
      this.getLowEnemies().forEach(function (enemy) {
        if (Math.random() > 0.8) _main.gameState.enemyBombs.create(enemy.x, enemy.y + 20, 'gray-square').setGravityY(600);
      });
    }
  }, {
    key: "createColliders",
    value: function createColliders() {
      var _this = this;

      this.physics.add.collider(_main.gameState.platform, _main.gameState.player);
      _main.gameState.bulletsEnemiesCollider = this.physics.add.collider(_main.gameState.bullets, _main.gameState.enemies, function (bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
      });
      this.physics.add.collider(_main.gameState.platform, _main.gameState.enemyBombs, function (platform, bomb) {
        bomb.destroy();
      });
      _main.gameState.playerBombCollider = this.physics.add.collider(_main.gameState.player, _main.gameState.enemyBombs, function (player, bomb) {
        _main.gameState.lives--;

        if (_main.gameState.lives > 0) {
          _main.gameState.enemyBombs.getChildren().forEach(function (bomb) {
            return bomb.destroy();
          });
        } else {
          _this.gameOver();
        }
      });
    }
  }, {
    key: "createControls",
    value: function createControls() {
      _main.gameState.cursors = this.input.keyboard.createCursorKeys();
      this.add.text(200, 510, "Controls:", {
        fontSize: '20px',
        fill: '#ffffff'
      });
      this.add.text(200, 530, "- Move: arrows", {
        fontSize: '20px',
        fill: '#ffffff'
      });
      this.add.text(200, 550, "- Fire: space", {
        fontSize: '20px',
        fill: '#ffffff'
      });
      console.log("create controls!");
    }
  }, {
    key: "createBackground",
    value: function createBackground(color) {
      _main.gameState.bgColor = this.add.rectangle(0, 0, _main.config.width, _main.config.height, color).setOrigin(0, 0).setDepth(0);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var _this2 = this;

      console.log("GAME OVER");
      _main.gameState.active = false;

      _main.gameState.bullets.destroy();

      _main.gameState.enemyBombLoop.destroy();

      _main.gameState.playerBombCollider.destroy();

      _main.gameState.bulletsEnemiesCollider.destroy();

      this.add.text(400, 250, "GAME OVER", {
        fontSize: '30px',
        fill: '#ffffff'
      }).setOrigin(0.5);
      var back = this.add.text(400, 350, "Return to Menu", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      back.on('pointerup', function () {
        _this2.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }]);

  return Level;
}(Phaser.Scene);

exports.Level = Level;
},{"../main":"src/main.js","../CST":"src/CST.js"}],"src/scenes/Level1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level1 = void 0;

var _CST = require("../CST");

var _main = require("../main");

var _Level2 = require("./Level");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Level1 =
/*#__PURE__*/
function (_Level) {
  _inherits(Level1, _Level);

  function Level1() {
    var _this;

    _classCallCheck(this, Level1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Level1).call(this, {
      key: _CST.CST.SCENES.LEVEL1
    }));
    _this.levelNumber = 1;
    return _this;
  }

  _createClass(Level1, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      // level setup - platform, player, enemies
      // this.createBackground(0x110022)
      this.add.image(0, 0, 'sanfrancisco').setOrigin(0, 0);
      this.createPlatform();
      this.setScoreboardBackground();
      this.createPlayer();
      this.createBullets();
      this.createEnemies(); // this.startBombing();

      this.createColliders();
      this.createControls();
      _main.gameState.active = true;
      this.add.sprite(400, 100, 'ufogreen'); // for testing: button to cycle through levels
      // this.add.text(100, 100, "Level1", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5)

      var next = this.add.text(700, 550, "NEXT LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      var last = this.add.text(100, 550, "PREV LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      next.on('pointerup', function () {
        _this2.scene.stop(_CST.CST.SCENES.LEVEL1);

        _this2.scene.start(_CST.CST.SCENES.LEVEL2);
      });
      last.on('pointerup', function () {
        _this2.scene.stop(_CST.CST.SCENES.LEVEL1);

        _this2.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.enemiesCount() === 0) {
        _main.gameState.active = false;
        this.scene.start(_CST.CST.SCENES.LEVEL2);
      }

      if (_main.gameState.active) {
        this.playerMove();
        this.playerShoot(time);
        this.setScoreboard(); // this.enemiesMove();
      }
    }
  }]);

  return Level1;
}(_Level2.Level);

exports.Level1 = Level1;
},{"../CST":"src/CST.js","../main":"src/main.js","./Level":"src/scenes/Level.js"}],"src/scenes/Level2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level2 = void 0;

var _CST = require("../CST");

var _main = require("../main");

var _Level2 = require("./Level");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Level2 =
/*#__PURE__*/
function (_Level) {
  _inherits(Level2, _Level);

  function Level2() {
    var _this;

    _classCallCheck(this, Level2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Level2).call(this, {
      key: _CST.CST.SCENES.LEVEL2
    }));
    _this.levelNumber = 2;
    return _this;
  }

  _createClass(Level2, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      // level setup - platform, player, enemies
      // this.createBackground(0x110022)
      this.add.image(0, 0, 'moon').setOrigin(0, 0);
      this.createPlatform();
      this.setScoreboardBackground();
      this.createPlayer();
      this.createBullets();
      this.createEnemies(); // this.startBombing();

      this.createColliders();
      this.createControls();
      _main.gameState.active = true; // for testing: button to cycle through levels
      // this.add.text(100, 100, "Level2", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

      var next = this.add.text(700, 550, "NEXT LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      var last = this.add.text(100, 550, "PREV LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      next.on('pointerup', function () {
        _this2.scene.stop(_CST.CST.SCENES.LEVEL2);

        _this2.scene.start(_CST.CST.SCENES.LEVEL3);
      });
      last.on('pointerup', function () {
        _this2.scene.stop(_CST.CST.SCENES.LEVEL2);

        _this2.scene.start(_CST.CST.SCENES.LEVEL1);
      });
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.enemiesCount() === 0) {
        _main.gameState.active = false;
        this.scene.start(_CST.CST.SCENES.LEVEL3);
      }

      if (_main.gameState.active) {
        this.playerMove();
        this.playerShoot(time);
        this.setScoreboard(); // this.enemiesMove();
      }
    }
  }]);

  return Level2;
}(_Level2.Level);

exports.Level2 = Level2;
},{"../CST":"src/CST.js","../main":"src/main.js","./Level":"src/scenes/Level.js"}],"src/scenes/Level3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level3 = void 0;

var _CST = require("../CST");

var _main = require("../main");

var _Level2 = require("./Level");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Level3 =
/*#__PURE__*/
function (_Level) {
  _inherits(Level3, _Level);

  function Level3() {
    var _this;

    _classCallCheck(this, Level3);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Level3).call(this, {
      key: _CST.CST.SCENES.LEVEL3
    }));
    _this.levelNumber = 3;
    return _this;
  }

  _createClass(Level3, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      // level setup - platform, player, enemies
      this.add.image(0, 0, 'wormhole').setOrigin(0, 0); // this.add.image(0, 0, 'wormhole')

      this.createPlatform();
      this.setScoreboardBackground();
      this.createPlayer();
      this.createBullets();
      this.createEnemies(); // this.startBombing();

      this.createColliders();
      this.createControls();
      _main.gameState.active = true; // for testing: button to cycle through levels
      // this.add.text(100, 100, "Level3", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5)

      var next = this.add.text(700, 550, "NEXT LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      var last = this.add.text(100, 550, "PREV LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      next.on('pointerup', function () {
        _this2.scene.start(_CST.CST.SCENES.CREDITS);
      });
      last.on('pointerup', function () {
        _this2.scene.start(_CST.CST.SCENES.LEVEL2);
      });
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.enemiesCount() === 0) {
        _main.gameState.active = false;
        this.scene.start(_CST.CST.SCENES.LEVEL3);
      }

      if (_main.gameState.active) {
        this.playerMove();
        this.playerShoot(time);
        this.setScoreboard(); // this.enemiesMove();
      }
    }
  }]);

  return Level3;
}(_Level2.Level);

exports.Level3 = Level3;
},{"../CST":"src/CST.js","../main":"src/main.js","./Level":"src/scenes/Level.js"}],"src/scenes/Credits.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Credits = void 0;

var _CST = require("../CST");

var _main = require("../main");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Credits =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Credits, _Phaser$Scene);

  function Credits() {
    _classCallCheck(this, Credits);

    return _possibleConstructorReturn(this, _getPrototypeOf(Credits).call(this, {
      key: _CST.CST.SCENES.CREDITS
    }));
  }

  _createClass(Credits, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      // let newGame = this.add.text(400, 300, "New Game", { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
      // create background and scene label in top left
      _main.gameState.bgColor = this.add.rectangle(0, 0, _main.config.width, _main.config.height, 0x110022).setOrigin(0, 0);
      this.add.text(100, 100, "CREDITS", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive(); // for testing: button to cycle through levels

      var next = this.add.text(700, 550, "NEXT LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      var last = this.add.text(100, 550, "PREV LEVEL", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      next.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
      last.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.LEVEL3);
      }); // for testing: button to cycle through levels

      var back = this.add.text(700, 500, "Return to Menu", {
        fontSize: '20px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();
      back.on('pointerover', function () {
        console.log("OVER - back");
      });
      back.on('pointerout', function () {
        console.log("OUT - back");
      });
      back.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }]);

  return Credits;
}(Phaser.Scene);

exports.Credits = Credits;
},{"../CST":"src/CST.js","../main":"src/main.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.gameState = exports.config = void 0;

var _Load = require("./scenes/Load");

var _Menu = require("./scenes/Menu");

var _Options = require("./scenes/Options");

var _Level = require("./scenes/Level1");

var _Level2 = require("./scenes/Level2");

var _Level3 = require("./scenes/Level3");

var _Credits = require("./scenes/Credits");

var config = {
  width: 800,
  height: 600,
  scene: [_Load.Load, _Menu.Menu, _Options.Options, _Level.Level1, _Level2.Level2, _Level3.Level3, _Credits.Credits],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
exports.config = config;
var gameState = {
  active: true,
  player: {
    x: 400,
    y: 480
  },
  // platform: {},
  bullets: {},
  bulletTime: 0,
  // enemies: 7,
  enemyVelocity: 2,
  enemyBombs: {},
  level: 0,
  lives: 3,
  score: 0
};
exports.gameState = gameState;
var game = new Phaser.Game(config);
exports.game = game;
},{"./scenes/Load":"src/scenes/Load.js","./scenes/Menu":"src/scenes/Menu.js","./scenes/Options":"src/scenes/Options.js","./scenes/Level1":"src/scenes/Level1.js","./scenes/Level2":"src/scenes/Level2.js","./scenes/Level3":"src/scenes/Level3.js","./scenes/Credits":"src/scenes/Credits.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63218" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map
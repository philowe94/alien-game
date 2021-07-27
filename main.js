/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/alien.js":
/*!**********************!*\
  !*** ./src/alien.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Floor = __webpack_require__(/*! ./floor */ "./src/floor.js");

var Alien = /*#__PURE__*/function () {
  function Alien(options) {
    _classCallCheck(this, Alien);

    this.pos = options.pos;
    this.color = "#ffffff";
    this.game = options.game;
    this.state = this.decideNewState();
    this.state_timer = 0;
    this.sprites = new Image();
    this.sprites.src = 'assets/alien-sprite.png';
  }

  _createClass(Alien, [{
    key: "die",
    value: function die() {
      this.state = "DEAD";
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      var mapTile = this.game.getMapTile(this.pos);

      if (mapTile instanceof Floor) {
        if (mapTile.digLevel === 1) {
          this.state = "FILLING_TRAP";
        }

        if (mapTile.digLevel === 2) {
          this.state = "TRAPPED";
        }
      }

      if (this.pos[0] === this.game.player.pos[0] && this.pos[1] === this.game.player.pos[1]) {
        this.game.player.state = "DEAD";
      }
    }
  }, {
    key: "decideNewState",
    value: function decideNewState() {
      var _this = this;

      //randomly choose direction
      var dirs = [[0, -1], //up
      [-1, 0], //left
      [0, 1], //down
      [1, 0] //right
      ];
      var legalDirIdxs = []; //get rid of illegal positions

      dirs.forEach(function (dir, idx) {
        var newPos = [_this.pos[0] + dir[0], _this.pos[1] + dir[1]];

        if (_this.game.isLegalPosition(newPos)) {
          legalDirIdxs.push(idx);
        }
      });
      var floorDirIdxs = [];
      legalDirIdxs.forEach(function (diridx, idx) {
        var newPos = [_this.pos[0] + dirs[diridx][0], _this.pos[1] + dirs[diridx][1]];

        if (_this.game.getMapTile(newPos) instanceof Floor) {
          floorDirIdxs.push(diridx);
        }
      }); //get random move

      var index = floorDirIdxs[Math.floor(Math.random() * floorDirIdxs.length)];
      var newState = "";

      switch (index) {
        case 0:
          newState = "MOVING_UP";
          break;

        case 1:
          newState = "MOVING_LEFT";
          break;

        case 2:
          newState = "MOVING_DOWN";
          break;

        case 3:
          newState = "MOVING_RIGHT";
          break;

        default:
          break;
      }

      return newState;
    }
  }, {
    key: "move",
    value: function move() {
      switch (this.state) {
        case "MOVING_UP":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] - 1];
            this.state = this.decideNewState();
            this.checkCollision();
          }

          break;

        case "MOVING_LEFT":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0] - 1, this.pos[1]];
            this.state = this.decideNewState();
            this.checkCollision();
          }

          break;

        case "MOVING_DOWN":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] + 1];
            this.state = this.decideNewState();
            this.checkCollision();
          }

          break;

        case "MOVING_RIGHT":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0] + 1, this.pos[1]];
            this.state = this.decideNewState();
            this.checkCollision();
          }

          break;

        case "FILLING_TRAP":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            var mapTile = this.game.getMapTile(this.pos);
            mapTile.digLevel = 0;
            this.state = this.decideNewState();
          }

          break;

        case "TRAPPED":
          this.state_timer += 1;

          if (this.state_timer === 160) {
            this.state_timer = 0;
            this.state = this.decideNewState();
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      var xoffset = 0;

      if (this.state_timer > 8) {
        xoffset = 16;
      }

      switch (this.state) {
        case "MOVING_UP":
          ctx.drawImage(this.sprites, xoffset, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64 - this.state_timer * (64 / 16), 64, 64);
          break;

        case "MOVING_LEFT":
          ctx.drawImage(this.sprites, xoffset, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 - this.state_timer * (64 / 16), this.pos[1] * 64, 64, 64);
          break;

        case "MOVING_DOWN":
          ctx.drawImage(this.sprites, xoffset, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64 + this.state_timer * (64 / 16), 64, 64);
          break;

        case "MOVING_RIGHT":
          ctx.drawImage(this.sprites, xoffset, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 + this.state_timer * (64 / 16), this.pos[1] * 64, 64, 64);
          break;

        case "FILLING_TRAP":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case "TRAPPED":
          ctx.drawImage(this.sprites, 32, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;
      }
    }
  }]);

  return Alien;
}();

module.exports = Alien;

/***/ }),

/***/ "./src/floor.js":
/*!**********************!*\
  !*** ./src/floor.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Tile = __webpack_require__(/*! ./tile */ "./src/tile.js");

var Floor = /*#__PURE__*/function (_Tile) {
  _inherits(Floor, _Tile);

  var _super = _createSuper(Floor);

  function Floor(options) {
    var _this;

    _classCallCheck(this, Floor);

    _this = _super.call(this, options);
    _this.color = "#1a936f";
    _this.digLevel = 0;
    _this.sprites = new Image();
    _this.sprites.src = 'assets/map-tiles.png';
    return _this;
  }

  _createClass(Floor, [{
    key: "fill",
    value: function fill() {
      if (this.digLevel >= 0) {
        this.digLevel -= 1;
      }
    }
  }, {
    key: "dig",
    value: function dig() {
      if (this.digLevel < 2) {
        this.digLevel += 1;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      switch (this.digLevel) {
        case 0:
          ctx.drawImage(this.sprites, 16, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case 1:
          ctx.drawImage(this.sprites, 16, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.lineWidth = 1;
          ctx.fillStyle = "#ffffff";
          ctx.stroke();
          break;

        case 2:
          ctx.drawImage(this.sprites, 16, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.lineWidth = 3;
          ctx.fillStyle = "#ffffff";
          ctx.stroke();
          break;

        default:
          break;
      }
    }
  }]);

  return Floor;
}(Tile);

module.exports = Floor;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = __webpack_require__(/*! ./player */ "./src/player.js");

var Floor = __webpack_require__(/*! ./floor */ "./src/floor.js");

var Wall = __webpack_require__(/*! ./wall */ "./src/wall.js");

var Alien = __webpack_require__(/*! ./alien */ "./src/alien.js");

var Game = /*#__PURE__*/function () {
  function Game(playerpos) {
    _classCallCheck(this, Game);

    this.VIEW_WIDTH = 640;
    this.VIEW_HEIGHT = 576;
    this.WIDTH = 10;
    this.HEIGHT = 9;
    this.FPS = 60;
    this.BG_COLOR = "#ff5733";
    this.level1 = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]];
    this.level2 = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]];
    this.level3 = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]];
    this.addMap(this.level1);
    this.player = new Player({
      game: this,
      pos: playerpos
    });
    this.aliens = [new Alien({
      game: this,
      pos: [0, 8]
    }), new Alien({
      game: this,
      pos: [4, 4]
    }), new Alien({
      game: this,
      pos: [5, 5]
    })];
    this.state = "LEVEL_START";
    this.current_level = 1;
    this.levels = [this.level1, this.level2, this.level3];
  }

  _createClass(Game, [{
    key: "gameOver",
    value: function gameOver() {
      this.player = [];
    }
  }, {
    key: "goToNextLevel",
    value: function goToNextLevel() {
      if (this.current_level < 3) {
        this.current_level += 1;
        this.addMap(this.levels[this.current_level - 1]);
        this.player = new Player({
          game: this,
          pos: [0, 0]
        });
        this.aliens = [new Alien({
          game: this,
          pos: [0, 8]
        }), new Alien({
          game: this,
          pos: [4, 4]
        }), new Alien({
          game: this,
          pos: [5, 5]
        })];
        this.state = "MAIN_MENU";
      }
    } // [ horizontal, vertical ]

  }, {
    key: "getMapTile",
    value: function getMapTile(pos) {
      if (pos) {
        return this.map[pos[1]][pos[0]];
      }
    } // returns true if pos is on the board, false if otherwise

  }, {
    key: "isLegalPosition",
    value: function isLegalPosition(pos) {
      if (pos) {
        if (pos[0] >= 0 && pos[0] < this.map[0].length) {
          if (pos[1] >= 0 && pos[1] < this.map.length) {
            return true;
          }
        }
      }

      return false;
    } //given a grid, set this.grid to an array of the classes

  }, {
    key: "addMap",
    value: function addMap(map) {
      var _this = this;

      this.map = map;
      this.map.forEach(function (row, row_i) {
        row.forEach(function (square, col_i) {
          // 0 is floor
          if (square === 0) {
            _this.map[row_i][col_i] = new Floor({
              pos: [col_i, row_i]
            }); //1 is wall
          } else if (square === 1) {
            _this.map[row_i][col_i] = new Wall({
              pos: [col_i, row_i]
            });
          }
        });
      });
    }
  }, {
    key: "moveObjects",
    value: function moveObjects() {
      switch (this.state) {
        case "PLAYING":
          this.player.move();
          this.aliens.forEach(function (alien) {
            alien.move();
          });

        default:
          break;
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.state = "PLAYING";
    }
  }, {
    key: "step",
    value: function step() {
      switch (this.state) {
        case "PLAYING":
          this.moveObjects();
          break;

        default:
          break;
      }
    } //render the current gamestate

  }, {
    key: "render",
    value: function render(ctx) {
      ctx.imageSmoothingEnabled = false;

      switch (this.state) {
        case "PLAYING":
          ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
          ctx.fillStyle = this.BG_COLOR;
          ctx.fillRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT); //render the map

          this.map.forEach(function (row, row_i) {
            row.forEach(function (square, col_i) {
              square.render(ctx);
            });
          }); //render the actors

          this.player.render(ctx);
          this.aliens.forEach(function (alien) {
            alien.render(ctx);
          }); //check if all aliens are defeated

          if (this.aliens.every(function (alien) {
            return alien.state === "DEAD";
          })) {
            this.goToNextLevel();
          }

          break;

        case "LEVEL_START":
          //render the map
          this.map.forEach(function (row, row_i) {
            row.forEach(function (square, col_i) {
              square.render(ctx);
            });
          }); //render the actors

          this.player.render(ctx);
          this.aliens.forEach(function (alien) {
            alien.render(ctx);
          });
          ctx.fillStyle = 'rgba(240, 242, 245, 0.7)';
          ctx.fillRect(-5, 150, 700, 160);
          ctx.strokeRect(-50, 150, 700, 160);
          ctx.fillStyle = 'black';
          ctx.font = "40px Noto Sans";
          ctx.fillText("Level ".concat(this.current_level), 150, 220);
          ctx.font = "20px Noto Sans";
          ctx.fillText("Press Enter to start", 150, 270);
          break;

        case "VICTORY":
          //render the map
          this.map.forEach(function (row, row_i) {
            row.forEach(function (square, col_i) {
              square.render(ctx);
            });
          }); //render the actors

          this.player.render(ctx);
          this.aliens.forEach(function (alien) {
            alien.render(ctx);
          });
          ctx.fillStyle = 'rgba(240, 242, 245, 0.7)';
          ctx.fillRect(-5, 150, 700, 160);
          ctx.strokeRect(-50, 150, 700, 160);
          ctx.fillStyle = 'black';
          ctx.font = "40px Noto Sans";
          ctx.fillText("CONGRATULATIONS", 150, 220);
          ctx.font = "20px Noto Sans";
          ctx.fillText("Thank you for playing!", 150, 270);
          break;
      }
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ (function(module) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameView = /*#__PURE__*/function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.lastTime = 0;
    this.DIRS = {
      w: [0, -1],
      a: [-1, 0],
      s: [0, 1],
      d: [1, 0]
    };
  } //bind keys to moves


  _createClass(GameView, [{
    key: "bindKeys",
    value: function bindKeys() {
      var _this = this;

      Object.keys(this.DIRS).forEach(function (k) {
        key(k, function () {
          return _this.game.player.set_state(k);
        });
      });
      key("k", function () {
        return _this.game.player.set_state("k");
      });
      key("j", function () {
        return _this.game.player.set_state("j");
      });
      key("enter", function () {
        return _this.game.start();
      });
    } //run the game

  }, {
    key: "start",
    value: function start() {
      this.bindKeys();
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate(time) {
      //change in time is current time - last time
      var timeDelta = time - this.lastTime; //if time has changed more than 16 ms

      if (timeDelta > 16.66) {
        this.game.step();
        this.game.render(this.ctx); //lastTime is current time

        this.lastTime = time + (timeDelta - 16.66);
      }

      requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Floor = __webpack_require__(/*! ./floor */ "./src/floor.js");

var Wall = __webpack_require__(/*! ./wall */ "./src/wall.js");

var Player = /*#__PURE__*/function () {
  function Player(options) {
    _classCallCheck(this, Player);

    this.color = "#000000";
    this.pos = options.pos;
    this.game = options.game;
    this.state = "FACING_DOWN";
    this.state_timer = 0;
    this.sprites = new Image();
    this.sprites.src = 'assets/chibi-layered.png';
    this.DIRS = {
      w: [0, -1],
      a: [-1, 0],
      s: [0, 1],
      d: [1, 0]
    };
  }

  _createClass(Player, [{
    key: "dig",
    value: function dig(digpos) {
      console.log("DIGGING");
      console.log(digpos);
      var digTile = this.game.getMapTile(digpos);

      if (digTile instanceof Floor) {
        digTile.dig();
        console.log(digTile.digLevel);
      }
    }
  }, {
    key: "fill",
    value: function fill(fillpos) {
      console.log("FILLING");
      console.log(fillpos);
      var fillTile = this.game.getMapTile(fillpos);

      if (fillTile instanceof Floor) {
        if (fillTile.digLevel === 1) {
          this.game.aliens.forEach(function (alien) {
            if (fillTile.pos[0] === alien.pos[0] && fillTile.pos[1] === alien.pos[1]) {
              alien.die();
            }
          });
        }

        if (fillTile.digLevel >= 1) {
          fillTile.fill();
          console.log(digTile.digLevel);
        }
      }
    }
  }, {
    key: "getDigPos",
    value: function getDigPos() {
      var dirsStates = ["FACING_UP", "FACING_LEFT", "FACING_DOWN", "FACING_RIGHT"];
      var dirIdx = dirsStates.indexOf(this.state);

      if (dirIdx >= 0) {
        var dir = Object.values(this.DIRS)[dirIdx];
        var digPos = [this.pos[0] + dir[0], this.pos[1] + dir[1]];

        if (this.game.isLegalPosition(digPos)) {
          return digPos;
        }
      } else {
        return null;
      }
    }
  }, {
    key: "set_state",
    value: function set_state(k) {
      var nextPos = [];

      if (["FACING_DOWN", "FACING_UP", "FACING_LEFT", "FACING_RIGHT"].includes(this.state)) {
        switch (k) {
          case "w":
            nextPos = [this.pos[0], this.pos[1] - 1];

            if (this.game.getMapTile([this.pos[0], this.pos[1] - 1]) instanceof Floor) {
              this.state = "MOVING_UP";
            }

            break;

          case "a":
            nextPos = [this.pos[0] - 1, this.pos[1]];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              this.state = "MOVING_LEFT";
            }

            break;

          case "s":
            nextPos = [this.pos[0], this.pos[1] + 1];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              this.state = "MOVING_DOWN";
            }

            break;

          case "d":
            nextPos = [this.pos[0] + 1, this.pos[1]];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              this.state = "MOVING_RIGHT";
            }

            break;

          case "k":
            var digPos = this.getDigPos();
            this.dig(digPos);
            break;

          case "j":
            var fillPos = this.getDigPos();
            this.fill(fillPos);
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "move",
    value: function move() {
      switch (this.state) {
        case "MOVING_UP":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] - 1];
            this.state = "FACING_UP";
            console.log(this.state);
          }

          break;

        case "MOVING_LEFT":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0] - 1, this.pos[1]];
            this.state = "FACING_LEFT";
            console.log(this.state);
          }

          break;

        case "MOVING_DOWN":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] + 1];
            this.state = "FACING_DOWN";
            console.log(this.state);
          }

          break;

        case "MOVING_RIGHT":
          this.state_timer += 1;

          if (this.state_timer === 16) {
            this.state_timer = 0;
            this.pos = [this.pos[0] + 1, this.pos[1]];
            this.state = "FACING_RIGHT";
            console.log(this.state);
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      switch (this.state) {
        case "FACING_UP":
          ctx.drawImage(this.sprites, 32, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case "FACING_LEFT":
          ctx.drawImage(this.sprites, 16, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case "FACING_DOWN":
          ctx.drawImage(this.sprites, 0, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, // offset on canvas
          this.pos[1] * 64, 64, 64 // size on canvas
          );
          break;

        case "FACING_RIGHT":
          ctx.drawImage(this.sprites, 144, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case "MOVING_UP":
          ctx.drawImage(this.sprites, 80, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64 - this.state_timer * (64 / 16), 64, 64);
          break;

        case "MOVING_LEFT":
          ctx.drawImage(this.sprites, 64, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 - this.state_timer * (64 / 16), this.pos[1] * 64, 64, 64);
          break;

        case "MOVING_DOWN":
          ctx.drawImage(this.sprites, 48, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64 + this.state_timer * (64 / 16), 64, 64);
          break;

        case "MOVING_RIGHT":
          ctx.drawImage(this.sprites, 160, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 + this.state_timer * (64 / 16), this.pos[1] * 64, 64, 64);
          break;

        default:
          break;
      }
    }
  }]);

  return Player;
}();

module.exports = Player;

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/***/ (function(module) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tile = /*#__PURE__*/function () {
  function Tile(options) {
    _classCallCheck(this, Tile);

    this.pos = options.pos;
    this.color = "#222222";
  }

  _createClass(Tile, [{
    key: "render",
    value: function render(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0] * 64, this.pos[1] * 64, 64, 64);
    }
  }]);

  return Tile;
}();

module.exports = Tile;

/***/ }),

/***/ "./src/wall.js":
/*!*********************!*\
  !*** ./src/wall.js ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Tile = __webpack_require__(/*! ./tile */ "./src/tile.js");

var Wall = /*#__PURE__*/function (_Tile) {
  _inherits(Wall, _Tile);

  var _super = _createSuper(Wall);

  function Wall(options) {
    var _this;

    _classCallCheck(this, Wall);

    _this = _super.call(this, options);
    _this.color = "#114b5f";
    _this.sprites = new Image();
    _this.sprites.src = 'assets/map-tiles.png';
    return _this;
  }

  _createClass(Wall, [{
    key: "render",
    value: function render(ctx) {
      ctx.drawImage(this.sprites, 0, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
    }
  }]);

  return Wall;
}(Tile);

module.exports = Wall;

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
// Imports


var Game = __webpack_require__(/*! ./game */ "./src/game.js");

var GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

document.addEventListener("DOMContentLoaded", function () {
  //canvas research
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d'); //set up game

  var game = new Game([0, 0]);
  canvas.width = game.VIEW_WIDTH;
  canvas.height = game.VIEW_HEIGHT;
  new GameView(game, ctx).start();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImRpcnMiLCJsZWdhbERpcklkeHMiLCJmb3JFYWNoIiwiZGlyIiwiaWR4IiwibmV3UG9zIiwiaXNMZWdhbFBvc2l0aW9uIiwicHVzaCIsImZsb29yRGlySWR4cyIsImRpcmlkeCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3U3RhdGUiLCJjaGVja0NvbGxpc2lvbiIsImN0eCIsInhvZmZzZXQiLCJkcmF3SW1hZ2UiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsIlBsYXllciIsIldhbGwiLCJHYW1lIiwicGxheWVycG9zIiwiVklFV19XSURUSCIsIlZJRVdfSEVJR0hUIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsImxldmVsMSIsImxldmVsMiIsImxldmVsMyIsImFkZE1hcCIsImFsaWVucyIsImN1cnJlbnRfbGV2ZWwiLCJsZXZlbHMiLCJtYXAiLCJyb3ciLCJyb3dfaSIsInNxdWFyZSIsImNvbF9pIiwibW92ZSIsImFsaWVuIiwibW92ZU9iamVjdHMiLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsInJlbmRlciIsImV2ZXJ5IiwiZ29Ub05leHRMZXZlbCIsInN0cm9rZVJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJHYW1lVmlldyIsImxhc3RUaW1lIiwiRElSUyIsInciLCJhIiwicyIsImQiLCJPYmplY3QiLCJrZXlzIiwiayIsImtleSIsInNldF9zdGF0ZSIsInN0YXJ0IiwiYmluZEtleXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhbmltYXRlIiwiYmluZCIsInRpbWUiLCJ0aW1lRGVsdGEiLCJzdGVwIiwiZGlncG9zIiwiY29uc29sZSIsImxvZyIsImRpZ1RpbGUiLCJkaWciLCJmaWxscG9zIiwiZmlsbFRpbGUiLCJkaWUiLCJkaXJzU3RhdGVzIiwiZGlySWR4IiwiaW5kZXhPZiIsInZhbHVlcyIsImRpZ1BvcyIsIm5leHRQb3MiLCJpbmNsdWRlcyIsImdldERpZ1BvcyIsImZpbGxQb3MiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxtQkFBTyxD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QUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBRlUsRUFHVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBSFUsRUFJVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBSlUsRUFLVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBTFUsRUFNVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBTlUsRUFPVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBUFUsRUFRVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBUlUsRUFTVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBVFUsQ0FBZDtBQWFBLFNBQUtDLE1BQUwsQ0FBWSxLQUFLSCxNQUFqQjtBQUNBLFNBQUt6QyxNQUFMLEdBQWMsSUFBSStCLE1BQUosQ0FBVztBQUFDekMsVUFBSSxFQUFFLElBQVA7QUFBYUYsU0FBRyxFQUFFOEM7QUFBbEIsS0FBWCxDQUFkO0FBQ0EsU0FBS1csTUFBTCxHQUFjLENBQ1YsSUFBSTNELEtBQUosQ0FBVTtBQUFDSSxVQUFJLEVBQUUsSUFBUDtBQUFhRixTQUFHLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUFsQixLQUFWLENBRFUsRUFFVixJQUFJRixLQUFKLENBQVU7QUFBQ0ksVUFBSSxFQUFFLElBQVA7QUFBYUYsU0FBRyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFBbEIsS0FBVixDQUZVLEVBR1YsSUFBSUYsS0FBSixDQUFVO0FBQUNJLFVBQUksRUFBRSxJQUFQO0FBQWFGLFNBQUcsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBQWxCLEtBQVYsQ0FIVSxDQUFkO0FBTUEsU0FBS0csS0FBTCxHQUFhLGFBQWI7QUFDQSxTQUFLdUQsYUFBTCxHQUFxQixDQUFyQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFDLEtBQUtOLE1BQU4sRUFBYyxLQUFLQyxNQUFuQixFQUEyQixLQUFLQyxNQUFoQyxDQUFkO0FBQ0g7Ozs7V0FFRCxvQkFBVztBQUNQLFdBQUszQyxNQUFMLEdBQWMsRUFBZDtBQUNIOzs7V0FFRCx5QkFBZ0I7QUFDWixVQUFJLEtBQUs4QyxhQUFMLEdBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGFBQUtBLGFBQUwsSUFBc0IsQ0FBdEI7QUFDQSxhQUFLRixNQUFMLENBQVksS0FBS0csTUFBTCxDQUFZLEtBQUtELGFBQUwsR0FBb0IsQ0FBaEMsQ0FBWjtBQUNBLGFBQUs5QyxNQUFMLEdBQWMsSUFBSStCLE1BQUosQ0FBVztBQUFDekMsY0FBSSxFQUFFLElBQVA7QUFBYUYsYUFBRyxFQUFFLENBQUMsQ0FBRCxFQUFHLENBQUg7QUFBbEIsU0FBWCxDQUFkO0FBQ0EsYUFBS3lELE1BQUwsR0FBYyxDQUNWLElBQUkzRCxLQUFKLENBQVU7QUFBQ0ksY0FBSSxFQUFFLElBQVA7QUFBYUYsYUFBRyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFBbEIsU0FBVixDQURVLEVBRVYsSUFBSUYsS0FBSixDQUFVO0FBQUNJLGNBQUksRUFBRSxJQUFQO0FBQWFGLGFBQUcsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBQWxCLFNBQVYsQ0FGVSxFQUdWLElBQUlGLEtBQUosQ0FBVTtBQUFDSSxjQUFJLEVBQUUsSUFBUDtBQUFhRixhQUFHLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUFsQixTQUFWLENBSFUsQ0FBZDtBQU1BLGFBQUtHLEtBQUwsR0FBYSxXQUFiO0FBQ0g7QUFDSixLLENBRUQ7Ozs7V0FDQSxvQkFBV0gsR0FBWCxFQUFnQjtBQUNaLFVBQUdBLEdBQUgsRUFBUTtBQUNKLGVBQU8sS0FBSzRELEdBQUwsQ0FBUzVELEdBQUcsQ0FBQyxDQUFELENBQVosRUFBaUJBLEdBQUcsQ0FBQyxDQUFELENBQXBCLENBQVA7QUFDSDtBQUNKLEssQ0FFRDs7OztXQUNBLHlCQUFnQkEsR0FBaEIsRUFBcUI7QUFDakIsVUFBSUEsR0FBSixFQUFTO0FBQ0wsWUFBSUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxJQUFVLENBQVYsSUFBZUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTLEtBQUs0RCxHQUFMLENBQVMsQ0FBVCxFQUFZakMsTUFBeEMsRUFBZ0Q7QUFDNUMsY0FBSzNCLEdBQUcsQ0FBQyxDQUFELENBQUgsSUFBVSxDQUFWLElBQWVBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBUyxLQUFLNEQsR0FBTCxDQUFTakMsTUFBdEMsRUFBOEM7QUFDMUMsbUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxhQUFPLEtBQVA7QUFDSCxLLENBRUQ7Ozs7V0FDQSxnQkFBT2lDLEdBQVAsRUFBWTtBQUFBOztBQUNSLFdBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUVBLFdBQUtBLEdBQUwsQ0FBUzdDLE9BQVQsQ0FBa0IsVUFBQzhDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM5QkQsV0FBRyxDQUFDOUMsT0FBSixDQUFhLFVBQUNnRCxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDNUI7QUFDQSxjQUFJRCxNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUVkLGlCQUFJLENBQUNILEdBQUwsQ0FBU0UsS0FBVCxFQUFnQkUsS0FBaEIsSUFBeUIsSUFBSXBFLEtBQUosQ0FBVTtBQUFDSSxpQkFBRyxFQUFFLENBQUNnRSxLQUFELEVBQVFGLEtBQVI7QUFBTixhQUFWLENBQXpCLENBRmMsQ0FJbEI7QUFDQyxXQUxELE1BS08sSUFBSUMsTUFBTSxLQUFLLENBQWYsRUFBa0I7QUFDckIsaUJBQUksQ0FBQ0gsR0FBTCxDQUFTRSxLQUFULEVBQWdCRSxLQUFoQixJQUF5QixJQUFJcEIsSUFBSixDQUFTO0FBQUM1QyxpQkFBRyxFQUFFLENBQUNnRSxLQUFELEVBQVFGLEtBQVI7QUFBTixhQUFULENBQXpCO0FBQ0g7QUFDSixTQVZEO0FBV0gsT0FaRDtBQWFIOzs7V0FFRCx1QkFBYztBQUNWLGNBQVEsS0FBSzNELEtBQWI7QUFDSSxhQUFLLFNBQUw7QUFDSSxlQUFLUyxNQUFMLENBQVlxRCxJQUFaO0FBQ0EsZUFBS1IsTUFBTCxDQUFZMUMsT0FBWixDQUFxQixVQUFDbUQsS0FBRCxFQUFXO0FBQzVCQSxpQkFBSyxDQUFDRCxJQUFOO0FBQ0gsV0FGRDs7QUFHUjtBQUNJO0FBUEo7QUFVSDs7O1dBSUQsaUJBQVE7QUFDSixXQUFLOUQsS0FBTCxHQUFhLFNBQWI7QUFDSDs7O1dBRUQsZ0JBQU87QUFFSCxjQUFRLEtBQUtBLEtBQWI7QUFDSSxhQUFLLFNBQUw7QUFDQSxlQUFLZ0UsV0FBTDtBQUNBOztBQUNKO0FBQ0k7QUFMSjtBQU9ILEssQ0FDRDs7OztXQUNBLGdCQUFPckMsR0FBUCxFQUFZO0FBQ1JBLFNBQUcsQ0FBQ3NDLHFCQUFKLEdBQTRCLEtBQTVCOztBQUdBLGNBQVEsS0FBS2pFLEtBQWI7QUFDSSxhQUFLLFNBQUw7QUFDSTJCLGFBQUcsQ0FBQ3VDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEtBQUt0QixVQUF6QixFQUFxQyxLQUFLQyxXQUExQztBQUNBbEIsYUFBRyxDQUFDTSxTQUFKLEdBQWdCLEtBQUtnQixRQUFyQjtBQUNBdEIsYUFBRyxDQUFDd0MsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsS0FBS3ZCLFVBQXhCLEVBQW9DLEtBQUtDLFdBQXpDLEVBSEosQ0FJSTs7QUFDQSxlQUFLWSxHQUFMLENBQVM3QyxPQUFULENBQWtCLFVBQUM4QyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDOUJELGVBQUcsQ0FBQzlDLE9BQUosQ0FBYSxVQUFDZ0QsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQzVCRCxvQkFBTSxDQUFDUSxNQUFQLENBQWN6QyxHQUFkO0FBQ0gsYUFGRDtBQUdILFdBSkQsRUFMSixDQVdJOztBQUNBLGVBQUtsQixNQUFMLENBQVkyRCxNQUFaLENBQW1CekMsR0FBbkI7QUFDQSxlQUFLMkIsTUFBTCxDQUFZMUMsT0FBWixDQUFxQixVQUFDbUQsS0FBRCxFQUFXO0FBQzVCQSxpQkFBSyxDQUFDSyxNQUFOLENBQWF6QyxHQUFiO0FBQ0gsV0FGRCxFQWJKLENBa0JJOztBQUNBLGNBQUcsS0FBSzJCLE1BQUwsQ0FBWWUsS0FBWixDQUFrQixVQUFDTixLQUFEO0FBQUEsbUJBQVdBLEtBQUssQ0FBQy9ELEtBQU4sS0FBZ0IsTUFBM0I7QUFBQSxXQUFsQixDQUFILEVBQXlEO0FBQ3JELGlCQUFLc0UsYUFBTDtBQUNIOztBQUVEOztBQUNKLGFBQUssYUFBTDtBQUVJO0FBQ0EsZUFBS2IsR0FBTCxDQUFTN0MsT0FBVCxDQUFrQixVQUFDOEMsR0FBRCxFQUFNQyxLQUFOLEVBQWdCO0FBQzlCRCxlQUFHLENBQUM5QyxPQUFKLENBQWEsVUFBQ2dELE1BQUQsRUFBU0MsS0FBVCxFQUFtQjtBQUM1QkQsb0JBQU0sQ0FBQ1EsTUFBUCxDQUFjekMsR0FBZDtBQUNILGFBRkQ7QUFHSCxXQUpELEVBSEosQ0FTSTs7QUFDQSxlQUFLbEIsTUFBTCxDQUFZMkQsTUFBWixDQUFtQnpDLEdBQW5CO0FBQ0EsZUFBSzJCLE1BQUwsQ0FBWTFDLE9BQVosQ0FBcUIsVUFBQ21ELEtBQUQsRUFBVztBQUM1QkEsaUJBQUssQ0FBQ0ssTUFBTixDQUFhekMsR0FBYjtBQUNILFdBRkQ7QUFJQUEsYUFBRyxDQUFDTSxTQUFKLEdBQWlCLDBCQUFqQjtBQUNBTixhQUFHLENBQUN3QyxRQUFKLENBQWEsQ0FBQyxDQUFkLEVBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLEVBQTJCLEdBQTNCO0FBQ0F4QyxhQUFHLENBQUM0QyxVQUFKLENBQWUsQ0FBQyxFQUFoQixFQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixHQUE5QjtBQUNBNUMsYUFBRyxDQUFDTSxTQUFKLEdBQWdCLE9BQWhCO0FBQ0FOLGFBQUcsQ0FBQzZDLElBQUosR0FBVyxnQkFBWDtBQUNBN0MsYUFBRyxDQUFDOEMsUUFBSixpQkFBc0IsS0FBS2xCLGFBQTNCLEdBQTRDLEdBQTVDLEVBQWlELEdBQWpEO0FBQ0E1QixhQUFHLENBQUM2QyxJQUFKLEdBQVcsZ0JBQVg7QUFDQTdDLGFBQUcsQ0FBQzhDLFFBQUosQ0FBYSxzQkFBYixFQUFxQyxHQUFyQyxFQUEwQyxHQUExQztBQUNBOztBQUNKLGFBQUssU0FBTDtBQUVJO0FBQ0EsZUFBS2hCLEdBQUwsQ0FBUzdDLE9BQVQsQ0FBa0IsVUFBQzhDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM5QkQsZUFBRyxDQUFDOUMsT0FBSixDQUFhLFVBQUNnRCxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDNUJELG9CQUFNLENBQUNRLE1BQVAsQ0FBY3pDLEdBQWQ7QUFDSCxhQUZEO0FBR0gsV0FKRCxFQUhKLENBU0k7O0FBQ0EsZUFBS2xCLE1BQUwsQ0FBWTJELE1BQVosQ0FBbUJ6QyxHQUFuQjtBQUNBLGVBQUsyQixNQUFMLENBQVkxQyxPQUFaLENBQXFCLFVBQUNtRCxLQUFELEVBQVc7QUFDNUJBLGlCQUFLLENBQUNLLE1BQU4sQ0FBYXpDLEdBQWI7QUFDSCxXQUZEO0FBSUFBLGFBQUcsQ0FBQ00sU0FBSixHQUFpQiwwQkFBakI7QUFDQU4sYUFBRyxDQUFDd0MsUUFBSixDQUFhLENBQUMsQ0FBZCxFQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixHQUEzQjtBQUNBeEMsYUFBRyxDQUFDNEMsVUFBSixDQUFlLENBQUMsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUI7QUFDQTVDLGFBQUcsQ0FBQ00sU0FBSixHQUFnQixPQUFoQjtBQUNBTixhQUFHLENBQUM2QyxJQUFKLEdBQVcsZ0JBQVg7QUFDQTdDLGFBQUcsQ0FBQzhDLFFBQUosb0JBQWdDLEdBQWhDLEVBQXFDLEdBQXJDO0FBQ0E5QyxhQUFHLENBQUM2QyxJQUFKLEdBQVcsZ0JBQVg7QUFDQTdDLGFBQUcsQ0FBQzhDLFFBQUosQ0FBYSx3QkFBYixFQUF1QyxHQUF2QyxFQUE0QyxHQUE1QztBQUNBO0FBeEVSO0FBMEVIOzs7Ozs7QUFHTHRDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQk0sSUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztJQ3hPTWdDLFE7QUFFRixvQkFBWTNFLElBQVosRUFBa0I0QixHQUFsQixFQUF1QjtBQUFBOztBQUNuQixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLNUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBSzRFLFFBQUwsR0FBZ0IsQ0FBaEI7QUFHQSxTQUFLQyxJQUFMLEdBQVk7QUFDUkMsT0FBQyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUMsQ0FBTCxDQURLO0FBRVJDLE9BQUMsRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FGSztBQUdSQyxPQUFDLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUhLO0FBSVJDLE9BQUMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBSkssS0FBWjtBQU1ILEcsQ0FFRDs7Ozs7V0FDQSxvQkFBVztBQUFBOztBQUNQQyxZQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLTixJQUFqQixFQUF1QmhFLE9BQXZCLENBQWdDLFVBQUN1RSxDQUFELEVBQU87QUFDbkNDLFdBQUcsQ0FBQ0QsQ0FBRCxFQUFJO0FBQUEsaUJBQU0sS0FBSSxDQUFDcEYsSUFBTCxDQUFVVSxNQUFWLENBQWlCNEUsU0FBakIsQ0FBMkJGLENBQTNCLENBQU47QUFBQSxTQUFKLENBQUg7QUFDSCxPQUZEO0FBSUFDLFNBQUcsQ0FBQyxHQUFELEVBQU07QUFBQSxlQUFNLEtBQUksQ0FBQ3JGLElBQUwsQ0FBVVUsTUFBVixDQUFpQjRFLFNBQWpCLENBQTJCLEdBQTNCLENBQU47QUFBQSxPQUFOLENBQUg7QUFDQUQsU0FBRyxDQUFDLEdBQUQsRUFBTTtBQUFBLGVBQU0sS0FBSSxDQUFDckYsSUFBTCxDQUFVVSxNQUFWLENBQWlCNEUsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBTjtBQUFBLE9BQU4sQ0FBSDtBQUNBRCxTQUFHLENBQUMsT0FBRCxFQUFVO0FBQUEsZUFBTSxLQUFJLENBQUNyRixJQUFMLENBQVV1RixLQUFWLEVBQU47QUFBQSxPQUFWLENBQUg7QUFDSCxLLENBRUQ7Ozs7V0FDQSxpQkFBUTtBQUNKLFdBQUtDLFFBQUw7QUFDQUMsMkJBQXFCLENBQUMsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQUQsQ0FBckI7QUFDSDs7O1dBRUQsaUJBQVFDLElBQVIsRUFBYztBQUNWO0FBQ0EsVUFBSUMsU0FBUyxHQUFHRCxJQUFJLEdBQUcsS0FBS2hCLFFBQTVCLENBRlUsQ0FJVjs7QUFDQSxVQUFJaUIsU0FBUyxHQUFHLEtBQWhCLEVBQXVCO0FBQ25CLGFBQUs3RixJQUFMLENBQVU4RixJQUFWO0FBQ0EsYUFBSzlGLElBQUwsQ0FBVXFFLE1BQVYsQ0FBaUIsS0FBS3pDLEdBQXRCLEVBRm1CLENBSW5COztBQUNBLGFBQUtnRCxRQUFMLEdBQWdCZ0IsSUFBSSxJQUFJQyxTQUFTLEdBQUcsS0FBaEIsQ0FBcEI7QUFDSDs7QUFFREosMkJBQXFCLENBQUMsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQUQsQ0FBckI7QUFDSDs7Ozs7O0FBR0x2RCxNQUFNLENBQUNDLE9BQVAsR0FBaUJzQyxRQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbERBLElBQU1qRixLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0FBQ0EsSUFBTStDLElBQUksR0FBRy9DLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0lBR004QyxNO0FBQ0Ysa0JBQVk1QyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLFNBQUtFLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0QsR0FBTCxHQUFXRCxPQUFPLENBQUNDLEdBQW5CO0FBQ0EsU0FBS0UsSUFBTCxHQUFZSCxPQUFPLENBQUNHLElBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLGFBQWI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLEtBQUosRUFBZjtBQUNBLFNBQUtELE9BQUwsQ0FBYUUsR0FBYixHQUFtQiwwQkFBbkI7QUFFQSxTQUFLdUUsSUFBTCxHQUFZO0FBQ1JDLE9BQUMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFDLENBQUwsQ0FESztBQUVSQyxPQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBRks7QUFHUkMsT0FBQyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FISztBQUlSQyxPQUFDLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUpLLEtBQVo7QUFNSDs7OztXQUVELGFBQUljLE1BQUosRUFBVztBQUNQQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZRixNQUFaO0FBQ0EsVUFBSUcsT0FBTyxHQUFHLEtBQUtsRyxJQUFMLENBQVVRLFVBQVYsQ0FBcUJ1RixNQUFyQixDQUFkOztBQUNBLFVBQUlHLE9BQU8sWUFBWXhHLEtBQXZCLEVBQTZCO0FBQ3pCd0csZUFBTyxDQUFDQyxHQUFSO0FBQ0FILGVBQU8sQ0FBQ0MsR0FBUixDQUFZQyxPQUFPLENBQUN6RixRQUFwQjtBQUNIO0FBQ0o7OztXQUVELGNBQUsyRixPQUFMLEVBQWE7QUFDVEosYUFBTyxDQUFDQyxHQUFSLENBQVksU0FBWjtBQUNBRCxhQUFPLENBQUNDLEdBQVIsQ0FBWUcsT0FBWjtBQUNBLFVBQUlDLFFBQVEsR0FBRyxLQUFLckcsSUFBTCxDQUFVUSxVQUFWLENBQXFCNEYsT0FBckIsQ0FBZjs7QUFDQSxVQUFJQyxRQUFRLFlBQVkzRyxLQUF4QixFQUE4QjtBQUMxQixZQUFJMkcsUUFBUSxDQUFDNUYsUUFBVCxLQUFzQixDQUExQixFQUE2QjtBQUN6QixlQUFLVCxJQUFMLENBQVV1RCxNQUFWLENBQWlCMUMsT0FBakIsQ0FBMEIsVUFBQ21ELEtBQUQsRUFBVztBQUNqQyxnQkFBSXFDLFFBQVEsQ0FBQ3ZHLEdBQVQsQ0FBYSxDQUFiLE1BQW9Ca0UsS0FBSyxDQUFDbEUsR0FBTixDQUFVLENBQVYsQ0FBcEIsSUFDQXVHLFFBQVEsQ0FBQ3ZHLEdBQVQsQ0FBYSxDQUFiLE1BQW9Ca0UsS0FBSyxDQUFDbEUsR0FBTixDQUFVLENBQVYsQ0FEeEIsRUFDc0M7QUFDOUJrRSxtQkFBSyxDQUFDc0MsR0FBTjtBQUNIO0FBQ1IsV0FMRDtBQU1IOztBQUNELFlBQUlELFFBQVEsQ0FBQzVGLFFBQVQsSUFBcUIsQ0FBekIsRUFBNEI7QUFDeEI0RixrQkFBUSxDQUFDbEUsSUFBVDtBQUNBNkQsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZQyxPQUFPLENBQUN6RixRQUFwQjtBQUNIO0FBQ0o7QUFDSjs7O1dBRUQscUJBQVk7QUFDUixVQUFJOEYsVUFBVSxHQUFHLENBQUMsV0FBRCxFQUFjLGFBQWQsRUFBNkIsYUFBN0IsRUFBNEMsY0FBNUMsQ0FBakI7QUFDQSxVQUFJQyxNQUFNLEdBQUdELFVBQVUsQ0FBQ0UsT0FBWCxDQUFtQixLQUFLeEcsS0FBeEIsQ0FBYjs7QUFFQSxVQUFJdUcsTUFBTSxJQUFHLENBQWIsRUFBZ0I7QUFDWixZQUFJMUYsR0FBRyxHQUFHb0UsTUFBTSxDQUFDd0IsTUFBUCxDQUFjLEtBQUs3QixJQUFuQixFQUF5QjJCLE1BQXpCLENBQVY7QUFDQSxZQUFJRyxNQUFNLEdBQUcsQ0FBQyxLQUFLN0csR0FBTCxDQUFTLENBQVQsSUFBY2dCLEdBQUcsQ0FBQyxDQUFELENBQWxCLEVBQXVCLEtBQUtoQixHQUFMLENBQVMsQ0FBVCxJQUFjZ0IsR0FBRyxDQUFDLENBQUQsQ0FBeEMsQ0FBYjs7QUFDQSxZQUFJLEtBQUtkLElBQUwsQ0FBVWlCLGVBQVYsQ0FBMEIwRixNQUExQixDQUFKLEVBQXVDO0FBQ25DLGlCQUFPQSxNQUFQO0FBQ0g7QUFDSixPQU5ELE1BTU87QUFDSCxlQUFPLElBQVA7QUFDSDtBQUNKOzs7V0FFRCxtQkFBVXZCLENBQVYsRUFBYTtBQUNULFVBQUl3QixPQUFPLEdBQUcsRUFBZDs7QUFFQSxVQUFJLENBQUMsYUFBRCxFQUFnQixXQUFoQixFQUE2QixhQUE3QixFQUE0QyxjQUE1QyxFQUE0REMsUUFBNUQsQ0FBcUUsS0FBSzVHLEtBQTFFLENBQUosRUFBc0Y7QUFDbEYsZ0JBQVFtRixDQUFSO0FBQ0ksZUFBSyxHQUFMO0FBQ0l3QixtQkFBTyxHQUFHLENBQUMsS0FBSzlHLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQTVCLENBQVY7O0FBQ0EsZ0JBQUksS0FBS0UsSUFBTCxDQUFVUSxVQUFWLENBQXFCLENBQUMsS0FBS1YsR0FBTCxDQUFTLENBQVQsQ0FBRCxFQUFjLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBNUIsQ0FBckIsYUFBZ0VKLEtBQXBFLEVBQTBFO0FBQ3RFLG1CQUFLTyxLQUFMLEdBQWEsV0FBYjtBQUNIOztBQUNEOztBQUNKLGVBQUssR0FBTDtBQUNJMkcsbUJBQU8sR0FBRyxDQUFDLEtBQUs5RyxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWYsRUFBa0IsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBbEIsQ0FBVjs7QUFDQSxnQkFBSSxLQUFLRSxJQUFMLENBQVVRLFVBQVYsQ0FBcUJvRyxPQUFyQixhQUF5Q2xILEtBQTdDLEVBQW1EO0FBQy9DLG1CQUFLTyxLQUFMLEdBQWEsYUFBYjtBQUNIOztBQUNEOztBQUNKLGVBQUssR0FBTDtBQUNJMkcsbUJBQU8sR0FBRyxDQUFDLEtBQUs5RyxHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUE1QixDQUFWOztBQUNBLGdCQUFJLEtBQUtFLElBQUwsQ0FBVVEsVUFBVixDQUFxQm9HLE9BQXJCLGFBQXlDbEgsS0FBN0MsRUFBbUQ7QUFDL0MsbUJBQUtPLEtBQUwsR0FBYSxhQUFiO0FBQ0g7O0FBQ0Q7O0FBQ0osZUFBSyxHQUFMO0FBQ0kyRyxtQkFBTyxHQUFHLENBQUMsS0FBSzlHLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBZixFQUFrQixLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFsQixDQUFWOztBQUNBLGdCQUFJLEtBQUtFLElBQUwsQ0FBVVEsVUFBVixDQUFxQm9HLE9BQXJCLGFBQXlDbEgsS0FBN0MsRUFBbUQ7QUFDL0MsbUJBQUtPLEtBQUwsR0FBYSxjQUFiO0FBQ0g7O0FBQ0Q7O0FBQ0osZUFBSyxHQUFMO0FBQ0ksZ0JBQUkwRyxNQUFNLEdBQUcsS0FBS0csU0FBTCxFQUFiO0FBQ0EsaUJBQUtYLEdBQUwsQ0FBU1EsTUFBVDtBQUNBOztBQUNKLGVBQUssR0FBTDtBQUNJLGdCQUFJSSxPQUFPLEdBQUcsS0FBS0QsU0FBTCxFQUFkO0FBQ0EsaUJBQUszRSxJQUFMLENBQVU0RSxPQUFWO0FBQ0E7O0FBQ0o7QUFDSTtBQWxDUjtBQXFDSDtBQUVKOzs7V0FFRCxnQkFBTztBQUNILGNBQVEsS0FBSzlHLEtBQWI7QUFDSSxhQUFLLFdBQUw7QUFDSSxlQUFLRSxXQUFMLElBQW9CLENBQXBCOztBQUNBLGNBQUksS0FBS0EsV0FBTCxLQUFxQixFQUF6QixFQUE2QjtBQUN6QixpQkFBS0EsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGlCQUFLTCxHQUFMLEdBQVcsQ0FBQyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUE1QixDQUFYO0FBQ0EsaUJBQUtHLEtBQUwsR0FBYSxXQUFiO0FBQ0ErRixtQkFBTyxDQUFDQyxHQUFSLENBQVksS0FBS2hHLEtBQWpCO0FBQ0g7O0FBQ0Q7O0FBQ0osYUFBSyxhQUFMO0FBQ0ksZUFBS0UsV0FBTCxJQUFvQixDQUFwQjs7QUFDQSxjQUFJLEtBQUtBLFdBQUwsS0FBcUIsRUFBekIsRUFBNkI7QUFDekIsaUJBQUtBLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxpQkFBS0wsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUFmLEVBQWtCLEtBQUtBLEdBQUwsQ0FBUyxDQUFULENBQWxCLENBQVg7QUFDQSxpQkFBS0csS0FBTCxHQUFhLGFBQWI7QUFDQStGLG1CQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLaEcsS0FBakI7QUFDSDs7QUFDRDs7QUFDSixhQUFLLGFBQUw7QUFDSSxlQUFLRSxXQUFMLElBQW9CLENBQXBCOztBQUNBLGNBQUksS0FBS0EsV0FBTCxLQUFxQixFQUF6QixFQUE2QjtBQUN6QixpQkFBS0EsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGlCQUFLTCxHQUFMLEdBQVcsQ0FBQyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUE1QixDQUFYO0FBQ0EsaUJBQUtHLEtBQUwsR0FBYSxhQUFiO0FBQ0ErRixtQkFBTyxDQUFDQyxHQUFSLENBQVksS0FBS2hHLEtBQWpCO0FBQ0g7O0FBQ0Q7O0FBRUosYUFBSyxjQUFMO0FBQ0ksZUFBS0UsV0FBTCxJQUFvQixDQUFwQjs7QUFDQSxjQUFJLEtBQUtBLFdBQUwsS0FBcUIsRUFBekIsRUFBNkI7QUFDekIsaUJBQUtBLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxpQkFBS0wsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUFmLEVBQWtCLEtBQUtBLEdBQUwsQ0FBUyxDQUFULENBQWxCLENBQVg7QUFDQSxpQkFBS0csS0FBTCxHQUFhLGNBQWI7QUFDQStGLG1CQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLaEcsS0FBakI7QUFDSDs7QUFDRDs7QUFDSjtBQUNJO0FBdkNSO0FBeUNIOzs7V0FFRCxnQkFBTzJCLEdBQVAsRUFBWTtBQUVSLGNBQVEsS0FBSzNCLEtBQWI7QUFDSSxhQUFLLFdBQUw7QUFDSTJCLGFBQUcsQ0FBQ0UsU0FBSixDQUNJLEtBQUsxQixPQURULEVBRUksRUFGSixFQUVPLENBRlAsRUFFVTtBQUNOLFlBSEosRUFHTyxFQUhQLEVBR1c7QUFDTixlQUFLTixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBSm5CLEVBS0ssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUxuQixFQU1JLEVBTkosRUFPSSxFQVBKO0FBU0E7O0FBQ0osYUFBSyxhQUFMO0FBQ0k4QixhQUFHLENBQUNFLFNBQUosQ0FDSSxLQUFLMUIsT0FEVCxFQUVJLEVBRkosRUFFTyxDQUZQLEVBRVU7QUFDTixZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS04sR0FBTCxDQUFTLENBQVQsSUFBYyxFQUpuQixFQUtLLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFMbkIsRUFNSSxFQU5KLEVBT0ksRUFQSjtBQVNBOztBQUNKLGFBQUssYUFBTDtBQUVJOEIsYUFBRyxDQUFDRSxTQUFKLENBQ0ksS0FBSzFCLE9BRFQsRUFFSSxDQUZKLEVBRU0sQ0FGTixFQUVTO0FBQ0wsWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtOLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFJd0I7QUFDbkIsZUFBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUxuQixFQU1JLEVBTkosRUFNUSxFQU5SLENBTVc7QUFOWDtBQVFBOztBQUNKLGFBQUssY0FBTDtBQUNJOEIsYUFBRyxDQUFDRSxTQUFKLENBQ0ksS0FBSzFCLE9BRFQsRUFFSSxHQUZKLEVBRVEsQ0FGUixFQUVXO0FBQ1AsWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtOLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBTG5CLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLFdBQUw7QUFDSThCLGFBQUcsQ0FBQ0UsU0FBSixDQUNJLEtBQUsxQixPQURULEVBRUksRUFGSixFQUVPLENBRlAsRUFFVTtBQUNOLFlBSEosRUFHTyxFQUhQLEVBR1c7QUFDTixlQUFLTixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBSm5CLEVBS0ssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUtLLFdBQUwsSUFBb0IsS0FBRyxFQUF2QixDQUwxQixFQU1JLEVBTkosRUFPSSxFQVBKO0FBU0E7O0FBQ0osYUFBSyxhQUFMO0FBQ0l5QixhQUFHLENBQUNFLFNBQUosQ0FDSSxLQUFLMUIsT0FEVCxFQUVJLEVBRkosRUFFTyxDQUZQLEVBRVU7QUFDTixZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS04sR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUtLLFdBQUwsSUFBb0IsS0FBRyxFQUF2QixDQUoxQixFQUtLLEtBQUtMLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFMbkIsRUFNSSxFQU5KLEVBT0ksRUFQSjtBQVNBOztBQUNKLGFBQUssYUFBTDtBQUNJOEIsYUFBRyxDQUFDRSxTQUFKLENBQ0ksS0FBSzFCLE9BRFQsRUFFSSxFQUZKLEVBRU8sQ0FGUCxFQUVVO0FBQ04sWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtOLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBTDFCLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLGNBQUw7QUFDSXlCLGFBQUcsQ0FBQ0UsU0FBSixDQUNJLEtBQUsxQixPQURULEVBRUksR0FGSixFQUVRLENBRlIsRUFFVztBQUNQLFlBSEosRUFHTyxFQUhQLEVBR1c7QUFDTixlQUFLTixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBSjFCLEVBS0ssS0FBS0wsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUxuQixFQU1JLEVBTkosRUFPSSxFQVBKO0FBU0E7O0FBQ0o7QUFDSTtBQTFGUjtBQTRGSDs7Ozs7O0FBR0xzQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJJLE1BQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3UE1ILEk7QUFDRixnQkFBWXpDLE9BQVosRUFBcUI7QUFBQTs7QUFFakIsU0FBS0MsR0FBTCxHQUFXRCxPQUFPLENBQUNDLEdBQW5CO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLFNBQWI7QUFFSDs7OztXQUVELGdCQUFPNkIsR0FBUCxFQUFZO0FBQ1JBLFNBQUcsQ0FBQ00sU0FBSixHQUFnQixLQUFLbkMsS0FBckI7QUFDQTZCLFNBQUcsQ0FBQ3dDLFFBQUosQ0FDSyxLQUFLdEUsR0FBTCxDQUFTLENBQVQsSUFBYyxFQURuQixFQUVLLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFGbkIsRUFHSSxFQUhKLEVBSUksRUFKSjtBQU1IOzs7Ozs7QUFHTHNDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsSUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkEsSUFBTUEsSUFBSSxHQUFHM0MsbUJBQU8sQ0FBQyw2QkFBRCxDQUFwQjs7SUFFTStDLEk7Ozs7O0FBQ0YsZ0JBQVk3QyxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxPQUFOO0FBQ0EsVUFBS0UsS0FBTCxHQUFhLFNBQWI7QUFDQSxVQUFLSyxPQUFMLEdBQWUsSUFBSUMsS0FBSixFQUFmO0FBQ0EsVUFBS0QsT0FBTCxDQUFhRSxHQUFiLEdBQW1CLHNCQUFuQjtBQUppQjtBQUtwQjs7OztXQUVELGdCQUFPc0IsR0FBUCxFQUFZO0FBR1JBLFNBQUcsQ0FBQ0UsU0FBSixDQUNJLEtBQUsxQixPQURULEVBRUksQ0FGSixFQUVNLENBRk4sRUFHSSxFQUhKLEVBR08sRUFIUCxFQUlLLEtBQUtOLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBTG5CLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTSDs7OztFQXBCY3dDLEk7O0FBdUJuQkYsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSyxJQUFqQixDOzs7Ozs7Ozs7Ozs7QUN6QkE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHaEQsbUJBQU8sQ0FBQyw2QkFBRCxDQUFwQjs7QUFDQSxJQUFNZ0YsUUFBUSxHQUFHaEYsbUJBQU8sQ0FBQyx1Q0FBRCxDQUF4Qjs7QUFFQXFILFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDckQ7QUFDQSxNQUFJQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixhQUF4QixDQUFiO0FBQ0EsTUFBSXZGLEdBQUcsR0FBR3NGLE1BQU0sQ0FBQ0UsVUFBUCxDQUFrQixJQUFsQixDQUFWLENBSHFELENBSXJEOztBQUVBLE1BQUlwSCxJQUFJLEdBQUcsSUFBSTJDLElBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsQ0FBWDtBQUNBdUUsUUFBTSxDQUFDRyxLQUFQLEdBQWVySCxJQUFJLENBQUM2QyxVQUFwQjtBQUNBcUUsUUFBTSxDQUFDSSxNQUFQLEdBQWdCdEgsSUFBSSxDQUFDOEMsV0FBckI7QUFFQSxNQUFJNkIsUUFBSixDQUFhM0UsSUFBYixFQUFtQjRCLEdBQW5CLEVBQXdCMkQsS0FBeEI7QUFFSCxDQVpELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5cbmNsYXNzIEFsaWVuIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5zcmMgPSAnYXNzZXRzL2FsaWVuLXNwcml0ZS5wbmcnO1xuICAgIH1cblxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiREVBRFwiO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgaWYgKG1hcFRpbGUgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGSUxMSU5HX1RSQVBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXBUaWxlLmRpZ0xldmVsID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiVFJBUFBFRFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA9PT0gdGhpcy5nYW1lLnBsYXllci5wb3NbMF0gJiZcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3RhdGUgPSBcIkRFQURcIjtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBkZWNpZGVOZXdTdGF0ZSgpIHtcbiAgICAgICAgLy9yYW5kb21seSBjaG9vc2UgZGlyZWN0aW9uXG4gICAgICAgIGxldCBkaXJzID0gW1xuICAgICAgICAgICAgWyAwLCAtMV0sIC8vdXBcbiAgICAgICAgICAgIFstMSwgIDBdLCAvL2xlZnRcbiAgICAgICAgICAgIFsgMCwgIDFdLCAgLy9kb3duXG4gICAgICAgICAgICBbIDEsICAwXSAgIC8vcmlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgbGVnYWxEaXJJZHhzID0gW107XG4gICAgICAgIC8vZ2V0IHJpZCBvZiBpbGxlZ2FsIHBvc2l0aW9uc1xuICAgICAgICBkaXJzLmZvckVhY2goKGRpciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3UG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKG5ld1BvcykpIHtcbiAgICAgICAgICAgICAgICBsZWdhbERpcklkeHMucHVzaChpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBmbG9vckRpcklkeHMgPSBbXTtcbiAgICAgICAgbGVnYWxEaXJJZHhzLmZvckVhY2goKGRpcmlkeCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3UG9zID0gW3RoaXMucG9zWzBdICsgZGlyc1tkaXJpZHhdWzBdLCB0aGlzLnBvc1sxXSArIGRpcnNbZGlyaWR4XVsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXdQb3MpIGluc3RhbmNlb2YgRmxvb3IpIHtcbiAgICAgICAgICAgICAgICBmbG9vckRpcklkeHMucHVzaChkaXJpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vZ2V0IHJhbmRvbSBtb3ZlXG4gICAgICAgIGxldCBpbmRleCA9IGZsb29yRGlySWR4c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmbG9vckRpcklkeHMubGVuZ3RoKV07XG5cbiAgICAgICAgbGV0IG5ld1N0YXRlID0gXCJcIjtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXSBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZSh0aGlzLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFRpbGUuZGlnTGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUUkFQUEVEXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNjApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgbGV0IHhvZmZzZXQgPSAwO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA+IDgpIHtcbiAgICAgICAgICAgIHhvZmZzZXQgPSAxNjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHhvZmZzZXQsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICB4b2Zmc2V0LCAwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgeG9mZnNldCwgMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG5cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHhvZmZzZXQsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZJTExJTkdfVFJBUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDMyLCAwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWxpZW47IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBGbG9vciBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzFhOTM2ZlwiXG4gICAgICAgIHRoaXMuZGlnTGV2ZWwgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdhc3NldHMvbWFwLXRpbGVzLnBuZyc7XG4gICAgfVxuXG4gICAgZmlsbCgpIHtcblxuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ0xldmVsIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlnKCkge1xuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpZ0xldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG5cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2LDAsXG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2LDAsXG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNiwwLFxuICAgICAgICAgICAgICAgICAgICAxNiwxNixcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgIDY0LFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbG9vcjsiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5jb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5jb25zdCBBbGllbiA9IHJlcXVpcmUoXCIuL2FsaWVuXCIpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJwb3MpIHtcbiAgICAgICAgdGhpcy5WSUVXX1dJRFRIID0gNjQwO1xuICAgICAgICB0aGlzLlZJRVdfSEVJR0hUID0gNTc2O1xuICAgICAgICB0aGlzLldJRFRIID0gMTA7XG4gICAgICAgIHRoaXMuSEVJR0hUID0gOTtcbiAgICAgICAgdGhpcy5GUFMgPSA2MDtcbiAgICAgICAgdGhpcy5CR19DT0xPUiA9IFwiI2ZmNTczM1wiO1xuXG4gICAgICAgIHRoaXMubGV2ZWwxID0gW1xuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDEsMSwwLDFdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMSwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDEsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzAsMSwwLDEsMCwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwxLDEsMCwwLDAsMCwwLDBdLFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMubGV2ZWwyID0gW1xuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDEsMSwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDFdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMSwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDEsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzAsMSwwLDEsMCwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwxLDEsMCwwLDAsMCwwLDBdLFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMubGV2ZWwzID0gW1xuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDEsMSwwLDFdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMSwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDEsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzAsMSwwLDEsMCwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwxLDEsMCwwLDAsMCwwLDBdLFxuICAgICAgICBdO1xuXG5cbiAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5sZXZlbDEpO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogcGxheWVycG9zIH0pO1xuICAgICAgICB0aGlzLmFsaWVucyA9IFtcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbMCwgOF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNCwgNF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNSwgNV19KVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIkxFVkVMX1NUQVJUXCI7XG4gICAgICAgIHRoaXMuY3VycmVudF9sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMubGV2ZWxzID0gW3RoaXMubGV2ZWwxLCB0aGlzLmxldmVsMiwgdGhpcy5sZXZlbDNdO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IFtdO1xuICAgIH1cblxuICAgIGdvVG9OZXh0TGV2ZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfbGV2ZWwgPCAzKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfbGV2ZWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuYWRkTWFwKHRoaXMubGV2ZWxzW3RoaXMuY3VycmVudF9sZXZlbCAtMV0pO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtnYW1lOiB0aGlzLCBwb3M6IFswLDBdIH0pO1xuICAgICAgICAgICAgdGhpcy5hbGllbnMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNCwgNF19KSxcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzUsIDVdfSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1BSU5fTUVOVVwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBbIGhvcml6b250YWwsIHZlcnRpY2FsIF1cbiAgICBnZXRNYXBUaWxlKHBvcykge1xuICAgICAgICBpZihwb3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFtwb3NbMV1dW3Bvc1swXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRydWUgaWYgcG9zIGlzIG9uIHRoZSBib2FyZCwgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAgaXNMZWdhbFBvc2l0aW9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBpZiggcG9zWzBdID49IDAgJiYgcG9zWzBdIDwgdGhpcy5tYXBbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwb3NbMV0gPj0gMCAmJiBwb3NbMV0gPCB0aGlzLm1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2dpdmVuIGEgZ3JpZCwgc2V0IHRoaXMuZ3JpZCB0byBhbiBhcnJheSBvZiB0aGUgY2xhc3Nlc1xuICAgIGFkZE1hcChtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDAgaXMgZmxvb3JcbiAgICAgICAgICAgICAgICBpZiAoc3F1YXJlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IEZsb29yKHtwb3M6IFtjb2xfaSwgcm93X2ldfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8xIGlzIHdhbGxcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNxdWFyZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IFdhbGwoe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1vdmVPYmplY3RzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiOlxuICAgICAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3JlbmRlciB0aGUgY3VycmVudCBnYW1lc3RhdGVcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuQkdfQ09MT1I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBhY3RvcnNcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4ucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgYWxsIGFsaWVucyBhcmUgZGVmZWF0ZWRcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFsaWVucy5ldmVyeSgoYWxpZW4pID0+IGFsaWVuLnN0YXRlID09PSBcIkRFQURcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvTmV4dExldmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxFVkVMX1NUQVJUXCI6XG5cbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgbWFwXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUucmVuZGVyKGN0eCk7ICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIGFjdG9yc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgPSAncmdiYSgyNDAsIDI0MiwgMjQ1LCAwLjcpJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoLTUsIDE1MCwgNzAwLCAxNjApO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KC01MCwgMTUwLCA3MDAsIDE2MCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjQwcHggTm90byBTYW5zXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGBMZXZlbCAke3RoaXMuY3VycmVudF9sZXZlbH1gLCAxNTAsIDIyMCk7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjIwcHggTm90byBTYW5zXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiUHJlc3MgRW50ZXIgdG8gc3RhcnRcIiwgMTUwLCAyNzApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlZJQ1RPUllcIjpcblxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5yZW5kZXIoY3R4KTsgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgYWN0b3JzXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICA9ICdyZ2JhKDI0MCwgMjQyLCAyNDUsIDAuNyknO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgtNSwgMTUwLCA3MDAsIDE2MCk7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoLTUwLCAxNTAsIDcwMCwgMTYwKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiNDBweCBOb3RvIFNhbnNcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoYENPTkdSQVRVTEFUSU9OU2AsIDE1MCwgMjIwKTtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMjBweCBOb3RvIFNhbnNcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJUaGFuayB5b3UgZm9yIHBsYXlpbmchXCIsIDE1MCwgMjcwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIEdhbWVWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gXG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYmluZCBrZXlzIHRvIG1vdmVzXG4gICAgYmluZEtleXMoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuRElSUykuZm9yRWFjaCggKGspID0+IHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGtleShrLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShrKSlcbiAgICAgICAgfSlcblxuICAgICAgICBrZXkoXCJrXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwia1wiKSk7XG4gICAgICAgIGtleShcImpcIiwgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoXCJqXCIpKTtcbiAgICAgICAga2V5KFwiZW50ZXJcIiwgKCkgPT4gdGhpcy5nYW1lLnN0YXJ0KCkpO1xuICAgIH1cblxuICAgIC8vcnVuIHRoZSBnYW1lXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYmluZEtleXMoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgYW5pbWF0ZSh0aW1lKSB7XG4gICAgICAgIC8vY2hhbmdlIGluIHRpbWUgaXMgY3VycmVudCB0aW1lIC0gbGFzdCB0aW1lXG4gICAgICAgIGxldCB0aW1lRGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcblxuICAgICAgICAvL2lmIHRpbWUgaGFzIGNoYW5nZWQgbW9yZSB0aGFuIDE2IG1zXG4gICAgICAgIGlmICh0aW1lRGVsdGEgPiAxNi42Nikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0ZXAoKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcy5jdHgpO1xuXG4gICAgICAgICAgICAvL2xhc3RUaW1lIGlzIGN1cnJlbnQgdGltZVxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWUgKyAodGltZURlbHRhIC0gMTYuNjYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVZpZXc7IiwiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcbmNvbnN0IFdhbGwgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xuXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9jaGliaS1sYXllcmVkLnBuZyc7XG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZyhkaWdwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRJR0dJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpZ3Bvcyk7XG4gICAgICAgIGxldCBkaWdUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZGlncG9zKTtcbiAgICAgICAgaWYgKGRpZ1RpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBkaWdUaWxlLmRpZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGlnVGlsZS5kaWdMZXZlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxsKGZpbGxwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZJTExJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGxwb3MpO1xuICAgICAgICBsZXQgZmlsbFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShmaWxscG9zKTtcbiAgICAgICAgaWYgKGZpbGxUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGxUaWxlLnBvc1swXSA9PT0gYWxpZW4ucG9zWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGlsZS5wb3NbMV0gPT09IGFsaWVuLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWVuLmRpZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPj0gMSkge1xuICAgICAgICAgICAgICAgIGZpbGxUaWxlLmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERpZ1BvcygpIHtcbiAgICAgICAgbGV0IGRpcnNTdGF0ZXMgPSBbXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1JJR0hUXCJdO1xuICAgICAgICBsZXQgZGlySWR4ID0gZGlyc1N0YXRlcy5pbmRleE9mKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmIChkaXJJZHggPj0wKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gT2JqZWN0LnZhbHVlcyh0aGlzLkRJUlMpW2RpcklkeF07XG4gICAgICAgICAgICBsZXQgZGlnUG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKGRpZ1BvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRfc3RhdGUoaykge1xuICAgICAgICBsZXQgbmV4dFBvcyA9IFtdO1xuXG4gICAgICAgIGlmIChbXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX1JJR0hUXCJdLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV0pIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwia1wiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlnUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWcoZGlnUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImpcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGxQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGwoZmlsbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAzMiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCAvLyBvZmZzZXQgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCA2NCAvLyBzaXplIG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNDQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA4MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA2NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDQ4LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNjAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzIyMjIyMlwiXG5cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGU7IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBXYWxsIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzExNGI1ZlwiXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9tYXAtdGlsZXMucG5nJztcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgMCwwLFxuICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksXG4gICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICA2NCxcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy9jYW52YXMgcmVzZWFyY2hcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIC8vc2V0IHVwIGdhbWVcblxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoWzAsMF0pO1xuICAgIGNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZ2FtZS5WSUVXX0hFSUdIVDtcblxuICAgIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgpLnN0YXJ0KCk7XG5cbn0pO1xuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
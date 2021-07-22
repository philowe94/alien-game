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
    this.sprites.src = 'https://philowe94.github.io/heiankyo-alien/assets/alien-sprite.png';
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
      switch (this.state) {
        case "MOVING_UP":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2 - this.state_timer * (64 / 16), 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.drawImage(this.sprites, 32, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case "MOVING_LEFT":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2 - this.state_timer * (64 / 16), this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case "MOVING_DOWN":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2 + this.state_timer * (64 / 16), 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case "MOVING_RIGHT":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2 + this.state_timer * (64 / 16), this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case "FILLING_TRAP":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          break;

        case "TRAPPED":
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.fillStyle = this.color;
          ctx.fill();
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
          ctx.fillStyle = this.color;
          ctx.fillRect(this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case 1:
          ctx.fillStyle = this.color;
          ctx.fillRect(this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          ctx.beginPath();
          ctx.arc(this.pos[0] * 64 + 64 / 2, this.pos[1] * 64 + 64 / 2, 20, 2 * Math.PI, false);
          ctx.lineWidth = 1;
          ctx.fillStyle = "#ffffff";
          ctx.stroke();
          break;

        case 2:
          ctx.fillStyle = this.color;
          ctx.fillRect(this.pos[0] * 64, this.pos[1] * 64, 64, 64);
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
    this.map = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]];
    this.addMap(this.map);
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
    this.STATE = "MAIN_MENU";
  }

  _createClass(Game, [{
    key: "gameOver",
    value: function gameOver() {
      this.player = [];
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
          });
          break;

        default:
          ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
          ctx.font = "20px Georgia";
          ctx.fillText("Press Enter to start the game", 10, 50);
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
    this.sprites.src = 'https://philowe94.github.io/heiankyo-alien/assets/chibi-layered.png';
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
    return _this;
  }

  _createClass(Wall, [{
    key: "render",
    value: function render(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0] * 64, this.pos[1] * 64, 64, 64);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImRpcnMiLCJsZWdhbERpcklkeHMiLCJmb3JFYWNoIiwiZGlyIiwiaWR4IiwibmV3UG9zIiwiaXNMZWdhbFBvc2l0aW9uIiwicHVzaCIsImZsb29yRGlySWR4cyIsImRpcmlkeCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3U3RhdGUiLCJjaGVja0NvbGxpc2lvbiIsImN0eCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbFN0eWxlIiwiZmlsbCIsImRyYXdJbWFnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJUaWxlIiwiZmlsbFJlY3QiLCJsaW5lV2lkdGgiLCJzdHJva2UiLCJQbGF5ZXIiLCJXYWxsIiwiR2FtZSIsInBsYXllcnBvcyIsIlZJRVdfV0lEVEgiLCJWSUVXX0hFSUdIVCIsIldJRFRIIiwiSEVJR0hUIiwiRlBTIiwiQkdfQ09MT1IiLCJtYXAiLCJhZGRNYXAiLCJhbGllbnMiLCJTVEFURSIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImNsZWFyUmVjdCIsInJlbmRlciIsImZvbnQiLCJmaWxsVGV4dCIsIkdhbWVWaWV3IiwibGFzdFRpbWUiLCJESVJTIiwidyIsImEiLCJzIiwiZCIsIk9iamVjdCIsImtleXMiLCJrIiwia2V5Iiwic2V0X3N0YXRlIiwic3RhcnQiLCJiaW5kS2V5cyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFuaW1hdGUiLCJiaW5kIiwidGltZSIsInRpbWVEZWx0YSIsInN0ZXAiLCJkaWdwb3MiLCJjb25zb2xlIiwibG9nIiwiZGlnVGlsZSIsImRpZyIsImZpbGxwb3MiLCJmaWxsVGlsZSIsImRpZSIsImRpcnNTdGF0ZXMiLCJkaXJJZHgiLCJpbmRleE9mIiwidmFsdWVzIiwiZGlnUG9zIiwibmV4dFBvcyIsImluY2x1ZGVzIiwiZ2V0RGlnUG9zIiwiZmlsbFBvcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1DLEs7QUFDRixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQyxHQUFMLEdBQVdELE9BQU8sQ0FBQ0MsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEs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eEIsQ0FBYjtBQUNBLE1BQUk5RSxHQUFHLEdBQUc2RSxNQUFNLENBQUNFLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVixDQUhxRCxDQUtyRDs7QUFFQSxNQUFJM0csSUFBSSxHQUFHLElBQUkyQyxJQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULENBQVg7QUFDQThELFFBQU0sQ0FBQ0csS0FBUCxHQUFlNUcsSUFBSSxDQUFDNkMsVUFBcEI7QUFDQTRELFFBQU0sQ0FBQ0ksTUFBUCxHQUFnQjdHLElBQUksQ0FBQzhDLFdBQXJCO0FBRUEsTUFBSW9CLFFBQUosQ0FBYWxFLElBQWIsRUFBbUI0QixHQUFuQixFQUF3QmtELEtBQXhCO0FBRUgsQ0FiRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuXG5jbGFzcyBBbGllbiB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2h0dHBzOi8vcGhpbG93ZTk0LmdpdGh1Yi5pby9oZWlhbmt5by1hbGllbi9hc3NldHMvYWxpZW4tc3ByaXRlLnBuZyc7XG4gICAgfVxuXG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJERUFEXCI7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICBpZiAobWFwVGlsZSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICBpZiAobWFwVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZJTExJTkdfVFJBUFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJUUkFQUEVEXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1swXSAmJlxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPT09IHRoaXMuZ2FtZS5wbGF5ZXIucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zdGF0ZSA9IFwiREVBRFwiO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGRlY2lkZU5ld1N0YXRlKCkge1xuICAgICAgICAvL3JhbmRvbWx5IGNob29zZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbIDAsIC0xXSwgLy91cFxuICAgICAgICAgICAgWy0xLCAgMF0sIC8vbGVmdFxuICAgICAgICAgICAgWyAwLCAgMV0sICAvL2Rvd25cbiAgICAgICAgICAgIFsgMSwgIDBdICAgLy9yaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBsZWdhbERpcklkeHMgPSBbXTtcbiAgICAgICAgLy9nZXQgcmlkIG9mIGlsbGVnYWwgcG9zaXRpb25zXG4gICAgICAgIGRpcnMuZm9yRWFjaCgoZGlyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24obmV3UG9zKSkge1xuICAgICAgICAgICAgICAgIGxlZ2FsRGlySWR4cy5wdXNoKGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGZsb29yRGlySWR4cyA9IFtdO1xuICAgICAgICBsZWdhbERpcklkeHMuZm9yRWFjaCgoZGlyaWR4LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJzW2RpcmlkeF1bMF0sIHRoaXMucG9zWzFdICsgZGlyc1tkaXJpZHhdWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5ld1BvcykgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgICAgIGZsb29yRGlySWR4cy5wdXNoKGRpcmlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9nZXQgcmFuZG9tIG1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gZmxvb3JEaXJJZHhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZsb29yRGlySWR4cy5sZW5ndGgpXTtcblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGlsZS5kaWdMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAzMiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMikgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFJBUFBFRFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWxpZW47IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBGbG9vciBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzFhOTM2ZlwiXG4gICAgICAgIHRoaXMuZGlnTGV2ZWwgPSAwO1xuXG4gICAgfVxuXG4gICAgZmlsbCgpIHtcblxuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ0xldmVsIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlnKCkge1xuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpZ0xldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmxvb3I7IiwiY29uc3QgUGxheWVyID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xuY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcbmNvbnN0IFdhbGwgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xuY29uc3QgQWxpZW4gPSByZXF1aXJlKFwiLi9hbGllblwiKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IocGxheWVycG9zKSB7XG4gICAgICAgIHRoaXMuVklFV19XSURUSCA9IDY0MDtcbiAgICAgICAgdGhpcy5WSUVXX0hFSUdIVCA9IDU3NjtcbiAgICAgICAgdGhpcy5XSURUSCA9IDEwO1xuICAgICAgICB0aGlzLkhFSUdIVCA9IDk7XG4gICAgICAgIHRoaXMuRlBTID0gNjA7XG4gICAgICAgIHRoaXMuQkdfQ09MT1IgPSBcIiNmZjU3MzNcIjtcblxuICAgICAgICB0aGlzLm1hcCA9IFtcbiAgICAgICAgICAgIFswLDEsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDEsMCwwLDAsMCwxLDEsMCwxXSxcbiAgICAgICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDEsMSwxLDAsMCwwXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMSwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMCwxLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFswLDEsMCwxLDAsMSwxLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMCwwLDAsMSwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMSwxLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5tYXApO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogcGxheWVycG9zIH0pO1xuICAgICAgICB0aGlzLmFsaWVucyA9IFtcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbMCwgOF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNCwgNF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNSwgNV19KVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuU1RBVEUgPSBcIk1BSU5fTUVOVVwiO1xuXG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gW107XG4gICAgfVxuXG4gICAgLy8gWyBob3Jpem9udGFsLCB2ZXJ0aWNhbCBdXG4gICAgZ2V0TWFwVGlsZShwb3MpIHtcbiAgICAgICAgaWYocG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBbcG9zWzFdXVtwb3NbMF1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0cnVlIGlmIHBvcyBpcyBvbiB0aGUgYm9hcmQsIGZhbHNlIGlmIG90aGVyd2lzZVxuICAgIGlzTGVnYWxQb3NpdGlvbihwb3MpIHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgaWYoIHBvc1swXSA+PSAwICYmIHBvc1swXSA8IHRoaXMubWFwWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICggcG9zWzFdID49IDAgJiYgcG9zWzFdIDwgdGhpcy5tYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9naXZlbiBhIGdyaWQsIHNldCB0aGlzLmdyaWQgdG8gYW4gYXJyYXkgb2YgdGhlIGNsYXNzZXNcbiAgICBhZGRNYXAobWFwKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuXG4gICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAwIGlzIGZsb29yXG4gICAgICAgICAgICAgICAgaWYgKHNxdWFyZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBGbG9vcih7cG9zOiBbY29sX2ksIHJvd19pXX0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vMSBpcyB3YWxsXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcXVhcmUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBXYWxsKHtwb3M6IFtjb2xfaSwgcm93X2ldfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBtb3ZlT2JqZWN0cygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4ubW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG5cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgIHRoaXMubW92ZU9iamVjdHMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9yZW5kZXIgdGhlIGN1cnJlbnQgZ2FtZXN0YXRlXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuQkdfQ09MT1I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBhY3RvcnNcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4ucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjIwcHggR2VvcmdpYVwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlByZXNzIEVudGVyIHRvIHN0YXJ0IHRoZSBnYW1lXCIsIDEwLCA1MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjbGFzcyBHYW1lVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuIFxuXG4gICAgICAgIHRoaXMuRElSUyA9IHtcbiAgICAgICAgICAgIHc6IFswLCAtMV0sXG4gICAgICAgICAgICBhOiBbLTEsIDBdLFxuICAgICAgICAgICAgczogWzAsIDFdLFxuICAgICAgICAgICAgZDogWzEsIDBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JpbmQga2V5cyB0byBtb3Zlc1xuICAgIGJpbmRLZXlzKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLkRJUlMpLmZvckVhY2goIChrKSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXkoaywgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoaykpXG4gICAgICAgIH0pXG5cbiAgICAgICAga2V5KFwia1wiLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShcImtcIikpO1xuICAgICAgICBrZXkoXCJqXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwialwiKSk7XG4gICAgICAgIGtleShcImVudGVyXCIsICgpID0+IHRoaXMuZ2FtZS5zdGFydCgpKTtcbiAgICB9XG5cbiAgICAvL3J1biB0aGUgZ2FtZVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmJpbmRLZXlzKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUodGltZSkge1xuICAgICAgICAvL2NoYW5nZSBpbiB0aW1lIGlzIGN1cnJlbnQgdGltZSAtIGxhc3QgdGltZVxuICAgICAgICBsZXQgdGltZURlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG5cbiAgICAgICAgLy9pZiB0aW1lIGhhcyBjaGFuZ2VkIG1vcmUgdGhhbiAxNiBtc1xuICAgICAgICBpZiAodGltZURlbHRhID4gMTYuNjYpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUucmVuZGVyKHRoaXMuY3R4KTtcblxuICAgICAgICAgICAgLy9sYXN0VGltZSBpcyBjdXJyZW50IHRpbWVcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lICsgKHRpbWVEZWx0YSAtIDE2LjY2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsImNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcblxuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiO1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdodHRwczovL3BoaWxvd2U5NC5naXRodWIuaW8vaGVpYW5reW8tYWxpZW4vYXNzZXRzL2NoaWJpLWxheWVyZWQucG5nJztcblxuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlnKGRpZ3Bvcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRElHR0lOR1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGlncG9zKTtcbiAgICAgICAgbGV0IGRpZ1RpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShkaWdwb3MpO1xuICAgICAgICBpZiAoZGlnVGlsZSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgIGRpZ1RpbGUuZGlnKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbGwoZmlsbHBvcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRklMTElOR1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZmlsbHBvcyk7XG4gICAgICAgIGxldCBmaWxsVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKGZpbGxwb3MpO1xuICAgICAgICBpZiAoZmlsbFRpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsbFRpbGUucG9zWzBdID09PSBhbGllbi5wb3NbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxUaWxlLnBvc1sxXSA9PT0gYWxpZW4ucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZW4uZGllKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWxsVGlsZS5kaWdMZXZlbCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgZmlsbFRpbGUuZmlsbCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZ1RpbGUuZGlnTGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGlnUG9zKCkge1xuICAgICAgICBsZXQgZGlyc1N0YXRlcyA9IFtcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX0RPV05cIiwgXCJGQUNJTkdfUklHSFRcIl07XG4gICAgICAgIGxldCBkaXJJZHggPSBkaXJzU3RhdGVzLmluZGV4T2YodGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKGRpcklkeCA+PTApIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSBPYmplY3QudmFsdWVzKHRoaXMuRElSUylbZGlySWR4XTtcbiAgICAgICAgICAgIGxldCBkaWdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24oZGlnUG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaWdQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldF9zdGF0ZShrKSB7XG4gICAgICAgIGxldCBuZXh0UG9zID0gW107XG5cbiAgICAgICAgaWYgKFtcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1VQXCIsIFwiRkFDSU5HX0xFRlRcIiwgXCJGQUNJTkdfUklHSFRcIl0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ3XCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXSkgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYVwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV0gXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkXCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJrXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWdQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpZyhkaWdQb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwialwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbFBvcyA9IHRoaXMuZ2V0RGlnUG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbChmaWxsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19VUFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDMyLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIC8vIG9mZnNldCBvbiBjYW52YXNcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIDY0IC8vIHNpemUgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE0NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDgwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDY0LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgNDgsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMjIyMjIyXCJcblxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgNjRcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZTsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIFdhbGwgZXh0ZW5kcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMTE0YjVmXCJcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy9jYW52YXMgcmVzZWFyY2hcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy9zZXQgdXAgZ2FtZVxuXG4gICAgbGV0IGdhbWUgPSBuZXcgR2FtZShbMCwwXSk7XG4gICAgY2FudmFzLndpZHRoID0gZ2FtZS5WSUVXX1dJRFRIO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBnYW1lLlZJRVdfSEVJR0hUO1xuXG4gICAgbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCkuc3RhcnQoKTtcblxufSk7XG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
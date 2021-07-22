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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImRpcnMiLCJsZWdhbERpcklkeHMiLCJmb3JFYWNoIiwiZGlyIiwiaWR4IiwibmV3UG9zIiwiaXNMZWdhbFBvc2l0aW9uIiwicHVzaCIsImZsb29yRGlySWR4cyIsImRpcmlkeCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3U3RhdGUiLCJjaGVja0NvbGxpc2lvbiIsImN0eCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbFN0eWxlIiwiZmlsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJUaWxlIiwiZmlsbFJlY3QiLCJsaW5lV2lkdGgiLCJzdHJva2UiLCJQbGF5ZXIiLCJXYWxsIiwiR2FtZSIsInBsYXllcnBvcyIsIlZJRVdfV0lEVEgiLCJWSUVXX0hFSUdIVCIsIldJRFRIIiwiSEVJR0hUIiwiRlBTIiwiQkdfQ09MT1IiLCJtYXAiLCJhZGRNYXAiLCJhbGllbnMiLCJTVEFURSIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImNsZWFyUmVjdCIsInJlbmRlciIsImZvbnQiLCJmaWxsVGV4dCIsIkdhbWVWaWV3IiwibGFzdFRpbWUiLCJESVJTIiwidyIsImEiLCJzIiwiZCIsIk9iamVjdCIsImtleXMiLCJrIiwia2V5Iiwic2V0X3N0YXRlIiwic3RhcnQiLCJiaW5kS2V5cyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFuaW1hdGUiLCJiaW5kIiwidGltZSIsInRpbWVEZWx0YSIsInN0ZXAiLCJkaWdwb3MiLCJjb25zb2xlIiwibG9nIiwiZGlnVGlsZSIsImRpZyIsImZpbGxwb3MiLCJmaWxsVGlsZSIsImRpZSIsImRpcnNTdGF0ZXMiLCJkaXJJZHgiLCJpbmRleE9mIiwidmFsdWVzIiwiZGlnUG9zIiwibmV4dFBvcyIsImluY2x1ZGVzIiwiZ2V0RGlnUG9zIiwiZmlsbFBvcyIsImRyYXdJbWFnZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1DLEs7QUFDRixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQyxHQUFMLEdBQVdELE9BQU8sQ0FBQ0MsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEs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LElBQUksQ0FBQzRDLFVBQXBCO0FBQ0E2RCxRQUFNLENBQUNJLE1BQVAsR0FBZ0I3RyxJQUFJLENBQUM2QyxXQUFyQjtBQUVBLE1BQUlvQixRQUFKLENBQWFqRSxJQUFiLEVBQW1CNEIsR0FBbkIsRUFBd0JpRCxLQUF4QjtBQUVILENBYkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcblxuY2xhc3MgQWxpZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdodHRwczovL3BoaWxvd2U5NC5naXRodWIuaW8vaGVpYW5reW8tYWxpZW4vYXNzZXRzL2FsaWVuLXNwcml0ZS5wbmcnO1xuXG4gICAgfVxuXG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJERUFEXCI7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICBpZiAobWFwVGlsZSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICBpZiAobWFwVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZJTExJTkdfVFJBUFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJUUkFQUEVEXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1swXSAmJlxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPT09IHRoaXMuZ2FtZS5wbGF5ZXIucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zdGF0ZSA9IFwiREVBRFwiO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGRlY2lkZU5ld1N0YXRlKCkge1xuICAgICAgICAvL3JhbmRvbWx5IGNob29zZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbIDAsIC0xXSwgLy91cFxuICAgICAgICAgICAgWy0xLCAgMF0sIC8vbGVmdFxuICAgICAgICAgICAgWyAwLCAgMV0sICAvL2Rvd25cbiAgICAgICAgICAgIFsgMSwgIDBdICAgLy9yaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBsZWdhbERpcklkeHMgPSBbXTtcbiAgICAgICAgLy9nZXQgcmlkIG9mIGlsbGVnYWwgcG9zaXRpb25zXG4gICAgICAgIGRpcnMuZm9yRWFjaCgoZGlyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24obmV3UG9zKSkge1xuICAgICAgICAgICAgICAgIGxlZ2FsRGlySWR4cy5wdXNoKGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGZsb29yRGlySWR4cyA9IFtdO1xuICAgICAgICBsZWdhbERpcklkeHMuZm9yRWFjaCgoZGlyaWR4LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJzW2RpcmlkeF1bMF0sIHRoaXMucG9zWzFdICsgZGlyc1tkaXJpZHhdWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5ld1BvcykgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgICAgIGZsb29yRGlySWR4cy5wdXNoKGRpcmlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9nZXQgcmFuZG9tIG1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gZmxvb3JEaXJJZHhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZsb29yRGlySWR4cy5sZW5ndGgpXTtcblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGlsZS5kaWdMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMikgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUUkFQUEVEXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBbGllbjsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMWE5MzZmXCJcbiAgICAgICAgdGhpcy5kaWdMZXZlbCA9IDA7XG5cbiAgICB9XG5cbiAgICBmaWxsKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkaWcoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsIDwgMikge1xuICAgICAgICAgICAgdGhpcy5kaWdMZXZlbCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlnTGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbG9vcjsiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5jb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5jb25zdCBBbGllbiA9IHJlcXVpcmUoXCIuL2FsaWVuXCIpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJwb3MpIHtcbiAgICAgICAgdGhpcy5WSUVXX1dJRFRIID0gNjQwO1xuICAgICAgICB0aGlzLlZJRVdfSEVJR0hUID0gNTc2O1xuICAgICAgICB0aGlzLldJRFRIID0gMTA7XG4gICAgICAgIHRoaXMuSEVJR0hUID0gOTtcbiAgICAgICAgdGhpcy5GUFMgPSA2MDtcbiAgICAgICAgdGhpcy5CR19DT0xPUiA9IFwiI2ZmNTczM1wiO1xuXG4gICAgICAgIHRoaXMubWFwID0gW1xuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDEsMSwwLDFdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMSwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDEsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzAsMSwwLDEsMCwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwxLDEsMCwwLDAsMCwwLDBdLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmFkZE1hcCh0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7Z2FtZTogdGhpcywgcG9zOiBwbGF5ZXJwb3MgfSk7XG4gICAgICAgIHRoaXMuYWxpZW5zID0gW1xuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs0LCA0XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs1LCA1XX0pXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwiTUFJTl9NRU5VXCI7XG5cbiAgICB9XG5cbiAgICBnYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBbIGhvcml6b250YWwsIHZlcnRpY2FsIF1cbiAgICBnZXRNYXBUaWxlKHBvcykge1xuICAgICAgICBpZihwb3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFtwb3NbMV1dW3Bvc1swXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRydWUgaWYgcG9zIGlzIG9uIHRoZSBib2FyZCwgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAgaXNMZWdhbFBvc2l0aW9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBpZiggcG9zWzBdID49IDAgJiYgcG9zWzBdIDwgdGhpcy5tYXBbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwb3NbMV0gPj0gMCAmJiBwb3NbMV0gPCB0aGlzLm1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2dpdmVuIGEgZ3JpZCwgc2V0IHRoaXMuZ3JpZCB0byBhbiBhcnJheSBvZiB0aGUgY2xhc3Nlc1xuICAgIGFkZE1hcChtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDAgaXMgZmxvb3JcbiAgICAgICAgICAgICAgICBpZiAoc3F1YXJlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IEZsb29yKHtwb3M6IFtjb2xfaSwgcm93X2ldfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8xIGlzIHdhbGxcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNxdWFyZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IFdhbGwoe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1vdmVPYmplY3RzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiOlxuICAgICAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3JlbmRlciB0aGUgY3VycmVudCBnYW1lc3RhdGVcbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiOlxuICAgICAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5CR19DT0xPUjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgbWFwXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUucmVuZGVyKGN0eCk7ICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIGFjdG9yc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMjBweCBHZW9yZ2lhXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiUHJlc3MgRW50ZXIgdG8gc3RhcnQgdGhlIGdhbWVcIiwgMTAsIDUwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIEdhbWVWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gXG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYmluZCBrZXlzIHRvIG1vdmVzXG4gICAgYmluZEtleXMoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuRElSUykuZm9yRWFjaCggKGspID0+IHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGtleShrLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShrKSlcbiAgICAgICAgfSlcblxuICAgICAgICBrZXkoXCJrXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwia1wiKSk7XG4gICAgICAgIGtleShcImpcIiwgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoXCJqXCIpKTtcbiAgICAgICAga2V5KFwiZW50ZXJcIiwgKCkgPT4gdGhpcy5nYW1lLnN0YXJ0KCkpO1xuICAgIH1cblxuICAgIC8vcnVuIHRoZSBnYW1lXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYmluZEtleXMoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgYW5pbWF0ZSh0aW1lKSB7XG4gICAgICAgIC8vY2hhbmdlIGluIHRpbWUgaXMgY3VycmVudCB0aW1lIC0gbGFzdCB0aW1lXG4gICAgICAgIGxldCB0aW1lRGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcblxuICAgICAgICAvL2lmIHRpbWUgaGFzIGNoYW5nZWQgbW9yZSB0aGFuIDE2IG1zXG4gICAgICAgIGlmICh0aW1lRGVsdGEgPiAxNi42Nikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0ZXAoKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcy5jdHgpO1xuXG4gICAgICAgICAgICAvL2xhc3RUaW1lIGlzIGN1cnJlbnQgdGltZVxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWUgKyAodGltZURlbHRhIC0gMTYuNjYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVZpZXc7IiwiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcbmNvbnN0IFdhbGwgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xuXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2h0dHBzOi8vcGhpbG93ZTk0LmdpdGh1Yi5pby9oZWlhbmt5by1hbGllbi9hc3NldHMvY2hpYmktbGF5ZXJlZC5wbmcnO1xuXG4gICAgICAgIHRoaXMuRElSUyA9IHtcbiAgICAgICAgICAgIHc6IFswLCAtMV0sXG4gICAgICAgICAgICBhOiBbLTEsIDBdLFxuICAgICAgICAgICAgczogWzAsIDFdLFxuICAgICAgICAgICAgZDogWzEsIDBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWcoZGlncG9zKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJESUdHSU5HXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkaWdwb3MpO1xuICAgICAgICBsZXQgZGlnVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKGRpZ3Bvcyk7XG4gICAgICAgIGlmIChkaWdUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgZGlnVGlsZS5kaWcoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZ1RpbGUuZGlnTGV2ZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsbChmaWxscG9zKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJGSUxMSU5HXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhmaWxscG9zKTtcbiAgICAgICAgbGV0IGZpbGxUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZmlsbHBvcyk7XG4gICAgICAgIGlmIChmaWxsVGlsZSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgIGlmIChmaWxsVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxsVGlsZS5wb3NbMF0gPT09IGFsaWVuLnBvc1swXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRpbGUucG9zWzFdID09PSBhbGllbi5wb3NbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGllbi5kaWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID49IDEpIHtcbiAgICAgICAgICAgICAgICBmaWxsVGlsZS5maWxsKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlnVGlsZS5kaWdMZXZlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREaWdQb3MoKSB7XG4gICAgICAgIGxldCBkaXJzU3RhdGVzID0gW1wiRkFDSU5HX1VQXCIsIFwiRkFDSU5HX0xFRlRcIiwgXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19SSUdIVFwiXTtcbiAgICAgICAgbGV0IGRpcklkeCA9IGRpcnNTdGF0ZXMuaW5kZXhPZih0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAoZGlySWR4ID49MCkge1xuICAgICAgICAgICAgbGV0IGRpciA9IE9iamVjdC52YWx1ZXModGhpcy5ESVJTKVtkaXJJZHhdO1xuICAgICAgICAgICAgbGV0IGRpZ1BvcyA9IFt0aGlzLnBvc1swXSArIGRpclswXSwgdGhpcy5wb3NbMV0gKyBkaXJbMV1dXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmlzTGVnYWxQb3NpdGlvbihkaWdQb3MpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpZ1BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0X3N0YXRlKGspIHtcbiAgICAgICAgbGV0IG5leHRQb3MgPSBbXTtcblxuICAgICAgICBpZiAoW1wiRkFDSU5HX0RPV05cIiwgXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19SSUdIVFwiXS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIndcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUoW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXSBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdICsgMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19ET1dOXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImtcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZ1BvcyA9IHRoaXMuZ2V0RGlnUG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlnKGRpZ1Bvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJqXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxsUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsKGZpbGxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19VUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMzIsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgLy8gb2Zmc2V0IG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgNjQgLy8gc2l6ZSBvbiBjYW52YXNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTQ0LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgODAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgNjQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA0OCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMyMjIyMjJcIlxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICA2NFxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlOyIsImNvbnN0IFRpbGUgPSByZXF1aXJlKCcuL3RpbGUnKTtcblxuY2xhc3MgV2FsbCBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMxMTRiNWZcIlxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgNjRcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5jb25zdCBHYW1lID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcbmNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZShcIi4vZ2FtZV92aWV3XCIpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvL2NhbnZhcyByZXNlYXJjaFxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAvL3NldCB1cCBnYW1lXG5cbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKFswLDBdKTtcbiAgICBjYW52YXMud2lkdGggPSBnYW1lLlZJRVdfV0lEVEg7XG4gICAgY2FudmFzLmhlaWdodCA9IGdhbWUuVklFV19IRUlHSFQ7XG5cbiAgICBuZXcgR2FtZVZpZXcoZ2FtZSwgY3R4KS5zdGFydCgpO1xuXG59KTtcblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
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
      this.player.move();
      this.aliens.forEach(function (alien) {
        alien.move();
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImRpcnMiLCJsZWdhbERpcklkeHMiLCJmb3JFYWNoIiwiZGlyIiwiaWR4IiwibmV3UG9zIiwiaXNMZWdhbFBvc2l0aW9uIiwicHVzaCIsImZsb29yRGlySWR4cyIsImRpcmlkeCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3U3RhdGUiLCJjaGVja0NvbGxpc2lvbiIsImN0eCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbFN0eWxlIiwiZmlsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJUaWxlIiwiZmlsbFJlY3QiLCJsaW5lV2lkdGgiLCJzdHJva2UiLCJQbGF5ZXIiLCJXYWxsIiwiR2FtZSIsInBsYXllcnBvcyIsIlZJRVdfV0lEVEgiLCJWSUVXX0hFSUdIVCIsIldJRFRIIiwiSEVJR0hUIiwiRlBTIiwiQkdfQ09MT1IiLCJtYXAiLCJhZGRNYXAiLCJhbGllbnMiLCJTVEFURSIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImNsZWFyUmVjdCIsInJlbmRlciIsIkdhbWVWaWV3IiwibGFzdFRpbWUiLCJESVJTIiwidyIsImEiLCJzIiwiZCIsIk9iamVjdCIsImtleXMiLCJrIiwia2V5Iiwic2V0X3N0YXRlIiwic3RhcnQiLCJiaW5kS2V5cyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFuaW1hdGUiLCJiaW5kIiwidGltZSIsInRpbWVEZWx0YSIsInN0ZXAiLCJzcHJpdGVzIiwiSW1hZ2UiLCJzcmMiLCJkaWdwb3MiLCJjb25zb2xlIiwibG9nIiwiZGlnVGlsZSIsImRpZyIsImZpbGxwb3MiLCJmaWxsVGlsZSIsImRpZSIsImRpcnNTdGF0ZXMiLCJkaXJJZHgiLCJpbmRleE9mIiwidmFsdWVzIiwiZGlnUG9zIiwibmV4dFBvcyIsImluY2x1ZGVzIiwiZ2V0RGlnUG9zIiwiZmlsbFBvcyIsImRyYXdJbWFnZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1DLEs7QUFDRixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQyxHQUFMLEdBQVdELE9BQU8sQ0FBQ0MsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsU0FBYjtBQUNBLFNBQUtDLElBQUwsR0FBWUgsT0FBTyxDQUFDRyxJQUFwQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQyxjQUFMLEVBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0g7Ozs7V0FFRCxlQUFNO0FBQ0YsV0FBS0YsS0FBTCxHQUFhLE1BQWI7QUFDSDs7O1dBRUQsMEJBQWlCO0FBQ2IsVUFBSUcsT0FBTyxHQUFHLEtBQUtKLElBQUwsQ0FBVUssVUFBVixDQUFxQixLQUFLUCxHQUExQixDQUFkOztBQUNBLFVBQUlNLE9BQU8sWUFBWVYsS0FBdkIsRUFBOEI7QUFDMUIsWUFBSVUsT0FBTyxDQUFDRSxRQUFSLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGVBQUtMLEtBQUwsR0FBYSxjQUFiO0FBQ0g7O0FBQ0QsWUFBSUcsT0FBTyxDQUFDRSxRQUFSLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGVBQUtMLEtBQUwsR0FBYSxTQUFiO0FBQ0g7QUFDSjs7QUFDRCxVQUFJLEtBQUtILEdBQUwsQ0FBUyxDQUFULE1BQWdCLEtBQUtFLElBQUwsQ0FBVU8sTUFBVixDQUFpQlQsR0FBakIsQ0FBcUIsQ0FBckIsQ0FBaEIsSUFDQSxLQUFLQSxHQUFMLENBQVMsQ0FBVCxNQUFnQixLQUFLRSxJQUFMLENBQVVPLE1BQVYsQ0FBaUJULEdBQWpCLENBQXFCLENBQXJCLENBRHBCLEVBQzZDO0FBQ3JDLGFBQUtFLElBQUwsQ0FBVU8sTUFBVixDQUFpQk4sS0FBakIsR0FBeUIsTUFBekI7QUFDUDtBQUNKOzs7V0FFRCwwQkFBaUI7QUFBQTs7QUFDYjtBQUNBLFVBQUlPLElBQUksR0FBRyxDQUNQLENBQUUsQ0FBRixFQUFLLENBQUMsQ0FBTixDQURPLEVBQ0c7QUFDVixPQUFDLENBQUMsQ0FBRixFQUFNLENBQU4sQ0FGTyxFQUVHO0FBQ1YsT0FBRSxDQUFGLEVBQU0sQ0FBTixDQUhPLEVBR0k7QUFDWCxPQUFFLENBQUYsRUFBTSxDQUFOLENBSk8sQ0FJSTtBQUpKLE9BQVg7QUFPQSxVQUFJQyxZQUFZLEdBQUcsRUFBbkIsQ0FUYSxDQVViOztBQUNBRCxVQUFJLENBQUNFLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUN2QixZQUFJQyxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUNmLEdBQUwsQ0FBUyxDQUFULElBQWNhLEdBQUcsQ0FBQyxDQUFELENBQWxCLEVBQXVCLEtBQUksQ0FBQ2IsR0FBTCxDQUFTLENBQVQsSUFBY2EsR0FBRyxDQUFDLENBQUQsQ0FBeEMsQ0FBYjs7QUFDQSxZQUFJLEtBQUksQ0FBQ1gsSUFBTCxDQUFVYyxlQUFWLENBQTBCRCxNQUExQixDQUFKLEVBQXVDO0FBQ25DSixzQkFBWSxDQUFDTSxJQUFiLENBQWtCSCxHQUFsQjtBQUNIO0FBQ0osT0FMRDtBQU9BLFVBQUlJLFlBQVksR0FBRyxFQUFuQjtBQUNBUCxrQkFBWSxDQUFDQyxPQUFiLENBQXFCLFVBQUNPLE1BQUQsRUFBU0wsR0FBVCxFQUFpQjtBQUNsQyxZQUFJQyxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUNmLEdBQUwsQ0FBUyxDQUFULElBQWNVLElBQUksQ0FBQ1MsTUFBRCxDQUFKLENBQWEsQ0FBYixDQUFmLEVBQWdDLEtBQUksQ0FBQ25CLEdBQUwsQ0FBUyxDQUFULElBQWNVLElBQUksQ0FBQ1MsTUFBRCxDQUFKLENBQWEsQ0FBYixDQUE5QyxDQUFiOztBQUNBLFlBQUksS0FBSSxDQUFDakIsSUFBTCxDQUFVSyxVQUFWLENBQXFCUSxNQUFyQixhQUF3Q25CLEtBQTVDLEVBQW1EO0FBQy9Dc0Isc0JBQVksQ0FBQ0QsSUFBYixDQUFrQkUsTUFBbEI7QUFDSDtBQUNKLE9BTEQsRUFuQmEsQ0EwQmI7O0FBQ0EsVUFBSUMsS0FBSyxHQUFHRixZQUFZLENBQUNHLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JMLFlBQVksQ0FBQ00sTUFBeEMsQ0FBRCxDQUF4QjtBQUVBLFVBQUlDLFFBQVEsR0FBRyxFQUFmOztBQUNBLGNBQVFMLEtBQVI7QUFDSSxhQUFLLENBQUw7QUFDSUssa0JBQVEsR0FBRyxXQUFYO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0lBLGtCQUFRLEdBQUcsYUFBWDtBQUNBOztBQUNKLGFBQUssQ0FBTDtBQUNJQSxrQkFBUSxHQUFHLGFBQVg7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSUEsa0JBQVEsR0FBRyxjQUFYO0FBQ0E7O0FBQ0o7QUFDSTtBQWRSOztBQWtCQSxhQUFPQSxRQUFQO0FBRUg7OztXQUVELGdCQUFPO0FBRUgsY0FBUSxLQUFLdEIsS0FBYjtBQUNJLGFBQUssV0FBTDtBQUNJLGVBQUtFLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0EsY0FBSSxLQUFLQSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCO0FBQ3pCLGlCQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsaUJBQUtMLEdBQUwsR0FBVyxDQUFDLEtBQUtBLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQTVCLENBQVg7QUFDQSxpQkFBS0csS0FBTCxHQUFhLEtBQUtDLGNBQUwsRUFBYjtBQUNBLGlCQUFLc0IsY0FBTDtBQUNIOztBQUVEOztBQUNKLGFBQUssYUFBTDtBQUNJLGVBQUtyQixXQUFMLElBQW9CLENBQXBCOztBQUNBLGNBQUksS0FBS0EsV0FBTCxLQUFxQixFQUF6QixFQUE2QjtBQUN6QixpQkFBS0EsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGlCQUFLTCxHQUFMLEdBQVcsQ0FBQyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWYsRUFBa0IsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBbEIsQ0FBWDtBQUNBLGlCQUFLRyxLQUFMLEdBQWEsS0FBS0MsY0FBTCxFQUFiO0FBQ0EsaUJBQUtzQixjQUFMO0FBQ0g7O0FBRUQ7O0FBQ0osYUFBSyxhQUFMO0FBQ0ksZUFBS3JCLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0EsY0FBSSxLQUFLQSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCO0FBQ3pCLGlCQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsaUJBQUtMLEdBQUwsR0FBVyxDQUFDLEtBQUtBLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQTVCLENBQVg7QUFDQSxpQkFBS0csS0FBTCxHQUFhLEtBQUtDLGNBQUwsRUFBYjtBQUNBLGlCQUFLc0IsY0FBTDtBQUNIOztBQUVEOztBQUVKLGFBQUssY0FBTDtBQUNJLGVBQUtyQixXQUFMLElBQW9CLENBQXBCOztBQUNBLGNBQUksS0FBS0EsV0FBTCxLQUFxQixFQUF6QixFQUE2QjtBQUN6QixpQkFBS0EsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGlCQUFLTCxHQUFMLEdBQVcsQ0FBQyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWYsRUFBa0IsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBbEIsQ0FBWDtBQUNBLGlCQUFLRyxLQUFMLEdBQWEsS0FBS0MsY0FBTCxFQUFiO0FBQ0EsaUJBQUtzQixjQUFMO0FBQ0g7O0FBRUQ7O0FBQ0osYUFBSyxjQUFMO0FBQ0ksZUFBS3JCLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0EsY0FBSSxLQUFLQSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCO0FBQ3pCLGlCQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsZ0JBQUlDLE9BQU8sR0FBRyxLQUFLSixJQUFMLENBQVVLLFVBQVYsQ0FBcUIsS0FBS1AsR0FBMUIsQ0FBZDtBQUNBTSxtQkFBTyxDQUFDRSxRQUFSLEdBQW1CLENBQW5CO0FBQ0EsaUJBQUtMLEtBQUwsR0FBYSxLQUFLQyxjQUFMLEVBQWI7QUFDSDs7QUFDRDs7QUFDSixhQUFLLFNBQUw7QUFDSSxlQUFLQyxXQUFMLElBQW9CLENBQXBCOztBQUNBLGNBQUksS0FBS0EsV0FBTCxLQUFxQixHQUF6QixFQUE4QjtBQUMxQixpQkFBS0EsV0FBTCxHQUFtQixDQUFuQjtBQUVBLGlCQUFLRixLQUFMLEdBQWEsS0FBS0MsY0FBTCxFQUFiO0FBQ0g7O0FBQ0Q7O0FBQ0o7QUFDSTtBQTVEUjtBQWdFSDs7O1dBRUQsZ0JBQU91QixHQUFQLEVBQVk7QUFDUixjQUFRLEtBQUt4QixLQUFiO0FBQ0ksYUFBSyxXQUFMO0FBQ0l3QixhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRDdCLEVBRUssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FBekIsR0FBK0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBRm5DLEVBR0ksRUFISixFQUlJLElBQUlnQixJQUFJLENBQUNTLEVBSmIsRUFLSSxLQUxKO0FBT0FILGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLOUIsS0FBckI7QUFDQTBCLGFBQUcsQ0FBQ0ssSUFBSjtBQUNBOztBQUNKLGFBQUssYUFBTDtBQUNJTCxhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBQXpCLEdBQStCLEtBQUtLLFdBQUwsSUFBb0IsS0FBRyxFQUF2QixDQURuQyxFQUVLLEtBQUtMLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRjdCLEVBR0ksRUFISixFQUlJLElBQUlxQixJQUFJLENBQUNTLEVBSmIsRUFLSSxLQUxKO0FBT0FILGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLOUIsS0FBckI7QUFDQTBCLGFBQUcsQ0FBQ0ssSUFBSjtBQUNBOztBQUNKLGFBQUssYUFBTDtBQUNJTCxhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRDdCLEVBRUssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FBekIsR0FBK0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBRm5DLEVBR0ksRUFISixFQUlJLElBQUlnQixJQUFJLENBQUNTLEVBSmIsRUFLSSxLQUxKO0FBT0FILGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLOUIsS0FBckI7QUFDQTBCLGFBQUcsQ0FBQ0ssSUFBSjtBQUNBOztBQUNKLGFBQUssY0FBTDtBQUNJTCxhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBQXpCLEdBQStCLEtBQUtLLFdBQUwsSUFBb0IsS0FBRyxFQUF2QixDQURuQyxFQUVLLEtBQUtMLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRjdCLEVBR0ksRUFISixFQUlJLElBQUlxQixJQUFJLENBQUNTLEVBSmIsRUFLSSxLQUxKO0FBT0FILGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLOUIsS0FBckI7QUFDQTBCLGFBQUcsQ0FBQ0ssSUFBSjtBQUNBOztBQUNKLGFBQUssY0FBTDtBQUNJTCxhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRDdCLEVBRUssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FGN0IsRUFHSSxFQUhKLEVBSUksSUFBSXFCLElBQUksQ0FBQ1MsRUFKYixFQUtJLEtBTEo7QUFPQUgsYUFBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUs5QixLQUFyQjtBQUNBMEIsYUFBRyxDQUFDSyxJQUFKO0FBQ0E7O0FBQ0osYUFBSyxTQUFMO0FBQ0lMLGFBQUcsQ0FBQ0MsU0FBSjtBQUNBRCxhQUFHLENBQUNFLEdBQUosQ0FDSyxLQUFLN0IsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FEN0IsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBRyxDQUY3QixFQUdJLEVBSEosRUFJSSxJQUFJcUIsSUFBSSxDQUFDUyxFQUpiLEVBS0ksS0FMSjtBQU9BSCxhQUFHLENBQUNJLFNBQUosR0FBZ0IsS0FBSzlCLEtBQXJCO0FBQ0EwQixhQUFHLENBQUNLLElBQUo7QUFDQTtBQXhFUjtBQTJFSDs7Ozs7O0FBR0xDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBDLEtBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE9BLElBQU1xQyxJQUFJLEdBQUd0QyxtQkFBTyxDQUFDLDZCQUFELENBQXBCOztJQUVNRCxLOzs7OztBQUNGLGlCQUFZRyxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxPQUFOO0FBRUEsVUFBS0UsS0FBTCxHQUFhLFNBQWI7QUFDQSxVQUFLTyxRQUFMLEdBQWdCLENBQWhCO0FBSmlCO0FBTXBCOzs7O1dBRUQsZ0JBQU87QUFFSCxVQUFJLEtBQUtBLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDcEIsYUFBS0EsUUFBTCxJQUFpQixDQUFqQjtBQUNIO0FBRUo7OztXQUVELGVBQU07QUFDRixVQUFJLEtBQUtBLFFBQUwsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsYUFBS0EsUUFBTCxJQUFpQixDQUFqQjtBQUNIO0FBQ0o7OztXQUVELGdCQUFPbUIsR0FBUCxFQUFZO0FBQ1IsY0FBUSxLQUFLbkIsUUFBYjtBQUNJLGFBQUssQ0FBTDtBQUNJbUIsYUFBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUs5QixLQUFyQjtBQUNBMEIsYUFBRyxDQUFDUyxRQUFKLENBQ0ssS0FBS3BDLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFEbkIsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBRm5CLEVBR0ksRUFISixFQUlJLEVBSko7QUFNQTs7QUFDSixhQUFLLENBQUw7QUFDSTJCLGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLOUIsS0FBckI7QUFDQTBCLGFBQUcsQ0FBQ1MsUUFBSixDQUNLLEtBQUtwQyxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBRG5CLEVBRUssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUZuQixFQUdJLEVBSEosRUFJSSxFQUpKO0FBTUEyQixhQUFHLENBQUNDLFNBQUo7QUFDQUQsYUFBRyxDQUFDRSxHQUFKLENBQ0ssS0FBSzdCLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFHLENBRDdCLEVBRUssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FGN0IsRUFHSSxFQUhKLEVBSUksSUFBSXFCLElBQUksQ0FBQ1MsRUFKYixFQUtJLEtBTEo7QUFPQUgsYUFBRyxDQUFDVSxTQUFKLEdBQWdCLENBQWhCO0FBQ0FWLGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixTQUFoQjtBQUNBSixhQUFHLENBQUNXLE1BQUo7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSVgsYUFBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUs5QixLQUFyQjtBQUNBMEIsYUFBRyxDQUFDUyxRQUFKLENBQ0ssS0FBS3BDLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFEbkIsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBRm5CLEVBR0ksRUFISixFQUlJLEVBSko7QUFNQTJCLGFBQUcsQ0FBQ0MsU0FBSjtBQUNBRCxhQUFHLENBQUNFLEdBQUosQ0FDSyxLQUFLN0IsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUFmLEdBQXNCLEtBQUcsQ0FEN0IsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBRyxDQUY3QixFQUdJLEVBSEosRUFJSSxJQUFJcUIsSUFBSSxDQUFDUyxFQUpiLEVBS0ksS0FMSjtBQU9BSCxhQUFHLENBQUNVLFNBQUosR0FBZ0IsQ0FBaEI7QUFDQVYsYUFBRyxDQUFDSSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FKLGFBQUcsQ0FBQ1csTUFBSjtBQUNBOztBQUNKO0FBQ0k7QUFuRFI7QUFxREg7Ozs7RUE3RWVILEk7O0FBZ0ZwQkYsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEMsS0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNMkMsTUFBTSxHQUFHMUMsbUJBQU8sQ0FBQyxpQ0FBRCxDQUF0Qjs7QUFDQSxJQUFNRCxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0FBQ0EsSUFBTTJDLElBQUksR0FBRzNDLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxtQkFBTyxDQUFDLCtCQUFELENBQXJCOztJQUVNNEMsSTtBQUNGLGdCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ25CLFNBQUtDLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEdBQW5CO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixTQUFoQjtBQUVBLFNBQUtDLEdBQUwsR0FBVyxDQUNQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FETyxFQUVQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FGTyxFQUdQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FITyxFQUlQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FKTyxFQUtQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FMTyxFQU1QLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FOTyxFQU9QLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FQTyxFQVFQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FSTyxFQVNQLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FUTyxDQUFYO0FBV0EsU0FBS0MsTUFBTCxDQUFZLEtBQUtELEdBQWpCO0FBQ0EsU0FBS3hDLE1BQUwsR0FBYyxJQUFJOEIsTUFBSixDQUFXO0FBQUNyQyxVQUFJLEVBQUUsSUFBUDtBQUFhRixTQUFHLEVBQUUwQztBQUFsQixLQUFYLENBQWQ7QUFDQSxTQUFLUyxNQUFMLEdBQWMsQ0FDVixJQUFJckQsS0FBSixDQUFVO0FBQUNJLFVBQUksRUFBRSxJQUFQO0FBQWFGLFNBQUcsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBQWxCLEtBQVYsQ0FEVSxFQUVWLElBQUlGLEtBQUosQ0FBVTtBQUFDSSxVQUFJLEVBQUUsSUFBUDtBQUFhRixTQUFHLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUFsQixLQUFWLENBRlUsRUFHVixJQUFJRixLQUFKLENBQVU7QUFBQ0ksVUFBSSxFQUFFLElBQVA7QUFBYUYsU0FBRyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFBbEIsS0FBVixDQUhVLENBQWQ7QUFNQSxTQUFLb0QsS0FBTCxHQUFhLFdBQWI7QUFFSDs7OztXQUVELG9CQUFXO0FBQ1AsV0FBSzNDLE1BQUwsR0FBYyxFQUFkO0FBQ0gsSyxDQUVEOzs7O1dBQ0Esb0JBQVdULEdBQVgsRUFBZ0I7QUFDWixVQUFHQSxHQUFILEVBQVE7QUFDSixlQUFPLEtBQUtpRCxHQUFMLENBQVNqRCxHQUFHLENBQUMsQ0FBRCxDQUFaLEVBQWlCQSxHQUFHLENBQUMsQ0FBRCxDQUFwQixDQUFQO0FBQ0g7QUFDSixLLENBRUQ7Ozs7V0FDQSx5QkFBZ0JBLEdBQWhCLEVBQXFCO0FBQ2pCLFVBQUlBLEdBQUosRUFBUztBQUNMLFlBQUlBLEdBQUcsQ0FBQyxDQUFELENBQUgsSUFBVSxDQUFWLElBQWVBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBUyxLQUFLaUQsR0FBTCxDQUFTLENBQVQsRUFBWXpCLE1BQXhDLEVBQWdEO0FBQzVDLGNBQUt4QixHQUFHLENBQUMsQ0FBRCxDQUFILElBQVUsQ0FBVixJQUFlQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVMsS0FBS2lELEdBQUwsQ0FBU3pCLE1BQXRDLEVBQThDO0FBQzFDLG1CQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsYUFBTyxLQUFQO0FBQ0gsSyxDQUVEOzs7O1dBQ0EsZ0JBQU95QixHQUFQLEVBQVk7QUFBQTs7QUFDUixXQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFFQSxXQUFLQSxHQUFMLENBQVNyQyxPQUFULENBQWtCLFVBQUN5QyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDOUJELFdBQUcsQ0FBQ3pDLE9BQUosQ0FBYSxVQUFDMkMsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQzVCO0FBQ0EsY0FBSUQsTUFBTSxLQUFLLENBQWYsRUFBa0I7QUFFZCxpQkFBSSxDQUFDTixHQUFMLENBQVNLLEtBQVQsRUFBZ0JFLEtBQWhCLElBQXlCLElBQUk1RCxLQUFKLENBQVU7QUFBQ0ksaUJBQUcsRUFBRSxDQUFDd0QsS0FBRCxFQUFRRixLQUFSO0FBQU4sYUFBVixDQUF6QixDQUZjLENBSWxCO0FBQ0MsV0FMRCxNQUtPLElBQUlDLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ3JCLGlCQUFJLENBQUNOLEdBQUwsQ0FBU0ssS0FBVCxFQUFnQkUsS0FBaEIsSUFBeUIsSUFBSWhCLElBQUosQ0FBUztBQUFDeEMsaUJBQUcsRUFBRSxDQUFDd0QsS0FBRCxFQUFRRixLQUFSO0FBQU4sYUFBVCxDQUF6QjtBQUNIO0FBQ0osU0FWRDtBQVdILE9BWkQ7QUFhSDs7O1dBRUQsdUJBQWM7QUFDVixXQUFLN0MsTUFBTCxDQUFZZ0QsSUFBWjtBQUVBLFdBQUtOLE1BQUwsQ0FBWXZDLE9BQVosQ0FBcUIsVUFBQzhDLEtBQUQsRUFBVztBQUM1QkEsYUFBSyxDQUFDRCxJQUFOO0FBQ0gsT0FGRDtBQUdIOzs7V0FJRCxpQkFBUTtBQUNKLFdBQUt0RCxLQUFMLEdBQWEsU0FBYjtBQUNIOzs7V0FFRCxnQkFBTztBQUVILGNBQVEsS0FBS0EsS0FBYjtBQUNJLGFBQUssU0FBTDtBQUNBLGVBQUt3RCxXQUFMO0FBQ0E7O0FBQ0o7QUFDSTtBQUxKO0FBT0gsSyxDQUNEOzs7O1dBQ0EsZ0JBQU9oQyxHQUFQLEVBQVk7QUFFUixjQUFRLEtBQUt4QixLQUFiO0FBQ0ksYUFBSyxTQUFMO0FBQ0l3QixhQUFHLENBQUNpQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixLQUFLakIsVUFBekIsRUFBcUMsS0FBS0MsV0FBMUM7QUFDQWpCLGFBQUcsQ0FBQ0ksU0FBSixHQUFnQixLQUFLaUIsUUFBckI7QUFDQXJCLGFBQUcsQ0FBQ1MsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsS0FBS08sVUFBeEIsRUFBb0MsS0FBS0MsV0FBekMsRUFISixDQUlJOztBQUNBLGVBQUtLLEdBQUwsQ0FBU3JDLE9BQVQsQ0FBa0IsVUFBQ3lDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM5QkQsZUFBRyxDQUFDekMsT0FBSixDQUFhLFVBQUMyQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDNUJELG9CQUFNLENBQUNNLE1BQVAsQ0FBY2xDLEdBQWQ7QUFDSCxhQUZEO0FBR0gsV0FKRCxFQUxKLENBV0k7O0FBQ0EsZUFBS2xCLE1BQUwsQ0FBWW9ELE1BQVosQ0FBbUJsQyxHQUFuQjtBQUNBLGVBQUt3QixNQUFMLENBQVl2QyxPQUFaLENBQXFCLFVBQUM4QyxLQUFELEVBQVc7QUFDNUJBLGlCQUFLLENBQUNHLE1BQU4sQ0FBYWxDLEdBQWI7QUFDSCxXQUZEO0FBR0E7O0FBQ0o7QUFDSTtBQW5CUjtBQXFCSDs7Ozs7O0FBR0xNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQk8sSUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztJQ2xJTXFCLFE7QUFFRixvQkFBWTVELElBQVosRUFBa0J5QixHQUFsQixFQUF1QjtBQUFBOztBQUNuQixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLekIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBSzZELFFBQUwsR0FBZ0IsQ0FBaEI7QUFHQSxTQUFLQyxJQUFMLEdBQVk7QUFDUkMsT0FBQyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUMsQ0FBTCxDQURLO0FBRVJDLE9BQUMsRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FGSztBQUdSQyxPQUFDLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUhLO0FBSVJDLE9BQUMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBSkssS0FBWjtBQU1ILEcsQ0FFRDs7Ozs7V0FDQSxvQkFBVztBQUFBOztBQUNQQyxZQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLTixJQUFqQixFQUF1QnBELE9BQXZCLENBQWdDLFVBQUMyRCxDQUFELEVBQU87QUFDbkNDLFdBQUcsQ0FBQ0QsQ0FBRCxFQUFJO0FBQUEsaUJBQU0sS0FBSSxDQUFDckUsSUFBTCxDQUFVTyxNQUFWLENBQWlCZ0UsU0FBakIsQ0FBMkJGLENBQTNCLENBQU47QUFBQSxTQUFKLENBQUg7QUFDSCxPQUZEO0FBSUFDLFNBQUcsQ0FBQyxHQUFELEVBQU07QUFBQSxlQUFNLEtBQUksQ0FBQ3RFLElBQUwsQ0FBVU8sTUFBVixDQUFpQmdFLFNBQWpCLENBQTJCLEdBQTNCLENBQU47QUFBQSxPQUFOLENBQUg7QUFDQUQsU0FBRyxDQUFDLEdBQUQsRUFBTTtBQUFBLGVBQU0sS0FBSSxDQUFDdEUsSUFBTCxDQUFVTyxNQUFWLENBQWlCZ0UsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBTjtBQUFBLE9BQU4sQ0FBSDtBQUNBRCxTQUFHLENBQUMsT0FBRCxFQUFVO0FBQUEsZUFBTSxLQUFJLENBQUN0RSxJQUFMLENBQVV3RSxLQUFWLEVBQU47QUFBQSxPQUFWLENBQUg7QUFDSCxLLENBRUQ7Ozs7V0FDQSxpQkFBUTtBQUNKLFdBQUtDLFFBQUw7QUFDQUMsMkJBQXFCLENBQUMsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQUQsQ0FBckI7QUFDSDs7O1dBRUQsaUJBQVFDLElBQVIsRUFBYztBQUNWO0FBQ0EsVUFBSUMsU0FBUyxHQUFHRCxJQUFJLEdBQUcsS0FBS2hCLFFBQTVCLENBRlUsQ0FJVjs7QUFDQSxVQUFJaUIsU0FBUyxHQUFHLEtBQWhCLEVBQXVCO0FBQ25CLGFBQUs5RSxJQUFMLENBQVUrRSxJQUFWO0FBQ0EsYUFBSy9FLElBQUwsQ0FBVTJELE1BQVYsQ0FBaUIsS0FBS2xDLEdBQXRCLEVBRm1CLENBSW5COztBQUNBLGFBQUtvQyxRQUFMLEdBQWdCZ0IsSUFBSSxJQUFJQyxTQUFTLEdBQUcsS0FBaEIsQ0FBcEI7QUFDSDs7QUFFREosMkJBQXFCLENBQUMsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQUQsQ0FBckI7QUFDSDs7Ozs7O0FBR0w3QyxNQUFNLENBQUNDLE9BQVAsR0FBaUI0QixRQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbERBLElBQU1sRSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0FBQ0EsSUFBTTJDLElBQUksR0FBRzNDLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0lBR00wQyxNO0FBQ0Ysa0JBQVl4QyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLFNBQUtFLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0QsR0FBTCxHQUFXRCxPQUFPLENBQUNDLEdBQW5CO0FBQ0EsU0FBS0UsSUFBTCxHQUFZSCxPQUFPLENBQUNHLElBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLGFBQWI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBSzZFLE9BQUwsR0FBZSxJQUFJQyxLQUFKLEVBQWY7QUFDQSxTQUFLRCxPQUFMLENBQWFFLEdBQWIsR0FBbUIscUVBQW5CO0FBRUEsU0FBS3BCLElBQUwsR0FBWTtBQUNSQyxPQUFDLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBQyxDQUFMLENBREs7QUFFUkMsT0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUZLO0FBR1JDLE9BQUMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSEs7QUFJUkMsT0FBQyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFKSyxLQUFaO0FBTUg7Ozs7V0FFRCxhQUFJaUIsTUFBSixFQUFXO0FBQ1BDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlGLE1BQVo7QUFDQSxVQUFJRyxPQUFPLEdBQUcsS0FBS3RGLElBQUwsQ0FBVUssVUFBVixDQUFxQjhFLE1BQXJCLENBQWQ7O0FBQ0EsVUFBSUcsT0FBTyxZQUFZNUYsS0FBdkIsRUFBNkI7QUFDekI0RixlQUFPLENBQUNDLEdBQVI7QUFDQUgsZUFBTyxDQUFDQyxHQUFSLENBQVlDLE9BQU8sQ0FBQ2hGLFFBQXBCO0FBQ0g7QUFDSjs7O1dBRUQsY0FBS2tGLE9BQUwsRUFBYTtBQUNUSixhQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZRyxPQUFaO0FBQ0EsVUFBSUMsUUFBUSxHQUFHLEtBQUt6RixJQUFMLENBQVVLLFVBQVYsQ0FBcUJtRixPQUFyQixDQUFmOztBQUNBLFVBQUlDLFFBQVEsWUFBWS9GLEtBQXhCLEVBQThCO0FBQzFCLFlBQUkrRixRQUFRLENBQUNuRixRQUFULEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLGVBQUtOLElBQUwsQ0FBVWlELE1BQVYsQ0FBaUJ2QyxPQUFqQixDQUEwQixVQUFDOEMsS0FBRCxFQUFXO0FBQ2pDLGdCQUFJaUMsUUFBUSxDQUFDM0YsR0FBVCxDQUFhLENBQWIsTUFBb0IwRCxLQUFLLENBQUMxRCxHQUFOLENBQVUsQ0FBVixDQUFwQixJQUNBMkYsUUFBUSxDQUFDM0YsR0FBVCxDQUFhLENBQWIsTUFBb0IwRCxLQUFLLENBQUMxRCxHQUFOLENBQVUsQ0FBVixDQUR4QixFQUNzQztBQUM5QjBELG1CQUFLLENBQUNrQyxHQUFOO0FBQ0g7QUFDUixXQUxEO0FBTUg7O0FBQ0QsWUFBSUQsUUFBUSxDQUFDbkYsUUFBVCxJQUFxQixDQUF6QixFQUE0QjtBQUN4Qm1GLGtCQUFRLENBQUMzRCxJQUFUO0FBQ0FzRCxpQkFBTyxDQUFDQyxHQUFSLENBQVlDLE9BQU8sQ0FBQ2hGLFFBQXBCO0FBQ0g7QUFDSjtBQUNKOzs7V0FFRCxxQkFBWTtBQUNSLFVBQUlxRixVQUFVLEdBQUcsQ0FBQyxXQUFELEVBQWMsYUFBZCxFQUE2QixhQUE3QixFQUE0QyxjQUE1QyxDQUFqQjtBQUNBLFVBQUlDLE1BQU0sR0FBR0QsVUFBVSxDQUFDRSxPQUFYLENBQW1CLEtBQUs1RixLQUF4QixDQUFiOztBQUVBLFVBQUkyRixNQUFNLElBQUcsQ0FBYixFQUFnQjtBQUNaLFlBQUlqRixHQUFHLEdBQUd3RCxNQUFNLENBQUMyQixNQUFQLENBQWMsS0FBS2hDLElBQW5CLEVBQXlCOEIsTUFBekIsQ0FBVjtBQUNBLFlBQUlHLE1BQU0sR0FBRyxDQUFDLEtBQUtqRyxHQUFMLENBQVMsQ0FBVCxJQUFjYSxHQUFHLENBQUMsQ0FBRCxDQUFsQixFQUF1QixLQUFLYixHQUFMLENBQVMsQ0FBVCxJQUFjYSxHQUFHLENBQUMsQ0FBRCxDQUF4QyxDQUFiOztBQUNBLFlBQUksS0FBS1gsSUFBTCxDQUFVYyxlQUFWLENBQTBCaUYsTUFBMUIsQ0FBSixFQUF1QztBQUNuQyxpQkFBT0EsTUFBUDtBQUNIO0FBQ0osT0FORCxNQU1PO0FBQ0gsZUFBTyxJQUFQO0FBQ0g7QUFDSjs7O1dBRUQsbUJBQVUxQixDQUFWLEVBQWE7QUFDVCxVQUFJMkIsT0FBTyxHQUFHLEVBQWQ7O0FBRUEsVUFBSSxDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsRUFBNkIsYUFBN0IsRUFBNEMsY0FBNUMsRUFBNERDLFFBQTVELENBQXFFLEtBQUtoRyxLQUExRSxDQUFKLEVBQXNGO0FBQ2xGLGdCQUFRb0UsQ0FBUjtBQUNJLGVBQUssR0FBTDtBQUNJMkIsbUJBQU8sR0FBRyxDQUFDLEtBQUtsRyxHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWMsS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUE1QixDQUFWOztBQUNBLGdCQUFJLEtBQUtFLElBQUwsQ0FBVUssVUFBVixDQUFxQixDQUFDLEtBQUtQLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQTVCLENBQXJCLGFBQWdFSixLQUFwRSxFQUEwRTtBQUN0RSxtQkFBS08sS0FBTCxHQUFhLFdBQWI7QUFDSDs7QUFDRDs7QUFDSixlQUFLLEdBQUw7QUFDSStGLG1CQUFPLEdBQUcsQ0FBQyxLQUFLbEcsR0FBTCxDQUFTLENBQVQsSUFBYyxDQUFmLEVBQWtCLEtBQUtBLEdBQUwsQ0FBUyxDQUFULENBQWxCLENBQVY7O0FBQ0EsZ0JBQUksS0FBS0UsSUFBTCxDQUFVSyxVQUFWLENBQXFCMkYsT0FBckIsYUFBeUN0RyxLQUE3QyxFQUFtRDtBQUMvQyxtQkFBS08sS0FBTCxHQUFhLGFBQWI7QUFDSDs7QUFDRDs7QUFDSixlQUFLLEdBQUw7QUFDSStGLG1CQUFPLEdBQUcsQ0FBQyxLQUFLbEcsR0FBTCxDQUFTLENBQVQsQ0FBRCxFQUFjLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBNUIsQ0FBVjs7QUFDQSxnQkFBSSxLQUFLRSxJQUFMLENBQVVLLFVBQVYsQ0FBcUIyRixPQUFyQixhQUF5Q3RHLEtBQTdDLEVBQW1EO0FBQy9DLG1CQUFLTyxLQUFMLEdBQWEsYUFBYjtBQUNIOztBQUNEOztBQUNKLGVBQUssR0FBTDtBQUNJK0YsbUJBQU8sR0FBRyxDQUFDLEtBQUtsRyxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQWYsRUFBa0IsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBbEIsQ0FBVjs7QUFDQSxnQkFBSSxLQUFLRSxJQUFMLENBQVVLLFVBQVYsQ0FBcUIyRixPQUFyQixhQUF5Q3RHLEtBQTdDLEVBQW1EO0FBQy9DLG1CQUFLTyxLQUFMLEdBQWEsY0FBYjtBQUNIOztBQUNEOztBQUNKLGVBQUssR0FBTDtBQUNJLGdCQUFJOEYsTUFBTSxHQUFHLEtBQUtHLFNBQUwsRUFBYjtBQUNBLGlCQUFLWCxHQUFMLENBQVNRLE1BQVQ7QUFDQTs7QUFDSixlQUFLLEdBQUw7QUFDSSxnQkFBSUksT0FBTyxHQUFHLEtBQUtELFNBQUwsRUFBZDtBQUNBLGlCQUFLcEUsSUFBTCxDQUFVcUUsT0FBVjtBQUNBOztBQUNKO0FBQ0k7QUFsQ1I7QUFxQ0g7QUFFSjs7O1dBRUQsZ0JBQU87QUFDSCxjQUFRLEtBQUtsRyxLQUFiO0FBQ0ksYUFBSyxXQUFMO0FBQ0ksZUFBS0UsV0FBTCxJQUFvQixDQUFwQjs7QUFDQSxjQUFJLEtBQUtBLFdBQUwsS0FBcUIsRUFBekIsRUFBNkI7QUFDekIsaUJBQUtBLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxpQkFBS0wsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBRCxFQUFjLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBNUIsQ0FBWDtBQUNBLGlCQUFLRyxLQUFMLEdBQWEsV0FBYjtBQUNBbUYsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtwRixLQUFqQjtBQUNIOztBQUNEOztBQUNKLGFBQUssYUFBTDtBQUNJLGVBQUtFLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0EsY0FBSSxLQUFLQSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCO0FBQ3pCLGlCQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsaUJBQUtMLEdBQUwsR0FBVyxDQUFDLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBZixFQUFrQixLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFsQixDQUFYO0FBQ0EsaUJBQUtHLEtBQUwsR0FBYSxhQUFiO0FBQ0FtRixtQkFBTyxDQUFDQyxHQUFSLENBQVksS0FBS3BGLEtBQWpCO0FBQ0g7O0FBQ0Q7O0FBQ0osYUFBSyxhQUFMO0FBQ0ksZUFBS0UsV0FBTCxJQUFvQixDQUFwQjs7QUFDQSxjQUFJLEtBQUtBLFdBQUwsS0FBcUIsRUFBekIsRUFBNkI7QUFDekIsaUJBQUtBLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxpQkFBS0wsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBRCxFQUFjLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBNUIsQ0FBWDtBQUNBLGlCQUFLRyxLQUFMLEdBQWEsYUFBYjtBQUNBbUYsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtwRixLQUFqQjtBQUNIOztBQUNEOztBQUVKLGFBQUssY0FBTDtBQUNJLGVBQUtFLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0EsY0FBSSxLQUFLQSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCO0FBQ3pCLGlCQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsaUJBQUtMLEdBQUwsR0FBVyxDQUFDLEtBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBZixFQUFrQixLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFsQixDQUFYO0FBQ0EsaUJBQUtHLEtBQUwsR0FBYSxjQUFiO0FBQ0FtRixtQkFBTyxDQUFDQyxHQUFSLENBQVksS0FBS3BGLEtBQWpCO0FBQ0g7O0FBQ0Q7O0FBQ0o7QUFDSTtBQXZDUjtBQXlDSDs7O1dBRUQsZ0JBQU93QixHQUFQLEVBQVk7QUFFUixjQUFRLEtBQUt4QixLQUFiO0FBQ0ksYUFBSyxXQUFMO0FBQ0l3QixhQUFHLENBQUMyRSxTQUFKLENBQ0ksS0FBS3BCLE9BRFQsRUFFSSxFQUZKLEVBRU8sQ0FGUCxFQUVVO0FBQ04sWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtsRixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBSm5CLEVBS0ssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUxuQixFQU1JLEVBTkosRUFPSSxFQVBKO0FBU0E7O0FBQ0osYUFBSyxhQUFMO0FBQ0kyQixhQUFHLENBQUMyRSxTQUFKLENBQ0ksS0FBS3BCLE9BRFQsRUFFSSxFQUZKLEVBRU8sQ0FGUCxFQUVVO0FBQ04sWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtsRixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBSm5CLEVBS0ssS0FBS0EsR0FBTCxDQUFTLENBQVQsSUFBYyxFQUxuQixFQU1JLEVBTkosRUFPSSxFQVBKO0FBU0E7O0FBQ0osYUFBSyxhQUFMO0FBRUkyQixhQUFHLENBQUMyRSxTQUFKLENBQ0ksS0FBS3BCLE9BRFQsRUFFSSxDQUZKLEVBRU0sQ0FGTixFQUVTO0FBQ0wsWUFISixFQUdPLEVBSFAsRUFHVztBQUNOLGVBQUtsRixHQUFMLENBQVMsQ0FBVCxJQUFjLEVBSm5CLEVBSXdCO0FBQ25CLGVBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFMbkIsRUFNSSxFQU5KLEVBTVEsRUFOUixDQU1XO0FBTlg7QUFRQTs7QUFDSixhQUFLLGNBQUw7QUFDSTJCLGFBQUcsQ0FBQzJFLFNBQUosQ0FDSSxLQUFLcEIsT0FEVCxFQUVJLEdBRkosRUFFUSxDQUZSLEVBRVc7QUFDUCxZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS2xGLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBTG5CLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLFdBQUw7QUFDSTJCLGFBQUcsQ0FBQzJFLFNBQUosQ0FDSSxLQUFLcEIsT0FEVCxFQUVJLEVBRkosRUFFTyxDQUZQLEVBRVU7QUFDTixZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS2xGLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBTDFCLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLGFBQUw7QUFDSXNCLGFBQUcsQ0FBQzJFLFNBQUosQ0FDSSxLQUFLcEIsT0FEVCxFQUVJLEVBRkosRUFFTyxDQUZQLEVBRVU7QUFDTixZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS2xGLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFLSyxXQUFMLElBQW9CLEtBQUcsRUFBdkIsQ0FKMUIsRUFLSyxLQUFLTCxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBTG5CLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLGFBQUw7QUFDSTJCLGFBQUcsQ0FBQzJFLFNBQUosQ0FDSSxLQUFLcEIsT0FEVCxFQUVJLEVBRkosRUFFTyxDQUZQLEVBRVU7QUFDTixZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS2xGLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFKbkIsRUFLSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWYsR0FBc0IsS0FBS0ssV0FBTCxJQUFvQixLQUFHLEVBQXZCLENBTDFCLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSixhQUFLLGNBQUw7QUFDSXNCLGFBQUcsQ0FBQzJFLFNBQUosQ0FDSSxLQUFLcEIsT0FEVCxFQUVJLEdBRkosRUFFUSxDQUZSLEVBRVc7QUFDUCxZQUhKLEVBR08sRUFIUCxFQUdXO0FBQ04sZUFBS2xGLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZixHQUFzQixLQUFLSyxXQUFMLElBQW9CLEtBQUcsRUFBdkIsQ0FKMUIsRUFLSyxLQUFLTCxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBTG5CLEVBTUksRUFOSixFQU9JLEVBUEo7QUFTQTs7QUFDSjtBQUNJO0FBMUZSO0FBNEZIOzs7Ozs7QUFHTGlDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkssTUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztJQzdQTUosSTtBQUNGLGdCQUFZcEMsT0FBWixFQUFxQjtBQUFBOztBQUVqQixTQUFLQyxHQUFMLEdBQVdELE9BQU8sQ0FBQ0MsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsU0FBYjtBQUVIOzs7O1dBRUQsZ0JBQU8wQixHQUFQLEVBQVk7QUFDUkEsU0FBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUs5QixLQUFyQjtBQUNBMEIsU0FBRyxDQUFDUyxRQUFKLENBQ0ssS0FBS3BDLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFEbkIsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBRm5CLEVBR0ksRUFISixFQUlJLEVBSko7QUFNSDs7Ozs7O0FBR0xpQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLElBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBLElBQU1BLElBQUksR0FBR3RDLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0lBRU0yQyxJOzs7OztBQUNGLGdCQUFZekMsT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsT0FBTjtBQUNBLFVBQUtFLEtBQUwsR0FBYSxTQUFiO0FBRmlCO0FBR3BCOzs7O1dBRUQsZ0JBQU8wQixHQUFQLEVBQVk7QUFDUkEsU0FBRyxDQUFDSSxTQUFKLEdBQWdCLEtBQUs5QixLQUFyQjtBQUNBMEIsU0FBRyxDQUFDUyxRQUFKLENBQ0ssS0FBS3BDLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFEbkIsRUFFSyxLQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBRm5CLEVBR0ksRUFISixFQUlJLEVBSko7QUFNSDs7OztFQWRjbUMsSTs7QUFpQm5CRixNQUFNLENBQUNDLE9BQVAsR0FBaUJNLElBQWpCLEM7Ozs7Ozs7Ozs7OztBQ25CQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFDQSxJQUFNQyxJQUFJLEdBQUc1QyxtQkFBTyxDQUFDLDZCQUFELENBQXBCOztBQUNBLElBQU1pRSxRQUFRLEdBQUdqRSxtQkFBTyxDQUFDLHVDQUFELENBQXhCOztBQUVBMEcsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUNyRDtBQUNBLE1BQUlDLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJL0UsR0FBRyxHQUFHOEUsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQVYsQ0FIcUQsQ0FLckQ7O0FBRUEsTUFBSXpHLElBQUksR0FBRyxJQUFJdUMsSUFBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxDQUFYO0FBQ0FnRSxRQUFNLENBQUNHLEtBQVAsR0FBZTFHLElBQUksQ0FBQ3lDLFVBQXBCO0FBQ0E4RCxRQUFNLENBQUNJLE1BQVAsR0FBZ0IzRyxJQUFJLENBQUMwQyxXQUFyQjtBQUVBLE1BQUlrQixRQUFKLENBQWE1RCxJQUFiLEVBQW1CeUIsR0FBbkIsRUFBd0IrQyxLQUF4QjtBQUVILENBYkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcblxuY2xhc3MgQWxpZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgIH1cblxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiREVBRFwiO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgaWYgKG1hcFRpbGUgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGSUxMSU5HX1RSQVBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXBUaWxlLmRpZ0xldmVsID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiVFJBUFBFRFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA9PT0gdGhpcy5nYW1lLnBsYXllci5wb3NbMF0gJiZcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3RhdGUgPSBcIkRFQURcIjtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBkZWNpZGVOZXdTdGF0ZSgpIHtcbiAgICAgICAgLy9yYW5kb21seSBjaG9vc2UgZGlyZWN0aW9uXG4gICAgICAgIGxldCBkaXJzID0gW1xuICAgICAgICAgICAgWyAwLCAtMV0sIC8vdXBcbiAgICAgICAgICAgIFstMSwgIDBdLCAvL2xlZnRcbiAgICAgICAgICAgIFsgMCwgIDFdLCAgLy9kb3duXG4gICAgICAgICAgICBbIDEsICAwXSAgIC8vcmlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgbGVnYWxEaXJJZHhzID0gW107XG4gICAgICAgIC8vZ2V0IHJpZCBvZiBpbGxlZ2FsIHBvc2l0aW9uc1xuICAgICAgICBkaXJzLmZvckVhY2goKGRpciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3UG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKG5ld1BvcykpIHtcbiAgICAgICAgICAgICAgICBsZWdhbERpcklkeHMucHVzaChpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBmbG9vckRpcklkeHMgPSBbXTtcbiAgICAgICAgbGVnYWxEaXJJZHhzLmZvckVhY2goKGRpcmlkeCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3UG9zID0gW3RoaXMucG9zWzBdICsgZGlyc1tkaXJpZHhdWzBdLCB0aGlzLnBvc1sxXSArIGRpcnNbZGlyaWR4XVsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXdQb3MpIGluc3RhbmNlb2YgRmxvb3IpIHtcbiAgICAgICAgICAgICAgICBmbG9vckRpcklkeHMucHVzaChkaXJpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vZ2V0IHJhbmRvbSBtb3ZlXG4gICAgICAgIGxldCBpbmRleCA9IGZsb29yRGlySWR4c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmbG9vckRpcklkeHMubGVuZ3RoKV07XG5cbiAgICAgICAgbGV0IG5ld1N0YXRlID0gXCJcIjtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXSBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZSh0aGlzLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFRpbGUuZGlnTGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUUkFQUEVEXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNjApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMikgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFJBUFBFRFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWxpZW47IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBGbG9vciBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzFhOTM2ZlwiXG4gICAgICAgIHRoaXMuZGlnTGV2ZWwgPSAwO1xuXG4gICAgfVxuXG4gICAgZmlsbCgpIHtcblxuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ0xldmVsIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlnKCkge1xuICAgICAgICBpZiAodGhpcy5kaWdMZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpZ0xldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmxvb3I7IiwiY29uc3QgUGxheWVyID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xuY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcbmNvbnN0IFdhbGwgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xuY29uc3QgQWxpZW4gPSByZXF1aXJlKFwiLi9hbGllblwiKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IocGxheWVycG9zKSB7XG4gICAgICAgIHRoaXMuVklFV19XSURUSCA9IDY0MDtcbiAgICAgICAgdGhpcy5WSUVXX0hFSUdIVCA9IDU3NjtcbiAgICAgICAgdGhpcy5XSURUSCA9IDEwO1xuICAgICAgICB0aGlzLkhFSUdIVCA9IDk7XG4gICAgICAgIHRoaXMuRlBTID0gNjA7XG4gICAgICAgIHRoaXMuQkdfQ09MT1IgPSBcIiNmZjU3MzNcIjtcblxuICAgICAgICB0aGlzLm1hcCA9IFtcbiAgICAgICAgICAgIFswLDEsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDEsMCwwLDAsMCwxLDEsMCwxXSxcbiAgICAgICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDEsMSwxLDAsMCwwXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMSwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMCwxLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFswLDEsMCwxLDAsMSwxLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMCwwLDAsMSwwLDAsMCwwXSxcbiAgICAgICAgICAgIFswLDAsMSwxLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5tYXApO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogcGxheWVycG9zIH0pO1xuICAgICAgICB0aGlzLmFsaWVucyA9IFtcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbMCwgOF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNCwgNF19KSxcbiAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNSwgNV19KVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuU1RBVEUgPSBcIk1BSU5fTUVOVVwiO1xuXG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gW107XG4gICAgfVxuXG4gICAgLy8gWyBob3Jpem9udGFsLCB2ZXJ0aWNhbCBdXG4gICAgZ2V0TWFwVGlsZShwb3MpIHtcbiAgICAgICAgaWYocG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBbcG9zWzFdXVtwb3NbMF1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0cnVlIGlmIHBvcyBpcyBvbiB0aGUgYm9hcmQsIGZhbHNlIGlmIG90aGVyd2lzZVxuICAgIGlzTGVnYWxQb3NpdGlvbihwb3MpIHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgaWYoIHBvc1swXSA+PSAwICYmIHBvc1swXSA8IHRoaXMubWFwWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICggcG9zWzFdID49IDAgJiYgcG9zWzFdIDwgdGhpcy5tYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9naXZlbiBhIGdyaWQsIHNldCB0aGlzLmdyaWQgdG8gYW4gYXJyYXkgb2YgdGhlIGNsYXNzZXNcbiAgICBhZGRNYXAobWFwKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuXG4gICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAwIGlzIGZsb29yXG4gICAgICAgICAgICAgICAgaWYgKHNxdWFyZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBGbG9vcih7cG9zOiBbY29sX2ksIHJvd19pXX0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vMSBpcyB3YWxsXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcXVhcmUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBXYWxsKHtwb3M6IFtjb2xfaSwgcm93X2ldfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBtb3ZlT2JqZWN0cygpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICBhbGllbi5tb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfVxuXG4gICAgc3RlcCgpIHtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICB0aGlzLm1vdmVPYmplY3RzKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vcmVuZGVyIHRoZSBjdXJyZW50IGdhbWVzdGF0ZVxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLkJHX0NPTE9SO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5yZW5kZXIoY3R4KTsgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgYWN0b3JzXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiBcblxuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9iaW5kIGtleXMgdG8gbW92ZXNcbiAgICBiaW5kS2V5cygpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5ESVJTKS5mb3JFYWNoKCAoaykgPT4geyAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5KGssICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKGspKVxuICAgICAgICB9KVxuXG4gICAgICAgIGtleShcImtcIiwgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoXCJrXCIpKTtcbiAgICAgICAga2V5KFwialwiLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShcImpcIikpO1xuICAgICAgICBrZXkoXCJlbnRlclwiLCAoKSA9PiB0aGlzLmdhbWUuc3RhcnQoKSk7XG4gICAgfVxuXG4gICAgLy9ydW4gdGhlIGdhbWVcbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5iaW5kS2V5cygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKHRpbWUpIHtcbiAgICAgICAgLy9jaGFuZ2UgaW4gdGltZSBpcyBjdXJyZW50IHRpbWUgLSBsYXN0IHRpbWVcbiAgICAgICAgbGV0IHRpbWVEZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xuXG4gICAgICAgIC8vaWYgdGltZSBoYXMgY2hhbmdlZCBtb3JlIHRoYW4gMTYgbXNcbiAgICAgICAgaWYgKHRpbWVEZWx0YSA+IDE2LjY2KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RlcCgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnJlbmRlcih0aGlzLmN0eCk7XG5cbiAgICAgICAgICAgIC8vbGFzdFRpbWUgaXMgY3VycmVudCB0aW1lXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZSArICh0aW1lRGVsdGEgLSAxNi42Nik7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCJjb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5cblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5zcmMgPSAnaHR0cHM6Ly9waGlsb3dlOTQuZ2l0aHViLmlvL2hlaWFua3lvLWFsaWVuL2Fzc2V0cy9jaGliaS1sYXllcmVkLnBuZyc7XG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZyhkaWdwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRJR0dJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpZ3Bvcyk7XG4gICAgICAgIGxldCBkaWdUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZGlncG9zKTtcbiAgICAgICAgaWYgKGRpZ1RpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBkaWdUaWxlLmRpZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGlnVGlsZS5kaWdMZXZlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxsKGZpbGxwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZJTExJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGxwb3MpO1xuICAgICAgICBsZXQgZmlsbFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShmaWxscG9zKTtcbiAgICAgICAgaWYgKGZpbGxUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGxUaWxlLnBvc1swXSA9PT0gYWxpZW4ucG9zWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGlsZS5wb3NbMV0gPT09IGFsaWVuLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWVuLmRpZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPj0gMSkge1xuICAgICAgICAgICAgICAgIGZpbGxUaWxlLmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERpZ1BvcygpIHtcbiAgICAgICAgbGV0IGRpcnNTdGF0ZXMgPSBbXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1JJR0hUXCJdO1xuICAgICAgICBsZXQgZGlySWR4ID0gZGlyc1N0YXRlcy5pbmRleE9mKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmIChkaXJJZHggPj0wKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gT2JqZWN0LnZhbHVlcyh0aGlzLkRJUlMpW2RpcklkeF07XG4gICAgICAgICAgICBsZXQgZGlnUG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKGRpZ1BvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRfc3RhdGUoaykge1xuICAgICAgICBsZXQgbmV4dFBvcyA9IFtdO1xuXG4gICAgICAgIGlmIChbXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX1JJR0hUXCJdLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV0pIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwia1wiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlnUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWcoZGlnUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImpcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGxQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGwoZmlsbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAzMiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCAvLyBvZmZzZXQgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCA2NCAvLyBzaXplIG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNDQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA4MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA2NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDQ4LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNjAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzIyMjIyMlwiXG5cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGU7IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBXYWxsIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzExNGI1ZlwiXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICA2NFxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xuY29uc3QgR2FtZVZpZXcgPSByZXF1aXJlKFwiLi9nYW1lX3ZpZXdcIik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vY2FudmFzIHJlc2VhcmNoXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWNhbnZhcycpO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIC8vc2V0IHVwIGdhbWVcblxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoWzAsMF0pO1xuICAgIGNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZ2FtZS5WSUVXX0hFSUdIVDtcblxuICAgIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgpLnN0YXJ0KCk7XG5cbn0pO1xuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
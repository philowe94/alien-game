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
        this.game.gameOver();
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
    this.view = 0;
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
    key: "step",
    value: function step() {
      if (this.view === 1) {
        this.moveObjects();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.view = 1;
    } //render the current gamestate

  }, {
    key: "render",
    value: function render(ctx) {
      if (this.view === 0) {
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
      } else if (this.view === 1) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImdhbWVPdmVyIiwiZGlycyIsImxlZ2FsRGlySWR4cyIsImZvckVhY2giLCJkaXIiLCJpZHgiLCJuZXdQb3MiLCJpc0xlZ2FsUG9zaXRpb24iLCJwdXNoIiwiZmxvb3JEaXJJZHhzIiwiZGlyaWR4IiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJuZXdTdGF0ZSIsImNoZWNrQ29sbGlzaW9uIiwiY3R4IiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJmaWxsU3R5bGUiLCJmaWxsIiwibW9kdWxlIiwiZXhwb3J0cyIsIlRpbGUiLCJmaWxsUmVjdCIsImxpbmVXaWR0aCIsInN0cm9rZSIsIlBsYXllciIsIldhbGwiLCJHYW1lIiwicGxheWVycG9zIiwiVklFV19XSURUSCIsIlZJRVdfSEVJR0hUIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsIm1hcCIsImFkZE1hcCIsImFsaWVucyIsInZpZXciLCJyb3ciLCJyb3dfaSIsInNxdWFyZSIsImNvbF9pIiwibW92ZSIsImFsaWVuIiwibW92ZU9iamVjdHMiLCJjbGVhclJlY3QiLCJyZW5kZXIiLCJHYW1lVmlldyIsImxhc3RUaW1lIiwiRElSUyIsInciLCJhIiwicyIsImQiLCJPYmplY3QiLCJrZXlzIiwiayIsImtleSIsInNldF9zdGF0ZSIsInN0YXJ0IiwiYmluZEtleXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhbmltYXRlIiwiYmluZCIsInRpbWUiLCJ0aW1lRGVsdGEiLCJzdGVwIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwiZGlncG9zIiwiY29uc29sZSIsImxvZyIsImRpZ1RpbGUiLCJkaWciLCJmaWxscG9zIiwiZmlsbFRpbGUiLCJkaWUiLCJkaXJzU3RhdGVzIiwiZGlySWR4IiwiaW5kZXhPZiIsInZhbHVlcyIsImRpZ1BvcyIsIm5leHRQb3MiLCJpbmNsdWRlcyIsImdldERpZ1BvcyIsImZpbGxQb3MiLCJkcmF3SW1hZ2UiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxtQkFBTyxDQUFDLCtCQUFELENBQXJCOztJQUVNQyxLO0FBQ0YsaUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsU0FBS0MsR0FBTCxHQUFXRCxPQUFPLENBQUNDLEdBQW5CO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLFNBQWI7QUFD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OEMsWUFBVztBQUNyRDtBQUNBLE1BQUlDLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJL0UsR0FBRyxHQUFHOEUsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQVYsQ0FIcUQsQ0FLckQ7O0FBRUEsTUFBSTFHLElBQUksR0FBRyxJQUFJd0MsSUFBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxDQUFYO0FBQ0FnRSxRQUFNLENBQUNHLEtBQVAsR0FBZTNHLElBQUksQ0FBQzBDLFVBQXBCO0FBQ0E4RCxRQUFNLENBQUNJLE1BQVAsR0FBZ0I1RyxJQUFJLENBQUMyQyxXQUFyQjtBQUVBLE1BQUlrQixRQUFKLENBQWE3RCxJQUFiLEVBQW1CMEIsR0FBbkIsRUFBd0IrQyxLQUF4QjtBQUVILENBYkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcblxuY2xhc3MgQWxpZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgIH1cblxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiREVBRFwiO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgaWYgKG1hcFRpbGUgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGSUxMSU5HX1RSQVBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXBUaWxlLmRpZ0xldmVsID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiVFJBUFBFRFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA9PT0gdGhpcy5nYW1lLnBsYXllci5wb3NbMF0gJiZcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGRlY2lkZU5ld1N0YXRlKCkge1xuICAgICAgICAvL3JhbmRvbWx5IGNob29zZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbIDAsIC0xXSwgLy91cFxuICAgICAgICAgICAgWy0xLCAgMF0sIC8vbGVmdFxuICAgICAgICAgICAgWyAwLCAgMV0sICAvL2Rvd25cbiAgICAgICAgICAgIFsgMSwgIDBdICAgLy9yaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBsZWdhbERpcklkeHMgPSBbXTtcbiAgICAgICAgLy9nZXQgcmlkIG9mIGlsbGVnYWwgcG9zaXRpb25zXG4gICAgICAgIGRpcnMuZm9yRWFjaCgoZGlyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24obmV3UG9zKSkge1xuICAgICAgICAgICAgICAgIGxlZ2FsRGlySWR4cy5wdXNoKGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGZsb29yRGlySWR4cyA9IFtdO1xuICAgICAgICBsZWdhbERpcklkeHMuZm9yRWFjaCgoZGlyaWR4LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJzW2RpcmlkeF1bMF0sIHRoaXMucG9zWzFdICsgZGlyc1tkaXJpZHhdWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5ld1BvcykgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgICAgIGZsb29yRGlySWR4cy5wdXNoKGRpcmlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9nZXQgcmFuZG9tIG1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gZmxvb3JEaXJJZHhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZsb29yRGlySWR4cy5sZW5ndGgpXTtcblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGlsZS5kaWdMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMikgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUUkFQUEVEXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBbGllbjsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMWE5MzZmXCJcbiAgICAgICAgdGhpcy5kaWdMZXZlbCA9IDA7XG5cbiAgICB9XG5cbiAgICBmaWxsKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkaWcoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsIDwgMikge1xuICAgICAgICAgICAgdGhpcy5kaWdMZXZlbCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlnTGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbG9vcjsiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5jb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5jb25zdCBBbGllbiA9IHJlcXVpcmUoXCIuL2FsaWVuXCIpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJwb3MpIHtcbiAgICAgICAgdGhpcy5WSUVXX1dJRFRIID0gNjQwO1xuICAgICAgICB0aGlzLlZJRVdfSEVJR0hUID0gNTc2O1xuICAgICAgICB0aGlzLldJRFRIID0gMTA7XG4gICAgICAgIHRoaXMuSEVJR0hUID0gOTtcbiAgICAgICAgdGhpcy5GUFMgPSA2MDtcbiAgICAgICAgdGhpcy5CR19DT0xPUiA9IFwiI2ZmNTczM1wiO1xuXG4gICAgICAgIHRoaXMubWFwID0gW1xuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMSwwLDAsMCwwLDEsMSwwLDFdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMSwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDEsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzAsMSwwLDEsMCwxLDEsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwwLDAsMCwxLDAsMCwwLDBdLFxuICAgICAgICAgICAgWzAsMCwxLDEsMCwwLDAsMCwwLDBdLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmFkZE1hcCh0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7Z2FtZTogdGhpcywgcG9zOiBwbGF5ZXJwb3MgfSk7XG4gICAgICAgIHRoaXMuYWxpZW5zID0gW1xuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs0LCA0XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs1LCA1XX0pXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy52aWV3ID0gMDtcblxuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IFtdO1xuICAgIH1cblxuICAgIC8vIFsgaG9yaXpvbnRhbCwgdmVydGljYWwgXVxuICAgIGdldE1hcFRpbGUocG9zKSB7XG4gICAgICAgIGlmKHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwW3Bvc1sxXV1bcG9zWzBdXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBwb3MgaXMgb24gdGhlIGJvYXJkLCBmYWxzZSBpZiBvdGhlcndpc2VcbiAgICBpc0xlZ2FsUG9zaXRpb24ocG9zKSB7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIGlmKCBwb3NbMF0gPj0gMCAmJiBwb3NbMF0gPCB0aGlzLm1hcFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHBvc1sxXSA+PSAwICYmIHBvc1sxXSA8IHRoaXMubWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vZ2l2ZW4gYSBncmlkLCBzZXQgdGhpcy5ncmlkIHRvIGFuIGFycmF5IG9mIHRoZSBjbGFzc2VzXG4gICAgYWRkTWFwKG1hcCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcblxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMCBpcyBmbG9vclxuICAgICAgICAgICAgICAgIGlmIChzcXVhcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgRmxvb3Ioe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLzEgaXMgd2FsbFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgV2FsbCh7cG9zOiBbY29sX2ksIHJvd19pXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmUoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgYWxpZW4ubW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZU9iamVjdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnZpZXcgPSAxO1xuICAgIH1cblxuICAgIC8vcmVuZGVyIHRoZSBjdXJyZW50IGdhbWVzdGF0ZVxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAwKSB7XG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5CR19DT0xPUjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgLy9yZW5kZXIgdGhlIGFjdG9yc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICBhbGllbi5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSAxKSB7XG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5CR19DT0xPUjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgLy9yZW5kZXIgdGhlIGFjdG9yc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICBhbGllbi5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjbGFzcyBHYW1lVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuIFxuXG4gICAgICAgIHRoaXMuRElSUyA9IHtcbiAgICAgICAgICAgIHc6IFswLCAtMV0sXG4gICAgICAgICAgICBhOiBbLTEsIDBdLFxuICAgICAgICAgICAgczogWzAsIDFdLFxuICAgICAgICAgICAgZDogWzEsIDBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JpbmQga2V5cyB0byBtb3Zlc1xuICAgIGJpbmRLZXlzKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLkRJUlMpLmZvckVhY2goIChrKSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXkoaywgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoaykpXG4gICAgICAgIH0pXG5cbiAgICAgICAga2V5KFwia1wiLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShcImtcIikpO1xuICAgICAgICBrZXkoXCJqXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwialwiKSk7XG4gICAgICAgIGtleShcImVudGVyXCIsICgpID0+IHRoaXMuZ2FtZS5zdGFydCgpKTtcbiAgICB9XG5cbiAgICAvL3J1biB0aGUgZ2FtZVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmJpbmRLZXlzKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUodGltZSkge1xuICAgICAgICAvL2NoYW5nZSBpbiB0aW1lIGlzIGN1cnJlbnQgdGltZSAtIGxhc3QgdGltZVxuICAgICAgICBsZXQgdGltZURlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG5cbiAgICAgICAgLy9pZiB0aW1lIGhhcyBjaGFuZ2VkIG1vcmUgdGhhbiAxNiBtc1xuICAgICAgICBpZiAodGltZURlbHRhID4gMTYuNjYpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUucmVuZGVyKHRoaXMuY3R4KTtcblxuICAgICAgICAgICAgLy9sYXN0VGltZSBpcyBjdXJyZW50IHRpbWVcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lICsgKHRpbWVEZWx0YSAtIDE2LjY2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsImNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcblxuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiO1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdodHRwczovL3BoaWxvd2U5NC5naXRodWIuaW8vaGVpYW5reW8tYWxpZW4vYXNzZXRzL2NoaWJpLWxheWVyZWQucG5nJztcblxuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlnKGRpZ3Bvcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRElHR0lOR1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGlncG9zKTtcbiAgICAgICAgbGV0IGRpZ1RpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShkaWdwb3MpO1xuICAgICAgICBpZiAoZGlnVGlsZSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgIGRpZ1RpbGUuZGlnKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbGwoZmlsbHBvcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRklMTElOR1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coZmlsbHBvcyk7XG4gICAgICAgIGxldCBmaWxsVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKGZpbGxwb3MpO1xuICAgICAgICBpZiAoZmlsbFRpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsbFRpbGUucG9zWzBdID09PSBhbGllbi5wb3NbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxUaWxlLnBvc1sxXSA9PT0gYWxpZW4ucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZW4uZGllKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWxsVGlsZS5kaWdMZXZlbCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgZmlsbFRpbGUuZmlsbCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZ1RpbGUuZGlnTGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGlnUG9zKCkge1xuICAgICAgICBsZXQgZGlyc1N0YXRlcyA9IFtcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX0RPV05cIiwgXCJGQUNJTkdfUklHSFRcIl07XG4gICAgICAgIGxldCBkaXJJZHggPSBkaXJzU3RhdGVzLmluZGV4T2YodGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKGRpcklkeCA+PTApIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSBPYmplY3QudmFsdWVzKHRoaXMuRElSUylbZGlySWR4XTtcbiAgICAgICAgICAgIGxldCBkaWdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24oZGlnUG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaWdQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldF9zdGF0ZShrKSB7XG4gICAgICAgIGxldCBuZXh0UG9zID0gW107XG5cbiAgICAgICAgaWYgKFtcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1VQXCIsIFwiRkFDSU5HX0xFRlRcIiwgXCJGQUNJTkdfUklHSFRcIl0uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ3XCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXSkgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYVwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV0gXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkXCI6XG4gICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJrXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWdQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpZyhkaWdQb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwialwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbFBvcyA9IHRoaXMuZ2V0RGlnUG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbChmaWxsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19VUFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDMyLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIC8vIG9mZnNldCBvbiBjYW52YXNcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIDY0IC8vIHNpemUgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE0NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDgwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDY0LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgNDgsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMjIyMjIyXCJcblxuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgNjRcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZTsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIFdhbGwgZXh0ZW5kcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMTE0YjVmXCJcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy9jYW52YXMgcmVzZWFyY2hcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy9zZXQgdXAgZ2FtZVxuXG4gICAgbGV0IGdhbWUgPSBuZXcgR2FtZShbMCwwXSk7XG4gICAgY2FudmFzLndpZHRoID0gZ2FtZS5WSUVXX1dJRFRIO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBnYW1lLlZJRVdfSEVJR0hUO1xuXG4gICAgbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCkuc3RhcnQoKTtcblxufSk7XG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
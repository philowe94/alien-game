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
      this.moveObjects();
    } //render the current gamestate

  }, {
    key: "render",
    value: function render(ctx) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImdhbWVPdmVyIiwiZGlycyIsImxlZ2FsRGlySWR4cyIsImZvckVhY2giLCJkaXIiLCJpZHgiLCJuZXdQb3MiLCJpc0xlZ2FsUG9zaXRpb24iLCJwdXNoIiwiZmxvb3JEaXJJZHhzIiwiZGlyaWR4IiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJuZXdTdGF0ZSIsImNoZWNrQ29sbGlzaW9uIiwiY3R4IiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJmaWxsU3R5bGUiLCJmaWxsIiwibW9kdWxlIiwiZXhwb3J0cyIsIlRpbGUiLCJmaWxsUmVjdCIsImxpbmVXaWR0aCIsInN0cm9rZSIsIlBsYXllciIsIldhbGwiLCJHYW1lIiwicGxheWVycG9zIiwiVklFV19XSURUSCIsIlZJRVdfSEVJR0hUIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsIm1hcCIsImFkZE1hcCIsImFsaWVucyIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImNsZWFyUmVjdCIsInJlbmRlciIsIkdhbWVWaWV3IiwibGFzdFRpbWUiLCJESVJTIiwidyIsImEiLCJzIiwiZCIsIk9iamVjdCIsImtleXMiLCJrIiwia2V5Iiwic2V0X3N0YXRlIiwiYmluZEtleXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhbmltYXRlIiwiYmluZCIsInRpbWUiLCJ0aW1lRGVsdGEiLCJzdGVwIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwiZGlncG9zIiwiY29uc29sZSIsImxvZyIsImRpZ1RpbGUiLCJkaWciLCJmaWxscG9zIiwiZmlsbFRpbGUiLCJkaWUiLCJkaXJzU3RhdGVzIiwiZGlySWR4IiwiaW5kZXhPZiIsInZhbHVlcyIsImRpZ1BvcyIsIm5leHRQb3MiLCJpbmNsdWRlcyIsImdldERpZ1BvcyIsImZpbGxQb3MiLCJkcmF3SW1hZ2UiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1DLEs7QUFDRixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQyxHQUFMLEdBQVdELE9BQU8sQ0FBQ0MsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsU0FBYjtBQUNBLFNBQUtD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RUF5RyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3JEO0FBQ0EsTUFBSUMsTUFBTSxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBYjtBQUNBLE1BQUk3RSxHQUFHLEdBQUc0RSxNQUFNLENBQUNFLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVixDQUhxRCxDQUtyRDs7QUFFQSxNQUFJeEcsSUFBSSxHQUFHLElBQUl3QyxJQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULENBQVg7QUFDQThELFFBQU0sQ0FBQ0csS0FBUCxHQUFlekcsSUFBSSxDQUFDMEMsVUFBcEI7QUFDQTRELFFBQU0sQ0FBQ0ksTUFBUCxHQUFnQjFHLElBQUksQ0FBQzJDLFdBQXJCO0FBRUEsTUFBSWlCLFFBQUosQ0FBYTVELElBQWIsRUFBbUIwQixHQUFuQixFQUF3QmlGLEtBQXhCO0FBRUgsQ0FiRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuXG5jbGFzcyBBbGllbiB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgfVxuXG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJERUFEXCI7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICBpZiAobWFwVGlsZSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICBpZiAobWFwVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZJTExJTkdfVFJBUFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJUUkFQUEVEXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1swXSAmJlxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPT09IHRoaXMuZ2FtZS5wbGF5ZXIucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgZGVjaWRlTmV3U3RhdGUoKSB7XG4gICAgICAgIC8vcmFuZG9tbHkgY2hvb3NlIGRpcmVjdGlvblxuICAgICAgICBsZXQgZGlycyA9IFtcbiAgICAgICAgICAgIFsgMCwgLTFdLCAvL3VwXG4gICAgICAgICAgICBbLTEsICAwXSwgLy9sZWZ0XG4gICAgICAgICAgICBbIDAsICAxXSwgIC8vZG93blxuICAgICAgICAgICAgWyAxLCAgMF0gICAvL3JpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGxlZ2FsRGlySWR4cyA9IFtdO1xuICAgICAgICAvL2dldCByaWQgb2YgaWxsZWdhbCBwb3NpdGlvbnNcbiAgICAgICAgZGlycy5mb3JFYWNoKChkaXIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1BvcyA9IFt0aGlzLnBvc1swXSArIGRpclswXSwgdGhpcy5wb3NbMV0gKyBkaXJbMV1dXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmlzTGVnYWxQb3NpdGlvbihuZXdQb3MpKSB7XG4gICAgICAgICAgICAgICAgbGVnYWxEaXJJZHhzLnB1c2goaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZmxvb3JEaXJJZHhzID0gW107XG4gICAgICAgIGxlZ2FsRGlySWR4cy5mb3JFYWNoKChkaXJpZHgsIGlkeCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1BvcyA9IFt0aGlzLnBvc1swXSArIGRpcnNbZGlyaWR4XVswXSwgdGhpcy5wb3NbMV0gKyBkaXJzW2RpcmlkeF1bMV1dXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV3UG9zKSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICAgICAgZmxvb3JEaXJJZHhzLnB1c2goZGlyaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvL2dldCByYW5kb20gbW92ZVxuICAgICAgICBsZXQgaW5kZXggPSBmbG9vckRpcklkeHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmxvb3JEaXJJZHhzLmxlbmd0aCldO1xuXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IFwiXCI7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IFwiTU9WSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19ET1dOXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV0gXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZJTExJTkdfVFJBUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICAgICAgICAgICAgICBtYXBUaWxlLmRpZ0xldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFJBUFBFRFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMikgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMikgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZJTExJTkdfVFJBUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgMjAsIFxuICAgICAgICAgICAgICAgICAgICAyICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFsaWVuOyIsImNvbnN0IFRpbGUgPSByZXF1aXJlKCcuL3RpbGUnKTtcblxuY2xhc3MgRmxvb3IgZXh0ZW5kcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMxYTkzNmZcIlxuICAgICAgICB0aGlzLmRpZ0xldmVsID0gMDtcblxuICAgIH1cblxuICAgIGZpbGwoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlnTGV2ZWwgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaWdMZXZlbCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRpZygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlnTGV2ZWwgPCAyKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ0xldmVsICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5kaWdMZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb29yOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcbmNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcbmNvbnN0IEFsaWVuID0gcmVxdWlyZShcIi4vYWxpZW5cIik7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcnBvcykge1xuICAgICAgICB0aGlzLlZJRVdfV0lEVEggPSA2NDA7XG4gICAgICAgIHRoaXMuVklFV19IRUlHSFQgPSA1NzY7XG4gICAgICAgIHRoaXMuV0lEVEggPSAxMDtcbiAgICAgICAgdGhpcy5IRUlHSFQgPSA5O1xuICAgICAgICB0aGlzLkZQUyA9IDYwO1xuICAgICAgICB0aGlzLkJHX0NPTE9SID0gXCIjZmY1NzMzXCI7XG5cbiAgICAgICAgdGhpcy5tYXAgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMSwxLDAsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwxLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMSwwLDAsMCwwLDAsMF0sXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuYWRkTWFwKHRoaXMubWFwKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtnYW1lOiB0aGlzLCBwb3M6IHBsYXllcnBvcyB9KTtcbiAgICAgICAgdGhpcy5hbGllbnMgPSBbXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzAsIDhdfSksXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzQsIDRdfSksXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzUsIDVdfSlcbiAgICAgICAgXTtcblxuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IFtdO1xuICAgIH1cblxuICAgIC8vIFsgaG9yaXpvbnRhbCwgdmVydGljYWwgXVxuICAgIGdldE1hcFRpbGUocG9zKSB7XG4gICAgICAgIGlmKHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwW3Bvc1sxXV1bcG9zWzBdXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBwb3MgaXMgb24gdGhlIGJvYXJkLCBmYWxzZSBpZiBvdGhlcndpc2VcbiAgICBpc0xlZ2FsUG9zaXRpb24ocG9zKSB7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIGlmKCBwb3NbMF0gPj0gMCAmJiBwb3NbMF0gPCB0aGlzLm1hcFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHBvc1sxXSA+PSAwICYmIHBvc1sxXSA8IHRoaXMubWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vZ2l2ZW4gYSBncmlkLCBzZXQgdGhpcy5ncmlkIHRvIGFuIGFycmF5IG9mIHRoZSBjbGFzc2VzXG4gICAgYWRkTWFwKG1hcCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcblxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMCBpcyBmbG9vclxuICAgICAgICAgICAgICAgIGlmIChzcXVhcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgRmxvb3Ioe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLzEgaXMgd2FsbFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgV2FsbCh7cG9zOiBbY29sX2ksIHJvd19pXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLm1vdmUoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgYWxpZW4ubW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgICB0aGlzLm1vdmVPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgLy9yZW5kZXIgdGhlIGN1cnJlbnQgZ2FtZXN0YXRlXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLkJHX0NPTE9SO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAvL3JlbmRlciB0aGUgYWN0b3JzXG4gICAgICAgIHRoaXMucGxheWVyLnJlbmRlcihjdHgpO1xuICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgIGFsaWVuLnJlbmRlcihjdHgpO1xuICAgICAgICB9KVxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY2xhc3MgR2FtZVZpZXcge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiBcblxuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9iaW5kIGtleXMgdG8gbW92ZXNcbiAgICBiaW5kS2V5cygpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5ESVJTKS5mb3JFYWNoKCAoaykgPT4geyAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5KGssICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKGspKVxuICAgICAgICB9KVxuXG4gICAgICAgIGtleShcImtcIiwgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoXCJrXCIpKTtcbiAgICAgICAga2V5KFwialwiLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShcImpcIikpO1xuICAgIH1cblxuICAgIC8vcnVuIHRoZSBnYW1lXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYmluZEtleXMoKTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKHRpbWUpIHtcbiAgICAgICAgLy9jaGFuZ2UgaW4gdGltZSBpcyBjdXJyZW50IHRpbWUgLSBsYXN0IHRpbWVcbiAgICAgICAgbGV0IHRpbWVEZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xuXG4gICAgICAgIC8vaWYgdGltZSBoYXMgY2hhbmdlZCBtb3JlIHRoYW4gMTYgbXNcbiAgICAgICAgaWYgKHRpbWVEZWx0YSA+IDE2LjY2KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RlcCgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnJlbmRlcih0aGlzLmN0eCk7XG5cbiAgICAgICAgICAgIC8vbGFzdFRpbWUgaXMgY3VycmVudCB0aW1lXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZSArICh0aW1lRGVsdGEgLSAxNi42Nik7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCJjb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5cblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5zcmMgPSAnaHR0cHM6Ly9waGlsb3dlOTQuZ2l0aHViLmlvL2hlaWFua3lvLWFsaWVuL2Fzc2V0cy9jaGliaS1sYXllcmVkLnBuZyc7XG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZyhkaWdwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRJR0dJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpZ3Bvcyk7XG4gICAgICAgIGxldCBkaWdUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZGlncG9zKTtcbiAgICAgICAgaWYgKGRpZ1RpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBkaWdUaWxlLmRpZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGlnVGlsZS5kaWdMZXZlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxsKGZpbGxwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZJTExJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGxwb3MpO1xuICAgICAgICBsZXQgZmlsbFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShmaWxscG9zKTtcbiAgICAgICAgaWYgKGZpbGxUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGxUaWxlLnBvc1swXSA9PT0gYWxpZW4ucG9zWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGlsZS5wb3NbMV0gPT09IGFsaWVuLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWVuLmRpZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPj0gMSkge1xuICAgICAgICAgICAgICAgIGZpbGxUaWxlLmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERpZ1BvcygpIHtcbiAgICAgICAgbGV0IGRpcnNTdGF0ZXMgPSBbXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1JJR0hUXCJdO1xuICAgICAgICBsZXQgZGlySWR4ID0gZGlyc1N0YXRlcy5pbmRleE9mKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmIChkaXJJZHggPj0wKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gT2JqZWN0LnZhbHVlcyh0aGlzLkRJUlMpW2RpcklkeF07XG4gICAgICAgICAgICBsZXQgZGlnUG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKGRpZ1BvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRfc3RhdGUoaykge1xuICAgICAgICBsZXQgbmV4dFBvcyA9IFtdO1xuXG4gICAgICAgIGlmIChbXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX1JJR0hUXCJdLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV0pIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwia1wiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlnUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWcoZGlnUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImpcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGxQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGwoZmlsbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAzMiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCAvLyBvZmZzZXQgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCA2NCAvLyBzaXplIG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNDQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA4MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA2NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDQ4LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNjAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzIyMjIyMlwiXG5cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGU7IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBXYWxsIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzExNGI1ZlwiXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICA2NFxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xuY29uc3QgR2FtZVZpZXcgPSByZXF1aXJlKFwiLi9nYW1lX3ZpZXdcIik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vY2FudmFzIHJlc2VhcmNoXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWNhbnZhcycpO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIC8vc2V0IHVwIGdhbWVcblxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoWzAsMF0pO1xuICAgIGNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZ2FtZS5WSUVXX0hFSUdIVDtcblxuICAgIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgpLnN0YXJ0KCk7XG5cbn0pO1xuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
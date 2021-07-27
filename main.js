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
    this.STATE = "MAIN_MENU";
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

        default:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmxvb3IiLCJyZXF1aXJlIiwiQWxpZW4iLCJvcHRpb25zIiwicG9zIiwiY29sb3IiLCJnYW1lIiwic3RhdGUiLCJkZWNpZGVOZXdTdGF0ZSIsInN0YXRlX3RpbWVyIiwic3ByaXRlcyIsIkltYWdlIiwic3JjIiwibWFwVGlsZSIsImdldE1hcFRpbGUiLCJkaWdMZXZlbCIsInBsYXllciIsImRpcnMiLCJsZWdhbERpcklkeHMiLCJmb3JFYWNoIiwiZGlyIiwiaWR4IiwibmV3UG9zIiwiaXNMZWdhbFBvc2l0aW9uIiwicHVzaCIsImZsb29yRGlySWR4cyIsImRpcmlkeCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3U3RhdGUiLCJjaGVja0NvbGxpc2lvbiIsImN0eCIsInhvZmZzZXQiLCJkcmF3SW1hZ2UiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsIlBsYXllciIsIldhbGwiLCJHYW1lIiwicGxheWVycG9zIiwiVklFV19XSURUSCIsIlZJRVdfSEVJR0hUIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsImxldmVsMSIsImxldmVsMiIsImxldmVsMyIsImFkZE1hcCIsImFsaWVucyIsIlNUQVRFIiwiY3VycmVudF9sZXZlbCIsImxldmVscyIsIm1hcCIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsImNsZWFyUmVjdCIsImZpbGxSZWN0IiwicmVuZGVyIiwiZXZlcnkiLCJnb1RvTmV4dExldmVsIiwiZm9udCIsImZpbGxUZXh0IiwiR2FtZVZpZXciLCJsYXN0VGltZSIsIkRJUlMiLCJ3IiwiYSIsInMiLCJkIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJrZXkiLCJzZXRfc3RhdGUiLCJzdGFydCIsImJpbmRLZXlzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYW5pbWF0ZSIsImJpbmQiLCJ0aW1lIiwidGltZURlbHRhIiwic3RlcCIsImRpZ3BvcyIsImNvbnNvbGUiLCJsb2ciLCJkaWdUaWxlIiwiZGlnIiwiZmlsbHBvcyIsImZpbGxUaWxlIiwiZGllIiwiZGlyc1N0YXRlcyIsImRpcklkeCIsImluZGV4T2YiLCJ2YWx1ZXMiLCJkaWdQb3MiLCJuZXh0UG9zIiwiaW5jbHVkZXMiLCJnZXREaWdQb3MiLCJmaWxsUG9zIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLEtBQUssR0FBR0MsbUJBQU8sQ0FBQywr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QUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVRVLENBQWQ7QUFhQSxTQUFLQyxNQUFMLENBQVksS0FB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O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFDQSxJQUFNQyxJQUFJLEdBQUdoRCxtQkFBTyxDQUFDLDZCQUFELENBQXBCOztBQUNBLElBQU1nRixRQUFRLEdBQUdoRixtQkFBTyxDQUFDLHVDQUFELENBQXhCOztBQUVBcUgsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUNyRDtBQUNBLE1BQUlDLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJdkYsR0FBRyxHQUFHc0YsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQVYsQ0FIcUQsQ0FJckQ7O0FBRUEsTUFBSXBILElBQUksR0FBRyxJQUFJMkMsSUFBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxDQUFYO0FBQ0F1RSxRQUFNLENBQUNHLEtBQVAsR0FBZXJILElBQUksQ0FBQzZDLFVBQXBCO0FBQ0FxRSxRQUFNLENBQUNJLE1BQVAsR0FBZ0J0SCxJQUFJLENBQUM4QyxXQUFyQjtBQUVBLE1BQUk2QixRQUFKLENBQWEzRSxJQUFiLEVBQW1CNEIsR0FBbkIsRUFBd0IyRCxLQUF4QjtBQUVILENBWkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcblxuY2xhc3MgQWxpZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdhc3NldHMvYWxpZW4tc3ByaXRlLnBuZyc7XG4gICAgfVxuXG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJERUFEXCI7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICBpZiAobWFwVGlsZSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICBpZiAobWFwVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZJTExJTkdfVFJBUFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJUUkFQUEVEXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1swXSAmJlxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPT09IHRoaXMuZ2FtZS5wbGF5ZXIucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zdGF0ZSA9IFwiREVBRFwiO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGRlY2lkZU5ld1N0YXRlKCkge1xuICAgICAgICAvL3JhbmRvbWx5IGNob29zZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbIDAsIC0xXSwgLy91cFxuICAgICAgICAgICAgWy0xLCAgMF0sIC8vbGVmdFxuICAgICAgICAgICAgWyAwLCAgMV0sICAvL2Rvd25cbiAgICAgICAgICAgIFsgMSwgIDBdICAgLy9yaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBsZWdhbERpcklkeHMgPSBbXTtcbiAgICAgICAgLy9nZXQgcmlkIG9mIGlsbGVnYWwgcG9zaXRpb25zXG4gICAgICAgIGRpcnMuZm9yRWFjaCgoZGlyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24obmV3UG9zKSkge1xuICAgICAgICAgICAgICAgIGxlZ2FsRGlySWR4cy5wdXNoKGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGZsb29yRGlySWR4cyA9IFtdO1xuICAgICAgICBsZWdhbERpcklkeHMuZm9yRWFjaCgoZGlyaWR4LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJzW2RpcmlkeF1bMF0sIHRoaXMucG9zWzFdICsgZGlyc1tkaXJpZHhdWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5ld1BvcykgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgICAgIGZsb29yRGlySWR4cy5wdXNoKGRpcmlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9nZXQgcmFuZG9tIG1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gZmxvb3JEaXJJZHhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZsb29yRGlySWR4cy5sZW5ndGgpXTtcblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGlsZS5kaWdMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBsZXQgeG9mZnNldCA9IDA7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID4gOCkge1xuICAgICAgICAgICAgeG9mZnNldCA9IDE2O1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG5cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgeG9mZnNldCwgMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHhvZmZzZXQsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICB4b2Zmc2V0LCAwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgeG9mZnNldCwgMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFJBUFBFRFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMzIsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBbGllbjsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMWE5MzZmXCJcbiAgICAgICAgdGhpcy5kaWdMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9tYXAtdGlsZXMucG5nJztcbiAgICB9XG5cbiAgICBmaWxsKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkaWcoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsIDwgMikge1xuICAgICAgICAgICAgdGhpcy5kaWdMZXZlbCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlnTGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCxcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCxcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCxcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCxcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgKyAoNjQvMiksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAoNjQvMiksXG4gICAgICAgICAgICAgICAgICAgIDIwLCBcbiAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2LDAsXG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKDY0LzIpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb29yOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcbmNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcbmNvbnN0IEFsaWVuID0gcmVxdWlyZShcIi4vYWxpZW5cIik7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcnBvcykge1xuICAgICAgICB0aGlzLlZJRVdfV0lEVEggPSA2NDA7XG4gICAgICAgIHRoaXMuVklFV19IRUlHSFQgPSA1NzY7XG4gICAgICAgIHRoaXMuV0lEVEggPSAxMDtcbiAgICAgICAgdGhpcy5IRUlHSFQgPSA5O1xuICAgICAgICB0aGlzLkZQUyA9IDYwO1xuICAgICAgICB0aGlzLkJHX0NPTE9SID0gXCIjZmY1NzMzXCI7XG5cbiAgICAgICAgdGhpcy5sZXZlbDEgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMSwxLDAsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwxLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMSwwLDAsMCwwLDAsMF0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5sZXZlbDIgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMSwxLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMV0sXG4gICAgICAgICAgICBbMSwwLDAsMCwxLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMSwwLDAsMCwwLDAsMF0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5sZXZlbDMgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMSwxLDAsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwxLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMSwwLDAsMCwwLDAsMF0sXG4gICAgICAgIF07XG5cblxuICAgICAgICB0aGlzLmFkZE1hcCh0aGlzLmxldmVsMSk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7Z2FtZTogdGhpcywgcG9zOiBwbGF5ZXJwb3MgfSk7XG4gICAgICAgIHRoaXMuYWxpZW5zID0gW1xuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs0LCA0XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs1LCA1XX0pXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5TVEFURSA9IFwiTUFJTl9NRU5VXCI7XG4gICAgICAgIHRoaXMuY3VycmVudF9sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMubGV2ZWxzID0gW3RoaXMubGV2ZWwxLCB0aGlzLmxldmVsMiwgdGhpcy5sZXZlbDNdO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IFtdO1xuICAgIH1cblxuICAgIGdvVG9OZXh0TGV2ZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfbGV2ZWwgPCAzKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfbGV2ZWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuYWRkTWFwKHRoaXMubGV2ZWxzW3RoaXMuY3VycmVudF9sZXZlbCAtMV0pO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtnYW1lOiB0aGlzLCBwb3M6IFswLDBdIH0pO1xuICAgICAgICAgICAgdGhpcy5hbGllbnMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNCwgNF19KSxcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzUsIDVdfSlcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBbIGhvcml6b250YWwsIHZlcnRpY2FsIF1cbiAgICBnZXRNYXBUaWxlKHBvcykge1xuICAgICAgICBpZihwb3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFtwb3NbMV1dW3Bvc1swXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRydWUgaWYgcG9zIGlzIG9uIHRoZSBib2FyZCwgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAgaXNMZWdhbFBvc2l0aW9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBpZiggcG9zWzBdID49IDAgJiYgcG9zWzBdIDwgdGhpcy5tYXBbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwb3NbMV0gPj0gMCAmJiBwb3NbMV0gPCB0aGlzLm1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2dpdmVuIGEgZ3JpZCwgc2V0IHRoaXMuZ3JpZCB0byBhbiBhcnJheSBvZiB0aGUgY2xhc3Nlc1xuICAgIGFkZE1hcChtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDAgaXMgZmxvb3JcbiAgICAgICAgICAgICAgICBpZiAoc3F1YXJlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IEZsb29yKHtwb3M6IFtjb2xfaSwgcm93X2ldfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8xIGlzIHdhbGxcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNxdWFyZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IFdhbGwoe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1vdmVPYmplY3RzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiOlxuICAgICAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3JlbmRlciB0aGUgY3VycmVudCBnYW1lc3RhdGVcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuQkdfQ09MT1I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBhY3RvcnNcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4ucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgYWxsIGFsaWVucyBhcmUgZGVmZWF0ZWRcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFsaWVucy5ldmVyeSgoYWxpZW4pID0+IGFsaWVuLnN0YXRlID09PSBcIkRFQURcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvTmV4dExldmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5yZW5kZXIoY3R4KTsgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgYWN0b3JzXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMjBweCBHZW9yZ2lhXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiUHJlc3MgRW50ZXIgdG8gc3RhcnQgdGhlIGdhbWVcIiwgMTAsIDUwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIEdhbWVWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gXG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYmluZCBrZXlzIHRvIG1vdmVzXG4gICAgYmluZEtleXMoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuRElSUykuZm9yRWFjaCggKGspID0+IHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGtleShrLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShrKSlcbiAgICAgICAgfSlcblxuICAgICAgICBrZXkoXCJrXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwia1wiKSk7XG4gICAgICAgIGtleShcImpcIiwgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoXCJqXCIpKTtcbiAgICAgICAga2V5KFwiZW50ZXJcIiwgKCkgPT4gdGhpcy5nYW1lLnN0YXJ0KCkpO1xuICAgIH1cblxuICAgIC8vcnVuIHRoZSBnYW1lXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYmluZEtleXMoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgYW5pbWF0ZSh0aW1lKSB7XG4gICAgICAgIC8vY2hhbmdlIGluIHRpbWUgaXMgY3VycmVudCB0aW1lIC0gbGFzdCB0aW1lXG4gICAgICAgIGxldCB0aW1lRGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcblxuICAgICAgICAvL2lmIHRpbWUgaGFzIGNoYW5nZWQgbW9yZSB0aGFuIDE2IG1zXG4gICAgICAgIGlmICh0aW1lRGVsdGEgPiAxNi42Nikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0ZXAoKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcy5jdHgpO1xuXG4gICAgICAgICAgICAvL2xhc3RUaW1lIGlzIGN1cnJlbnQgdGltZVxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWUgKyAodGltZURlbHRhIC0gMTYuNjYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVZpZXc7IiwiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcbmNvbnN0IFdhbGwgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xuXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9jaGliaS1sYXllcmVkLnBuZyc7XG5cbiAgICAgICAgdGhpcy5ESVJTID0ge1xuICAgICAgICAgICAgdzogWzAsIC0xXSxcbiAgICAgICAgICAgIGE6IFstMSwgMF0sXG4gICAgICAgICAgICBzOiBbMCwgMV0sXG4gICAgICAgICAgICBkOiBbMSwgMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZyhkaWdwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRJR0dJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpZ3Bvcyk7XG4gICAgICAgIGxldCBkaWdUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZGlncG9zKTtcbiAgICAgICAgaWYgKGRpZ1RpbGUgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICBkaWdUaWxlLmRpZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGlnVGlsZS5kaWdMZXZlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxsKGZpbGxwb3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZJTExJTkdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGxwb3MpO1xuICAgICAgICBsZXQgZmlsbFRpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShmaWxscG9zKTtcbiAgICAgICAgaWYgKGZpbGxUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGxUaWxlLnBvc1swXSA9PT0gYWxpZW4ucG9zWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGlsZS5wb3NbMV0gPT09IGFsaWVuLnBvc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWVuLmRpZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsbFRpbGUuZGlnTGV2ZWwgPj0gMSkge1xuICAgICAgICAgICAgICAgIGZpbGxUaWxlLmZpbGwoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWdUaWxlLmRpZ0xldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERpZ1BvcygpIHtcbiAgICAgICAgbGV0IGRpcnNTdGF0ZXMgPSBbXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19ET1dOXCIsIFwiRkFDSU5HX1JJR0hUXCJdO1xuICAgICAgICBsZXQgZGlySWR4ID0gZGlyc1N0YXRlcy5pbmRleE9mKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmIChkaXJJZHggPj0wKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gT2JqZWN0LnZhbHVlcyh0aGlzLkRJUlMpW2RpcklkeF07XG4gICAgICAgICAgICBsZXQgZGlnUG9zID0gW3RoaXMucG9zWzBdICsgZGlyWzBdLCB0aGlzLnBvc1sxXSArIGRpclsxXV1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNMZWdhbFBvc2l0aW9uKGRpZ1BvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRfc3RhdGUoaykge1xuICAgICAgICBsZXQgbmV4dFBvcyA9IFtdO1xuXG4gICAgICAgIGlmIChbXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19VUFwiLCBcIkZBQ0lOR19MRUZUXCIsIFwiRkFDSU5HX1JJR0hUXCJdLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdIC0gMV0pIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSAtIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXh0UG9zKSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIk1PVklOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdICsgMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwia1wiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlnUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWcoZGlnUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImpcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGxQb3MgPSB0aGlzLmdldERpZ1BvcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGwoZmlsbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAzMiwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGQUNJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCAvLyBvZmZzZXQgb24gY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCA2NCAvLyBzaXplIG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNDQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA4MCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA2NCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLSAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDQ4LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAsIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCkgKyAodGhpcy5zdGF0ZV90aW1lciAqICg2NC8xNikpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAxNjAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzIyMjIyMlwiXG5cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGU7IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBXYWxsIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzExNGI1ZlwiXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9tYXAtdGlsZXMucG5nJztcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgMCwwLFxuICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksXG4gICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICA2NCxcbiAgICAgICAgICAgIDY0XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy9jYW52YXMgcmVzZWFyY2hcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIC8vc2V0IHVwIGdhbWVcblxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoWzAsMF0pO1xuICAgIGNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZ2FtZS5WSUVXX0hFSUdIVDtcblxuICAgIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgpLnN0YXJ0KCk7XG5cbn0pO1xuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
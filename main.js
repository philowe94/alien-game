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
          ctx.drawImage(this.sprites, 32, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
          break;

        case 2:
          ctx.drawImage(this.sprites, 64, 0, 16, 16, this.pos[0] * 64, this.pos[1] * 64, 64, 64);
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
    this.level2 = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 0, 0, 1, 0, 0]];
    this.level3 = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 1, 1], [1, 1, 0, 1, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]];
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
    key: "handleGameOver",
    value: function handleGameOver() {
      this.player = new Player({
        game: this,
        pos: [0, 0]
      });
      this.addMap(this.level1);
      this.current_level = 1;
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
    }
  }, {
    key: "goToNextLevel",
    value: function goToNextLevel() {
      if (this.current_level === 1) {
        this.current_level += 1;
        this.addMap(this.levels[this.current_level - 1]);
        this.player = new Player({
          game: this,
          pos: [0, 0]
        });
        this.aliens = [new Alien({
          game: this,
          pos: [2, 8]
        }), new Alien({
          game: this,
          pos: [3, 4]
        }), new Alien({
          game: this,
          pos: [5, 5]
        }), new Alien({
          game: this,
          pos: [5, 2]
        })];
        this.state = "LEVEL_START";
      } else if (this.current_level === 2) {
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
        }), new Alien({
          game: this,
          pos: [3, 6]
        }), new Alien({
          game: this,
          pos: [6, 7]
        })];
        this.state = "LEVEL_START";
      } else if (this.current_level === 3) {
        this.state = "VICTORY";
      }
    } // [ horizontal, vertical ]

  }, {
    key: "getMapTile",
    value: function getMapTile(pos) {
      if (pos && this.isLegalPosition(pos)) {
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

      this.map = [];
      map.forEach(function (row, row_i) {
        _this.map[row_i] = [];
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
          } //check if player is dead


          if (this.player.state === "DEAD") {
            this.handleGameOver();
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

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              if (this.game.getMapTile(nextPos).digLevel === 0) {
                this.state = "MOVING_UP";
              } else {
                this.state = "FACING_UP";
              }
            } else {
              this.state = "FACING_UP";
            }

            break;

          case "a":
            nextPos = [this.pos[0] - 1, this.pos[1]];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              if (this.game.getMapTile(nextPos).digLevel === 0) {
                this.state = "MOVING_LEFT";
              } else {
                this.state = "FACING_LEFT";
              }
            } else {
              this.state = "FACING_LEFT";
            }

            break;

          case "s":
            nextPos = [this.pos[0], this.pos[1] + 1];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              if (this.game.getMapTile(nextPos).digLevel === 0) {
                this.state = "MOVING_DOWN";
              } else {
                this.state = "FACING_DOWN";
              }
            } else {
              this.state = "FACING_DOWN";
            }

            break;

          case "d":
            nextPos = [this.pos[0] + 1, this.pos[1]];

            if (this.game.getMapTile(nextPos) instanceof Floor) {
              if (this.game.getMapTile(nextPos).digLevel === 0) {
                this.state = "MOVING_RIGHT";
              } else {
                this.state = "FACING_RIGHT";
              }
            } else {
              this.state = "FACING_RIGHT";
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

          if (this.state_timer === 12) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] - 1];
            this.state = "FACING_UP";
            console.log(this.state);
          }

          break;

        case "MOVING_LEFT":
          this.state_timer += 1;

          if (this.state_timer === 12) {
            this.state_timer = 0;
            this.pos = [this.pos[0] - 1, this.pos[1]];
            this.state = "FACING_LEFT";
            console.log(this.state);
          }

          break;

        case "MOVING_DOWN":
          this.state_timer += 1;

          if (this.state_timer === 12) {
            this.state_timer = 0;
            this.pos = [this.pos[0], this.pos[1] + 1];
            this.state = "FACING_DOWN";
            console.log(this.state);
          }

          break;

        case "MOVING_RIGHT":
          this.state_timer += 1;

          if (this.state_timer === 12) {
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
          this.pos[0] * 64, this.pos[1] * 64 - this.state_timer * (64 / 12), 64, 64);
          break;

        case "MOVING_LEFT":
          ctx.drawImage(this.sprites, 64, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 - this.state_timer * (64 / 12), this.pos[1] * 64, 64, 64);
          break;

        case "MOVING_DOWN":
          ctx.drawImage(this.sprites, 48, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64, this.pos[1] * 64 + this.state_timer * (64 / 12), 64, 64);
          break;

        case "MOVING_RIGHT":
          ctx.drawImage(this.sprites, 160, 0, //offset on sprite sheet
          16, 16, //width/height on sprite sheet
          this.pos[0] * 64 + this.state_timer * (64 / 12), this.pos[1] * 64, 64, 64);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9hbGllbi5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzPzExZDkiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJGbG9vciIsInJlcXVpcmUiLCJBbGllbiIsIm9wdGlvbnMiLCJwb3MiLCJjb2xvciIsImdhbWUiLCJzdGF0ZSIsImRlY2lkZU5ld1N0YXRlIiwic3RhdGVfdGltZXIiLCJzcHJpdGVzIiwiSW1hZ2UiLCJzcmMiLCJtYXBUaWxlIiwiZ2V0TWFwVGlsZSIsImRpZ0xldmVsIiwicGxheWVyIiwiZGlycyIsImxlZ2FsRGlySWR4cyIsImZvckVhY2giLCJkaXIiLCJpZHgiLCJuZXdQb3MiLCJpc0xlZ2FsUG9zaXRpb24iLCJwdXNoIiwiZmxvb3JEaXJJZHhzIiwiZGlyaWR4IiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJuZXdTdGF0ZSIsImNoZWNrQ29sbGlzaW9uIiwiY3R4IiwieG9mZnNldCIsImRyYXdJbWFnZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbFN0eWxlIiwiZmlsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJUaWxlIiwiUGxheWVyIiwiV2FsbCIsIkdhbWUiLCJwbGF5ZXJwb3MiLCJWSUVXX1dJRFRIIiwiVklFV19IRUlHSFQiLCJXSURUSCIsIkhFSUdIVCIsIkZQUyIsIkJHX0NPTE9SIiwibGV2ZWwxIiwibGV2ZWwyIiwibGV2ZWwzIiwiYWRkTWFwIiwiYWxpZW5zIiwiY3VycmVudF9sZXZlbCIsImxldmVscyIsIm1hcCIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlIiwiYWxpZW4iLCJtb3ZlT2JqZWN0cyIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsImNsZWFyUmVjdCIsImZpbGxSZWN0IiwicmVuZGVyIiwiZXZlcnkiLCJnb1RvTmV4dExldmVsIiwiaGFuZGxlR2FtZU92ZXIiLCJzdHJva2VSZWN0IiwiZm9udCIsImZpbGxUZXh0IiwiR2FtZVZpZXciLCJsYXN0VGltZSIsIkRJUlMiLCJ3IiwiYSIsInMiLCJkIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJrZXkiLCJzZXRfc3RhdGUiLCJzdGFydCIsImJpbmRLZXlzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYW5pbWF0ZSIsImJpbmQiLCJ0aW1lIiwidGltZURlbHRhIiwic3RlcCIsImRpZ3BvcyIsImNvbnNvbGUiLCJsb2ciLCJkaWdUaWxlIiwiZGlnIiwiZmlsbHBvcyIsImZpbGxUaWxlIiwiZGllIiwiZGlyc1N0YXRlcyIsImRpcklkeCIsImluZGV4T2YiLCJ2YWx1ZXMiLCJkaWdQb3MiLCJuZXh0UG9zIiwiaW5jbHVkZXMiLCJnZXREaWdQb3MiLCJmaWxsUG9zIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLEtBQUssR0FBR0MsbUJBQU8s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QUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVRVLENBQWQ7QUFZQSxTQUFLQyxNQUFMLEdBQWMsQ0FDVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBRFUsRUFFVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBRlUsRUFHVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBSFUsRUFJVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBSlUsRUFLVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBTFUsRUFNVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBTlUsRUFPVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLENBUFUsRUFRVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxD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Q0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFDQSxJQUFNQyxJQUFJLEdBQUc5QyxtQkFBTyxDQUFDLDZCQUFELENBQXBCOztBQUNBLElBQU0rRSxRQUFRLEdBQUcvRSxtQkFBTyxDQUFDLHVDQUFELENBQXhCOztBQUVBb0gsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUNyRDtBQUNBLE1BQUlDLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJdEYsR0FBRyxHQUFHcUYsTUFBTSxDQUFDRSxVQUFQLENBQWtCLElBQWxCLENBQVYsQ0FIcUQsQ0FJckQ7O0FBRUEsTUFBSW5ILElBQUksR0FBRyxJQUFJeUMsSUFBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxDQUFYO0FBQ0F3RSxRQUFNLENBQUNHLEtBQVAsR0FBZXBILElBQUksQ0FBQzJDLFVBQXBCO0FBQ0FzRSxRQUFNLENBQUNJLE1BQVAsR0FBZ0JySCxJQUFJLENBQUM0QyxXQUFyQjtBQUVBLE1BQUk4QixRQUFKLENBQWExRSxJQUFiLEVBQW1CNEIsR0FBbkIsRUFBd0IwRCxLQUF4QjtBQUVILENBWkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxvb3IgPSByZXF1aXJlKFwiLi9mbG9vclwiKTtcblxuY2xhc3MgQWxpZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdhc3NldHMvYWxpZW4tc3ByaXRlLnBuZyc7XG4gICAgfVxuXG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJERUFEXCI7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBtYXBUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUodGhpcy5wb3MpO1xuICAgICAgICBpZiAobWFwVGlsZSBpbnN0YW5jZW9mIEZsb29yKSB7XG4gICAgICAgICAgICBpZiAobWFwVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZJTExJTkdfVFJBUFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcFRpbGUuZGlnTGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJUUkFQUEVEXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zWzBdID09PSB0aGlzLmdhbWUucGxheWVyLnBvc1swXSAmJlxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPT09IHRoaXMuZ2FtZS5wbGF5ZXIucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zdGF0ZSA9IFwiREVBRFwiO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGRlY2lkZU5ld1N0YXRlKCkge1xuICAgICAgICAvL3JhbmRvbWx5IGNob29zZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbIDAsIC0xXSwgLy91cFxuICAgICAgICAgICAgWy0xLCAgMF0sIC8vbGVmdFxuICAgICAgICAgICAgWyAwLCAgMV0sICAvL2Rvd25cbiAgICAgICAgICAgIFsgMSwgIDBdICAgLy9yaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBsZWdhbERpcklkeHMgPSBbXTtcbiAgICAgICAgLy9nZXQgcmlkIG9mIGlsbGVnYWwgcG9zaXRpb25zXG4gICAgICAgIGRpcnMuZm9yRWFjaCgoZGlyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJbMF0sIHRoaXMucG9zWzFdICsgZGlyWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0xlZ2FsUG9zaXRpb24obmV3UG9zKSkge1xuICAgICAgICAgICAgICAgIGxlZ2FsRGlySWR4cy5wdXNoKGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGZsb29yRGlySWR4cyA9IFtdO1xuICAgICAgICBsZWdhbERpcklkeHMuZm9yRWFjaCgoZGlyaWR4LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdQb3MgPSBbdGhpcy5wb3NbMF0gKyBkaXJzW2RpcmlkeF1bMF0sIHRoaXMucG9zWzFdICsgZGlyc1tkaXJpZHhdWzFdXVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5ld1BvcykgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgICAgIGZsb29yRGlySWR4cy5wdXNoKGRpcmlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9nZXQgcmFuZG9tIG1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gZmxvb3JEaXJJZHhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZsb29yRGlySWR4cy5sZW5ndGgpXTtcblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBcIk1PVklOR19VUFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfRE9XTlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gXCJNT1ZJTkdfUklHSFRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVjaWRlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19MRUZUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gLSAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfRE9XTlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJGSUxMSU5HX1RSQVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGlsZS5kaWdMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlY2lkZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRSQVBQRURcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDE2MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWNpZGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBsZXQgeG9mZnNldCA9IDA7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID4gOCkge1xuICAgICAgICAgICAgeG9mZnNldCA9IDE2O1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1VQXCI6XG5cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgeG9mZnNldCwgMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHhvZmZzZXQsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzE2KSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICB4b2Zmc2V0LCAwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfUklHSFRcIjpcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgeG9mZnNldCwgMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTYpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRklMTElOR19UUkFQXCI6XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICg2NC8yKSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKDY0LzIpLFxuICAgICAgICAgICAgICAgICAgICAyMCwgXG4gICAgICAgICAgICAgICAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFJBUFBFRFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMzIsIDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBbGllbjsiLCJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMWE5MzZmXCJcbiAgICAgICAgdGhpcy5kaWdMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuc3JjID0gJ2Fzc2V0cy9tYXAtdGlsZXMucG5nJztcbiAgICB9XG5cbiAgICBmaWxsKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlnTGV2ZWwgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkaWcoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpZ0xldmVsIDwgMikge1xuICAgICAgICAgICAgdGhpcy5kaWdMZXZlbCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlnTGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYsMCxcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCxcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMzIsMCxcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCxcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgNjQsMCxcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgICAgICAgICA2NCxcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb29yOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcbmNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcbmNvbnN0IEFsaWVuID0gcmVxdWlyZShcIi4vYWxpZW5cIik7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcnBvcykge1xuICAgICAgICB0aGlzLlZJRVdfV0lEVEggPSA2NDA7XG4gICAgICAgIHRoaXMuVklFV19IRUlHSFQgPSA1NzY7XG4gICAgICAgIHRoaXMuV0lEVEggPSAxMDtcbiAgICAgICAgdGhpcy5IRUlHSFQgPSA5O1xuICAgICAgICB0aGlzLkZQUyA9IDYwO1xuICAgICAgICB0aGlzLkJHX0NPTE9SID0gXCIjZmY1NzMzXCI7XG5cbiAgICAgICAgdGhpcy5sZXZlbDEgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMSwxLDAsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwxLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMSwwLDAsMCwwLDAsMF0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5sZXZlbDIgPSBbXG4gICAgICAgICAgICBbMCwwLDAsMCwxLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMSwxLDAsMCwxLDAsMSwxLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMV0sXG4gICAgICAgICAgICBbMSwwLDEsMCwwLDEsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDEsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDEsMCwxLDAsMV0sXG4gICAgICAgICAgICBbMCwxLDAsMSwwLDAsMCwxLDAsMF0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5sZXZlbDMgPSBbXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwxLDAsMCwwLDEsMSwxLDAsMV0sXG4gICAgICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMCwxLDAsMSwwLDEsMF0sXG4gICAgICAgICAgICBbMCwxLDEsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMSwwLDEsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMSwwLDAsMSwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMCwxLDAsMCwwLDEsMF0sXG4gICAgICAgICAgICBbMCwwLDEsMCwwLDAsMCwxLDAsMF0sXG4gICAgICAgIF07XG5cblxuICAgICAgICB0aGlzLmFkZE1hcCh0aGlzLmxldmVsMSk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7Z2FtZTogdGhpcywgcG9zOiBwbGF5ZXJwb3MgfSk7XG5cbiAgICAgICAgdGhpcy5hbGllbnMgPSBbXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzAsIDhdfSksXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzQsIDRdfSksXG4gICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzUsIDVdfSksXG5cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gXCJMRVZFTF9TVEFSVFwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRfbGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLmxldmVscyA9IFt0aGlzLmxldmVsMSwgdGhpcy5sZXZlbDIsIHRoaXMubGV2ZWwzXTtcbiAgICB9XG5cbiAgICBoYW5kbGVHYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtnYW1lOiB0aGlzLCBwb3M6IFswLDBdIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5sZXZlbDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfbGV2ZWwgPSAxO1xuXG4gICAgICAgIHRoaXMuYWxpZW5zID0gW1xuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFswLCA4XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs0LCA0XX0pLFxuICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs1LCA1XX0pLFxuXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTEVWRUxfU1RBUlRcIjtcbiAgICB9XG5cbiAgICBnb1RvTmV4dExldmVsKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50X2xldmVsID09PSAxKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9sZXZlbCArPSAxO1xuICAgICAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5sZXZlbHNbdGhpcy5jdXJyZW50X2xldmVsIC0xXSk7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogWzAsMF0gfSk7XG4gICAgICAgICAgICB0aGlzLmFsaWVucyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzIsIDhdfSksXG4gICAgICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFszLCA0XX0pLFxuICAgICAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNSwgNV19KSxcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzUsIDJdfSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTEVWRUxfU1RBUlRcIlxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50X2xldmVsID09PSAyKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9sZXZlbCArPSAxO1xuICAgICAgICAgICAgdGhpcy5hZGRNYXAodGhpcy5sZXZlbHNbdGhpcy5jdXJyZW50X2xldmVsIC0xXSk7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogWzAsMF0gfSk7XG4gICAgICAgICAgICB0aGlzLmFsaWVucyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzAsIDhdfSksXG4gICAgICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs0LCA0XX0pLFxuICAgICAgICAgICAgICAgIG5ldyBBbGllbih7Z2FtZTogdGhpcywgcG9zOiBbNSwgNV19KSxcbiAgICAgICAgICAgICAgICBuZXcgQWxpZW4oe2dhbWU6IHRoaXMsIHBvczogWzMsIDZdfSksXG4gICAgICAgICAgICAgICAgbmV3IEFsaWVuKHtnYW1lOiB0aGlzLCBwb3M6IFs2LCA3XX0pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTEVWRUxfU1RBUlRcIlxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50X2xldmVsID09PSAzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJWSUNUT1JZXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFsgaG9yaXpvbnRhbCwgdmVydGljYWwgXVxuICAgIGdldE1hcFRpbGUocG9zKSB7XG4gICAgICAgIGlmKHBvcyAmJiB0aGlzLmlzTGVnYWxQb3NpdGlvbihwb3MpKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFtwb3NbMV1dW3Bvc1swXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRydWUgaWYgcG9zIGlzIG9uIHRoZSBib2FyZCwgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAgaXNMZWdhbFBvc2l0aW9uKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBpZiggcG9zWzBdID49IDAgJiYgcG9zWzBdIDwgdGhpcy5tYXBbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwb3NbMV0gPj0gMCAmJiBwb3NbMV0gPCB0aGlzLm1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2dpdmVuIGEgZ3JpZCwgc2V0IHRoaXMuZ3JpZCB0byBhbiBhcnJheSBvZiB0aGUgY2xhc3Nlc1xuICAgIGFkZE1hcChtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBbXTtcblxuICAgICAgICBtYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXSA9IFtdO1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMCBpcyBmbG9vclxuICAgICAgICAgICAgICAgIGlmIChzcXVhcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgRmxvb3Ioe3BvczogW2NvbF9pLCByb3dfaV19KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLzEgaXMgd2FsbFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3Jvd19pXVtjb2xfaV0gPSBuZXcgV2FsbCh7cG9zOiBbY29sX2ksIHJvd19pXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLm1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBMQVlJTkdcIjpcbiAgICAgICAgICAgIHRoaXMubW92ZU9iamVjdHMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9yZW5kZXIgdGhlIGN1cnJlbnQgZ2FtZXN0YXRlXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQTEFZSU5HXCI6XG4gICAgICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLkJHX0NPTE9SO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5yZW5kZXIoY3R4KTsgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgYWN0b3JzXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGFsbCBhbGllbnMgYXJlIGRlZmVhdGVkXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hbGllbnMuZXZlcnkoKGFsaWVuKSA9PiBhbGllbi5zdGF0ZSA9PT0gXCJERUFEXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub05leHRMZXZlbCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIGRlYWRcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllci5zdGF0ZSA9PT0gXCJERUFEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVHYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMRVZFTF9TVEFSVFwiOlxuXG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKCAoc3F1YXJlLCBjb2xfaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVuZGVyIHRoZSBhY3RvcnNcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWVucy5mb3JFYWNoKCAoYWxpZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4ucmVuZGVyKGN0eCk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgID0gJ3JnYmEoMjQwLCAyNDIsIDI0NSwgMC43KSc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KC01LCAxNTAsIDcwMCwgMTYwKTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCgtNTAsIDE1MCwgNzAwLCAxNjApO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gXCI0MHB4IE5vdG8gU2Fuc1wiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChgTGV2ZWwgJHt0aGlzLmN1cnJlbnRfbGV2ZWx9YCwgMTUwLCAyMjApO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gXCIyMHB4IE5vdG8gU2Fuc1wiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlByZXNzIEVudGVyIHRvIHN0YXJ0XCIsIDE1MCwgMjcwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJWSUNUT1JZXCI6XG5cbiAgICAgICAgICAgICAgICAvL3JlbmRlciB0aGUgbWFwXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZm9yRWFjaCggKHJvdywgcm93X2kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUucmVuZGVyKGN0eCk7ICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW5kZXIgdGhlIGFjdG9yc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlbmRlcihjdHgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zLmZvckVhY2goIChhbGllbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGllbi5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgPSAncmdiYSgyNDAsIDI0MiwgMjQ1LCAwLjcpJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoLTUsIDE1MCwgNzAwLCAxNjApO1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KC01MCwgMTUwLCA3MDAsIDE2MCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjQwcHggTm90byBTYW5zXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGBDT05HUkFUVUxBVElPTlNgLCAxNTAsIDIyMCk7XG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjIwcHggTm90byBTYW5zXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiVGhhbmsgeW91IGZvciBwbGF5aW5nIVwiLCAxNTAsIDI3MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjbGFzcyBHYW1lVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuIFxuXG4gICAgICAgIHRoaXMuRElSUyA9IHtcbiAgICAgICAgICAgIHc6IFswLCAtMV0sXG4gICAgICAgICAgICBhOiBbLTEsIDBdLFxuICAgICAgICAgICAgczogWzAsIDFdLFxuICAgICAgICAgICAgZDogWzEsIDBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JpbmQga2V5cyB0byBtb3Zlc1xuICAgIGJpbmRLZXlzKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLkRJUlMpLmZvckVhY2goIChrKSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXkoaywgKCkgPT4gdGhpcy5nYW1lLnBsYXllci5zZXRfc3RhdGUoaykpXG4gICAgICAgIH0pXG5cbiAgICAgICAga2V5KFwia1wiLCAoKSA9PiB0aGlzLmdhbWUucGxheWVyLnNldF9zdGF0ZShcImtcIikpO1xuICAgICAgICBrZXkoXCJqXCIsICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIuc2V0X3N0YXRlKFwialwiKSk7XG4gICAgICAgIGtleShcImVudGVyXCIsICgpID0+IHRoaXMuZ2FtZS5zdGFydCgpKTtcbiAgICB9XG5cbiAgICAvL3J1biB0aGUgZ2FtZVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmJpbmRLZXlzKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUodGltZSkge1xuICAgICAgICAvL2NoYW5nZSBpbiB0aW1lIGlzIGN1cnJlbnQgdGltZSAtIGxhc3QgdGltZVxuICAgICAgICBsZXQgdGltZURlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG5cbiAgICAgICAgLy9pZiB0aW1lIGhhcyBjaGFuZ2VkIG1vcmUgdGhhbiAxNiBtc1xuICAgICAgICBpZiAodGltZURlbHRhID4gMTYuNjYpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUucmVuZGVyKHRoaXMuY3R4KTtcblxuICAgICAgICAgICAgLy9sYXN0VGltZSBpcyBjdXJyZW50IHRpbWVcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lICsgKHRpbWVEZWx0YSAtIDE2LjY2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsImNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcblxuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiO1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zO1xuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdhc3NldHMvY2hpYmktbGF5ZXJlZC5wbmcnO1xuXG4gICAgICAgIHRoaXMuRElSUyA9IHtcbiAgICAgICAgICAgIHc6IFswLCAtMV0sXG4gICAgICAgICAgICBhOiBbLTEsIDBdLFxuICAgICAgICAgICAgczogWzAsIDFdLFxuICAgICAgICAgICAgZDogWzEsIDBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWcoZGlncG9zKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJESUdHSU5HXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkaWdwb3MpO1xuICAgICAgICBsZXQgZGlnVGlsZSA9IHRoaXMuZ2FtZS5nZXRNYXBUaWxlKGRpZ3Bvcyk7XG4gICAgICAgIGlmIChkaWdUaWxlIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgZGlnVGlsZS5kaWcoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZ1RpbGUuZGlnTGV2ZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsbChmaWxscG9zKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJGSUxMSU5HXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhmaWxscG9zKTtcbiAgICAgICAgbGV0IGZpbGxUaWxlID0gdGhpcy5nYW1lLmdldE1hcFRpbGUoZmlsbHBvcyk7XG4gICAgICAgIGlmIChmaWxsVGlsZSBpbnN0YW5jZW9mIEZsb29yKXtcbiAgICAgICAgICAgIGlmIChmaWxsVGlsZS5kaWdMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hbGllbnMuZm9yRWFjaCggKGFsaWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxsVGlsZS5wb3NbMF0gPT09IGFsaWVuLnBvc1swXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRpbGUucG9zWzFdID09PSBhbGllbi5wb3NbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGllbi5kaWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbGxUaWxlLmRpZ0xldmVsID49IDEpIHtcbiAgICAgICAgICAgICAgICBmaWxsVGlsZS5maWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREaWdQb3MoKSB7XG4gICAgICAgIGxldCBkaXJzU3RhdGVzID0gW1wiRkFDSU5HX1VQXCIsIFwiRkFDSU5HX0xFRlRcIiwgXCJGQUNJTkdfRE9XTlwiLCBcIkZBQ0lOR19SSUdIVFwiXTtcbiAgICAgICAgbGV0IGRpcklkeCA9IGRpcnNTdGF0ZXMuaW5kZXhPZih0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAoZGlySWR4ID49MCkge1xuICAgICAgICAgICAgbGV0IGRpciA9IE9iamVjdC52YWx1ZXModGhpcy5ESVJTKVtkaXJJZHhdO1xuICAgICAgICAgICAgbGV0IGRpZ1BvcyA9IFt0aGlzLnBvc1swXSArIGRpclswXSwgdGhpcy5wb3NbMV0gKyBkaXJbMV1dXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmlzTGVnYWxQb3NpdGlvbihkaWdQb3MpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpZ1BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0X3N0YXRlKGspIHtcbiAgICAgICAgbGV0IG5leHRQb3MgPSBbXTtcblxuICAgICAgICBpZiAoW1wiRkFDSU5HX0RPV05cIiwgXCJGQUNJTkdfVVBcIiwgXCJGQUNJTkdfTEVGVFwiLCBcIkZBQ0lOR19SSUdIVFwiXS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIndcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykgaW5zdGFuY2VvZiBGbG9vcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmdldE1hcFRpbGUobmV4dFBvcykuZGlnTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJNT1ZJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfVVBcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYVwiOlxuICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV0gXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpLmRpZ0xldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0xFRlRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19MRUZUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpLmRpZ0xldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19ET1dOXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IFt0aGlzLnBvc1swXSArIDEsIHRoaXMucG9zWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpIGluc3RhbmNlb2YgRmxvb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRNYXBUaWxlKG5leHRQb3MpLmRpZ0xldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiTU9WSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1JJR0hUXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImtcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZ1BvcyA9IHRoaXMuZ2V0RGlnUG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlnKGRpZ1Bvcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJqXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxsUG9zID0gdGhpcy5nZXREaWdQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsKGZpbGxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfVVBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX1VQXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZV90aW1lciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdIC0gMSwgdGhpcy5wb3NbMV1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJGQUNJTkdfTEVGVFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX0RPV05cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVfdGltZXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVfdGltZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0gKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwiRkFDSU5HX0RPV05cIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiTU9WSU5HX1JJR0hUXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZV90aW1lciArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlX3RpbWVyID09PSAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlX3RpbWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyAxLCB0aGlzLnBvc1sxXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIkZBQ0lOR19SSUdIVFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19VUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMzIsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLCBcbiAgICAgICAgICAgICAgICAgICAgNjQsIFxuICAgICAgICAgICAgICAgICAgICA2NFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRkFDSU5HX0xFRlRcIjpcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMsXG4gICAgICAgICAgICAgICAgICAgIDE2LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICAwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgLy8gb2Zmc2V0IG9uIGNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgNjQgLy8gc2l6ZSBvbiBjYW52YXNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZBQ0lOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTQ0LDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19VUFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgODAsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpICwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSAtICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzEyKSksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNT1ZJTkdfTEVGVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgNjQsMCwgLy9vZmZzZXQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgIDE2LDE2LCAvL3dpZHRoL2hlaWdodCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpIC0gKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTIpKSwgXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19ET1dOXCI6XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLFxuICAgICAgICAgICAgICAgICAgICA0OCwwLCAvL29mZnNldCBvbiBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgMTYsMTYsIC8vd2lkdGgvaGVpZ2h0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCkgLCBcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpICsgKHRoaXMuc3RhdGVfdGltZXIgKiAoNjQvMTIpKSwgXG4gICAgICAgICAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgICAgICAgICAgNjRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk1PVklOR19SSUdIVFwiOlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgICAgICAgICAgMTYwLDAsIC8vb2Zmc2V0IG9uIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAxNiwxNiwgLy93aWR0aC9oZWlnaHQgb24gc3ByaXRlIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnBvc1swXSAqIDY0KSArICh0aGlzLnN0YXRlX3RpbWVyICogKDY0LzEyKSksIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wb3NbMV0gKiA2NCksIFxuICAgICAgICAgICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICAgICAgICAgIDY0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMyMjIyMjJcIlxuXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDY0KSwgXG4gICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICA2NFxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlOyIsImNvbnN0IFRpbGUgPSByZXF1aXJlKCcuL3RpbGUnKTtcblxuY2xhc3MgV2FsbCBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMxMTRiNWZcIlxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLnNyYyA9ICdhc3NldHMvbWFwLXRpbGVzLnBuZyc7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlcyxcbiAgICAgICAgICAgIDAsMCxcbiAgICAgICAgICAgIDE2LDE2LFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNjQpLFxuICAgICAgICAgICAgNjQsXG4gICAgICAgICAgICA2NFxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xuY29uc3QgR2FtZVZpZXcgPSByZXF1aXJlKFwiLi9nYW1lX3ZpZXdcIik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vY2FudmFzIHJlc2VhcmNoXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWNhbnZhcycpO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAvL3NldCB1cCBnYW1lXG5cbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKFswLDBdKTtcbiAgICBjYW52YXMud2lkdGggPSBnYW1lLlZJRVdfV0lEVEg7XG4gICAgY2FudmFzLmhlaWdodCA9IGdhbWUuVklFV19IRUlHSFQ7XG5cbiAgICBuZXcgR2FtZVZpZXcoZ2FtZSwgY3R4KS5zdGFydCgpO1xuXG59KTtcblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/floor.js":
/*!**********************!*\
  !*** ./src/floor.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  function Floor() {
    _classCallCheck(this, Floor);

    return _super.call(this);
  }

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

var Game = /*#__PURE__*/function () {
  function Game(map, playerpos) {
    _classCallCheck(this, Game);

    this.VIEW_WIDTH = 640;
    this.VIEW_HEIGHT = 477;
    this.WIDTH = 10;
    this.HEIGHT = 9;
    this.FPS = 60;
    this.BG_COLOR = "#ff5733";
    this.DIRS = {
      w: [0, -1],
      a: [-1, 0],
      s: [0, 1],
      d: [1, 0]
    };
    this.map = [];
    this.addMap(map);
    this.player = new Player({
      game: this,
      pos: playerpos
    });
  }

  _createClass(Game, [{
    key: "getMapTile",
    value: function getMapTile(pos) {
      return this.map[pos[0]][pos[1]];
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
            _this.map[row_i][col_i] = new Floor(); //1 is wall
          } else if (square === 1) {
            _this.map[row_i][col_i] = new Wall();
          }
        });
      });
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
      });
    } //bind keys to moves

  }, {
    key: "bindKeys",
    value: function bindKeys() {
      var _this2 = this;

      Object.keys(this.DIRS).forEach(function (k) {
        var move = _this2.DIRS[k];
        key(k, function () {
          this.player.move(move);
        });
      });
    }
  }]);

  return Game;
}();

module.exports = Game;

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

var Player = /*#__PURE__*/function () {
  function Player(options) {
    _classCallCheck(this, Player);

    this.color = "#000000";
    this.pos = options.pos;
    this.game = options.game;
  }

  _createClass(Player, [{
    key: "render",
    value: function render(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0] * 64, this.pos[1] * 53, 64, 53);
    }
  }, {
    key: "move",
    value: function move(dir) {
      var newPos = [this.pos[0] + dir[0], this.pos[1] + dir[1]];
      var newPosTile = this.game.getMapTile(newPos);
      debugger;

      if (newPosTile instanceof Floor) {
        this.pos = newPos;
      }

      debugger;
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
  function Tile() {
    _classCallCheck(this, Tile);
  }

  _createClass(Tile, [{
    key: "render",
    value: function render() {}
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

  function Wall() {
    _classCallCheck(this, Wall);

    return _super.call(this);
  }

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


var Game = __webpack_require__(/*! ./game */ "./src/game.js"); //canvas research


var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d'); //set up game

var map = [[0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0], [0, 0, 0, 0.0, 0, 0, 0, 0, 0]];
var game = new Game(map, [1, 1]);
canvas.width = game.VIEW_WIDTH;
canvas.height = game.VIEW_HEIGHT;
game.render(ctx);
game.player.move([0, -1]);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy90aWxlLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3dhbGwuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUaWxlIiwicmVxdWlyZSIsIkZsb29yIiwibW9kdWxlIiwiZXhwb3J0cyIsIlBsYXllciIsIldhbGwiLCJHYW1lIiwibWFwIiwicGxheWVycG9zIiwiVklFV19XSURUSCIsIlZJRVdfSEVJR0hUIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsIkRJUlMiLCJ3IiwiYSIsInMiLCJkIiwiYWRkTWFwIiwicGxheWVyIiwiZ2FtZSIsInBvcyIsImZvckVhY2giLCJyb3ciLCJyb3dfaSIsInNxdWFyZSIsImNvbF9pIiwiY3R4IiwiY2xlYXJSZWN0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJyZW5kZXIiLCJPYmplY3QiLCJrZXlzIiwiayIsIm1vdmUiLCJrZXkiLCJvcHRpb25zIiwiY29sb3IiLCJkaXIiLCJuZXdQb3MiLCJuZXdQb3NUaWxlIiwiZ2V0TWFwVGlsZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiXSwibWFw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QUFMLEVBQU8sR0FBUCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixDQVRNLENBQVY7QUFXQSxJQUFJZSxJQUFJLEdBQUcsSUFBSWhCLElBQUosQ0FBU0MsR0FBVCxFQUFjLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZCxDQUFYO0FBQ0FzQyxNQUFNLENBQUNJLEtBQVAsR0FBZTNCLElBQUksQ0FBQ2IsVUFBcEI7QUFDQW9DLE1BQU0sQ0FBQ0ssTUFBUCxHQUFnQjVCLElBQUksQ0FBQ1osV0FBckI7QUFJQVksSUFBSSxDQUFDVyxNQUFMLENBQVlKLEdBQVo7QUFFQVAsSUFBSSxDQUFDRCxNQUFMLENBQVlnQixJQUFaLENBQWlCLENBQUMsQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFqQixFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUaWxlID0gcmVxdWlyZSgnLi90aWxlJyk7XG5cbmNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb29yOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcbmNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5jb25zdCBXYWxsID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IobWFwLCBwbGF5ZXJwb3MpIHtcbiAgICAgICAgdGhpcy5WSUVXX1dJRFRIID0gNjQwO1xuICAgICAgICB0aGlzLlZJRVdfSEVJR0hUID0gNDc3O1xuICAgICAgICB0aGlzLldJRFRIID0gMTA7XG4gICAgICAgIHRoaXMuSEVJR0hUID0gOTtcbiAgICAgICAgdGhpcy5GUFMgPSA2MDtcbiAgICAgICAgdGhpcy5CR19DT0xPUiA9IFwiI2ZmNTczM1wiO1xuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXAgPSBbXTtcbiAgICAgICAgdGhpcy5hZGRNYXAobWFwKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtnYW1lOiB0aGlzLCBwb3M6IHBsYXllcnBvcyB9KTtcbiAgICB9XG5cbiAgICBnZXRNYXBUaWxlKHBvcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBbcG9zWzBdXVtwb3NbMV1dO1xuICAgIH1cblxuICAgIC8vZ2l2ZW4gYSBncmlkLCBzZXQgdGhpcy5ncmlkIHRvIGFuIGFycmF5IG9mIHRoZSBjbGFzc2VzXG4gICAgYWRkTWFwKG1hcCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcblxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMCBpcyBmbG9vclxuICAgICAgICAgICAgICAgIGlmIChzcXVhcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBGbG9vcigpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vMSBpcyB3YWxsXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcXVhcmUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbcm93X2ldW2NvbF9pXSA9IG5ldyBXYWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL3JlbmRlciB0aGUgY3VycmVudCBnYW1lc3RhdGVcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuQkdfQ09MT1I7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlZJRVdfV0lEVEgsIHRoaXMuVklFV19IRUlHSFQpO1xuICAgICAgICAvL3JlbmRlciB0aGUgbWFwXG4gICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICBzcXVhcmUucmVuZGVyKGN0eCk7ICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vYmluZCBrZXlzIHRvIG1vdmVzXG4gICAgYmluZEtleXMoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuRElSUykuZm9yRWFjaCggKGspID0+IHtcbiAgICAgICAgICAgIGxldCBtb3ZlID0gdGhpcy5ESVJTW2tdO1xuICAgICAgICAgICAga2V5KGssIGZ1bmN0aW9uICgpIHsgdGhpcy5wbGF5ZXIubW92ZShtb3ZlKX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiO1xuICAgICAgICB0aGlzLnBvcyA9IG9wdGlvbnMucG9zXG5cbiAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lXG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgKHRoaXMucG9zWzBdICogNjQpLCBcbiAgICAgICAgICAgICh0aGlzLnBvc1sxXSAqIDUzKSwgXG4gICAgICAgICAgICA2NCwgXG4gICAgICAgICAgICA1M1xuICAgICAgICApO1xuICAgIH1cblxuICAgIG1vdmUoZGlyKSB7XG5cbiAgICAgICAgbGV0IG5ld1BvcyA9IFtcbiAgICAgICAgICAgIHRoaXMucG9zWzBdICsgZGlyWzBdLFxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gKyBkaXJbMV1cbiAgICAgICAgXVxuICAgICAgICBcbiAgICAgICAgbGV0IG5ld1Bvc1RpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXdQb3MpO1xuXG4gICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgaWYgKG5ld1Bvc1RpbGUgaW5zdGFuY2VvZiBGbG9vcikge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSBuZXdQb3M7XG4gICAgICAgIH1cblxuICAgICAgICBkZWJ1Z2dlclxuXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlOyIsImNvbnN0IFRpbGUgPSByZXF1aXJlKCcuL3RpbGUnKTtcblxuY2xhc3MgV2FsbCBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xuXG5cbi8vY2FudmFzIHJlc2VhcmNoXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbi8vc2V0IHVwIGdhbWVcbmxldCBtYXAgPSBbXG4gICAgWzAsMCwwLDAuMCwwLDAsMCwwLDBdLFxuICAgIFswLDAsMCwwLjAsMCwwLDAsMCwwXSxcbiAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgWzAsMCwwLDAuMCwwLDAsMCwwLDBdLFxuICAgIFswLDAsMCwxLDAsMSwwLDAsMCwwXSxcbiAgICBbMCwwLDAsMC4wLDAsMCwwLDAsMF0sXG4gICAgWzAsMCwwLDAuMCwwLDAsMCwwLDBdLFxuICAgIFswLDAsMCwwLjAsMCwwLDAsMCwwXSxcbiAgICBbMCwwLDAsMC4wLDAsMCwwLDAsMF0sXG5dO1xubGV0IGdhbWUgPSBuZXcgR2FtZShtYXAsIFsxLDFdKTtcbmNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbmNhbnZhcy5oZWlnaHQgPSBnYW1lLlZJRVdfSEVJR0hUO1xuXG5cblxuZ2FtZS5yZW5kZXIoY3R4KTtcblxuZ2FtZS5wbGF5ZXIubW92ZShbMCwtMV0pOyJdLCJzb3VyY2VSb290IjoiIn0=
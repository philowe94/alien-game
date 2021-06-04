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
    }
  }, {
    key: "moveObjects",
    value: function moveObjects() {//this.player.move();
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
      });
      this.player.render(ctx);
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
        var move = _this.DIRS[k];
        key(k, function () {
          return _this.game.player.move(move);
        });
      });
    } //run the game

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this.bindKeys();
      setInterval(function () {
        return _this2.animate();
      }, 16.66);
    }
  }, {
    key: "animate",
    value: function animate() {
      this.game.step();
      this.game.render(this.ctx);
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

      if (newPosTile instanceof Floor) {
        this.pos = newPos;
      }

      console.log(this.pos);
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


var Game = __webpack_require__(/*! ./game */ "./src/game.js");

var GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

document.addEventListener("DOMContentLoaded", function () {
  //canvas research
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d'); //set up game

  var map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  var game = new Game(map, [1, 1]);
  canvas.width = game.VIEW_WIDTH;
  canvas.height = game.VIEW_HEIGHT;
  new GameView(game, ctx).start();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9mbG9vci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvdGlsZS5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy93YWxsLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVpYW5reW8tYWxpZW4vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiVGlsZSIsInJlcXVpcmUiLCJGbG9vciIsIm1vZHVsZSIsImV4cG9ydHMiLCJQbGF5ZXIiLCJXYWxsIiwiR2FtZSIsIm1hcCIsInBsYXllcnBvcyIsIlZJRVdfV0lEVEgiLCJWSUVXX0hFSUdIVCIsIldJRFRIIiwiSEVJR0hUIiwiRlBTIiwiQkdfQ09MT1IiLCJhZGRNYXAiLCJwbGF5ZXIiLCJnYW1lIiwicG9zIiwiZm9yRWFjaCIsInJvdyIsInJvd19pIiwic3F1YXJlIiwiY29sX2kiLCJtb3ZlT2JqZWN0cyIsImN0eCIsImNsZWFyUmVjdCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwicmVuZGVyIiwiR2FtZVZpZXciLCJESVJTIiwidyIsImEiLCJzIiwiZCIsIk9iamVjdCIsImtleXMiLCJrIiwibW92ZSIsImtleSIsImJpbmRLZXlzIiwic2V0SW50ZXJ2YWwiLCJhbmltYXRlIiwic3RlcCIsIm9wdGlvbnMiLCJjb2xvciIsImRpciIsIm5ld1BvcyIsIm5ld1Bvc1RpbGUiLCJnZXRNYXBUaWxlIiwiY29uc29sZSIsImxvZyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLElBQUksR0FBR0MsbUJBQU8sQ0FBQyw2QkFBRCxDQUFwQjs7SUFFTUMsSzs7Ozs7QUFDRixtQkFBYztBQUFBOztBQUFBO0FBRWI7OztFQUhlRixJOztBQU1wQkcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixLQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDUkEsSUFBTUcsTUFBTSxHQUFHSixtQkFBTyxDQUFDLGlDQUFELENBQXRCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsbUJBQU8sQ0FBQywrQkFBRCxDQUFyQjs7QUFDQSxJQUFNSyxJQUFJLEdBQUdMLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0lBRU1NLEk7QUFDRixnQkFBWUMsR0FBWixFQUFpQkMsU0FBakIsRUFBNEI7QUFBQTs7QUFDeEIsU0FBS0MsVUFBTCxHQUFrQixHQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEVBQVg7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLFNBQWhCO0FBRUEsU0FBS1AsR0FBTCxHQUFXLEVBQVg7QUFDQSxTQUFLUSxNQUFMLENBQVlSLEdBQVo7QUFDQSxTQUFLUyxNQUFMLEdBQWMsSUFBSVosTUFBSixDQUFXO0FBQUNhLFVBQUksRUFBRSxJQUFQO0FBQWFDLFNBQUcsRUFBRVY7QUFBbEIsS0FBWCxDQUFkO0FBQ0g7Ozs7V0FFRCxvQkFBV1UsR0FBWCxFQUFnQjtBQUNaLGFBQU8sS0FBS1gsR0FBTCxDQUFTVyxHQUFHLENB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Q0FBbkIsQ0FETSxFQUVOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FGTSxFQUdOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FITSxFQUlOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FKTSxFQUtOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FMTSxFQU1OLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FOTSxFQU9OLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FQTSxFQVFOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FSTSxFQVNOLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FUTSxDQUFWO0FBV0EsTUFBSVUsSUFBSSxHQUFHLElBQUlYLElBQUosQ0FBU0MsR0FBVCxFQUFjLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZCxDQUFYO0FBQ0FnRCxRQUFNLENBQUNHLEtBQVAsR0FBZXpDLElBQUksQ0FBQ1IsVUFBcEI7QUFDQThDLFFBQU0sQ0FBQ0ksTUFBUCxHQUFnQjFDLElBQUksQ0FBQ1AsV0FBckI7QUFFQSxNQUFJb0IsUUFBSixDQUFhYixJQUFiLEVBQW1CUSxHQUFuQixFQUF3Qm1DLEtBQXhCO0FBRUgsQ0F2QkQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBGbG9vciBleHRlbmRzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbG9vcjsiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5jb25zdCBGbG9vciA9IHJlcXVpcmUoXCIuL2Zsb29yXCIpO1xuY29uc3QgV2FsbCA9IHJlcXVpcmUoXCIuL3dhbGxcIik7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKG1hcCwgcGxheWVycG9zKSB7XG4gICAgICAgIHRoaXMuVklFV19XSURUSCA9IDY0MDtcbiAgICAgICAgdGhpcy5WSUVXX0hFSUdIVCA9IDQ3NztcbiAgICAgICAgdGhpcy5XSURUSCA9IDEwO1xuICAgICAgICB0aGlzLkhFSUdIVCA9IDk7XG4gICAgICAgIHRoaXMuRlBTID0gNjA7XG4gICAgICAgIHRoaXMuQkdfQ09MT1IgPSBcIiNmZjU3MzNcIjtcblxuICAgICAgICB0aGlzLm1hcCA9IFtdO1xuICAgICAgICB0aGlzLmFkZE1hcChtYXApO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe2dhbWU6IHRoaXMsIHBvczogcGxheWVycG9zIH0pO1xuICAgIH1cblxuICAgIGdldE1hcFRpbGUocG9zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFtwb3NbMF1dW3Bvc1sxXV07XG4gICAgfVxuXG4gICAgLy9naXZlbiBhIGdyaWQsIHNldCB0aGlzLmdyaWQgdG8gYW4gYXJyYXkgb2YgdGhlIGNsYXNzZXNcbiAgICBhZGRNYXAobWFwKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuXG4gICAgICAgIHRoaXMubWFwLmZvckVhY2goIChyb3csIHJvd19pKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCggKHNxdWFyZSwgY29sX2kpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAwIGlzIGZsb29yXG4gICAgICAgICAgICAgICAgaWYgKHNxdWFyZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IEZsb29yKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8xIGlzIHdhbGxcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNxdWFyZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtyb3dfaV1bY29sX2ldID0gbmV3IFdhbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1vdmVPYmplY3RzKCkge1xuICAgICAgICAvL3RoaXMucGxheWVyLm1vdmUoKTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgICB0aGlzLm1vdmVPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgLy9yZW5kZXIgdGhlIGN1cnJlbnQgZ2FtZXN0YXRlXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuVklFV19XSURUSCwgdGhpcy5WSUVXX0hFSUdIVCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLkJHX0NPTE9SO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5WSUVXX1dJRFRILCB0aGlzLlZJRVdfSEVJR0hUKTtcbiAgICAgICAgLy9yZW5kZXIgdGhlIG1hcFxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoKCAocm93LCByb3dfaSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goIChzcXVhcmUsIGNvbF9pKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLnJlbmRlcihjdHgpOyAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoY3R4KTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIEdhbWVWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcblxuICAgICAgICB0aGlzLkRJUlMgPSB7XG4gICAgICAgICAgICB3OiBbMCwgLTFdLFxuICAgICAgICAgICAgYTogWy0xLCAwXSxcbiAgICAgICAgICAgIHM6IFswLCAxXSxcbiAgICAgICAgICAgIGQ6IFsxLCAwXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9iaW5kIGtleXMgdG8gbW92ZXNcbiAgICBiaW5kS2V5cygpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5ESVJTKS5mb3JFYWNoKCAoaykgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbW92ZSA9IHRoaXMuRElSU1trXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5KGssICgpID0+IHRoaXMuZ2FtZS5wbGF5ZXIubW92ZShtb3ZlKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL3J1biB0aGUgZ2FtZVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmJpbmRLZXlzKCk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5hbmltYXRlKCksIDE2LjY2KTtcbiAgICB9XG5cbiAgICBhbmltYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuc3RlcCgpO1xuICAgICAgICB0aGlzLmdhbWUucmVuZGVyKHRoaXMuY3R4KTtcbiAgICAgICAgXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVWaWV3OyIsImNvbnN0IEZsb29yID0gcmVxdWlyZShcIi4vZmxvb3JcIik7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3NcblxuICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWVcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAodGhpcy5wb3NbMF0gKiA2NCksIFxuICAgICAgICAgICAgKHRoaXMucG9zWzFdICogNTMpLCBcbiAgICAgICAgICAgIDY0LCBcbiAgICAgICAgICAgIDUzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbW92ZShkaXIpIHtcbiAgICAgICAgbGV0IG5ld1BvcyA9IFtcbiAgICAgICAgICAgIHRoaXMucG9zWzBdICsgZGlyWzBdLFxuICAgICAgICAgICAgdGhpcy5wb3NbMV0gKyBkaXJbMV1cbiAgICAgICAgXVxuICAgICAgICBcbiAgICAgICAgbGV0IG5ld1Bvc1RpbGUgPSB0aGlzLmdhbWUuZ2V0TWFwVGlsZShuZXdQb3MpO1xuXG4gICAgICAgIGlmIChuZXdQb3NUaWxlIGluc3RhbmNlb2YgRmxvb3IpIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gbmV3UG9zO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9zKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGU7IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJy4vdGlsZScpO1xuXG5jbGFzcyBXYWxsIGV4dGVuZHMgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5jb25zdCBHYW1lVmlldyA9IHJlcXVpcmUoXCIuL2dhbWVfdmlld1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy9jYW52YXMgcmVzZWFyY2hcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy9zZXQgdXAgZ2FtZVxuICAgIGxldCBtYXAgPSBbXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgWzAsMCwwLDEsMCwxLDAsMCwwLDBdLFxuICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwXSxcbiAgICAgICAgWzAsMCwwLDAsMCwwLDAsMCwwLDBdLFxuICAgICAgICBbMCwwLDAsMCwwLDAsMCwwLDAsMF0sXG4gICAgXTtcbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKG1hcCwgWzEsMV0pO1xuICAgIGNhbnZhcy53aWR0aCA9IGdhbWUuVklFV19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZ2FtZS5WSUVXX0hFSUdIVDtcblxuICAgIG5ldyBHYW1lVmlldyhnYW1lLCBjdHgpLnN0YXJ0KCk7XG5cbn0pO1xuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
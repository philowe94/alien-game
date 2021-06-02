/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = __webpack_require__(/*! ./player */ "./src/player.js");

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.WIDTH = 640;
    this.HEIGHT = 480;
    this.FPS = 60;
    this.BG_COLOR = "#ff5733";
    this.grid = [];
    this.player = new Player();
  }

  _createClass(Game, [{
    key: "addGrid",
    value: function addGrid(grid) {
      this.grid = grid;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      ctx.fillStyle = this.BG_COLOR;
      ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
      this.player.draw(ctx);
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
/***/ (function(module) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);

    this.color = "#000000";
    this.pos = [50, 80];
    this.size = 20;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0] - this.size / 2, this.pos[1] - this.size / 2, this.size, this.size);
    }
  }]);

  return Player;
}();

module.exports = Player;

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


var Game = __webpack_require__(/*! ./game */ "./src/game.js"); //Test to see if JS is working


console.log("Hello worldd"); //canvas research

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var game = new Game();
canvas.width = game.WIDTH;
canvas.height = game.HEIGHT;
var grid = [0, 0, 0, 0.0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
game.addGrid(grid);
game.render(ctx);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZWlhbmt5by1hbGllbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hlaWFua3lvLWFsaWVuLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlBsYXllciIsInJlcXVpcmUiLCJHYW1lIiwiV0lEVEgiLCJIRUlHSFQiLCJGUFMiLCJCR19DT0xPUiIsImdyaWQiLCJwbGF5ZXIiLCJjdHgiLCJjbGVhclJlY3QiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRyYXciLCJtb2R1bGUiLCJleHBvcnRzIiwiY29sb3IiLCJwb3MiLCJzaXplIiwiY29uc29sZSIsImxvZyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiZ2FtZSIsIndpZHRoIiwiaGVpZ2h0IiwiYWRkR3JpZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHQyxtQkFBTyxDQUFDLGlDQUFELENBQXRCOztJQUVNQyxJO0FBQ0Ysa0JBQWM7QUFBQTs7QUFDVixTQUFLQyxLQUFMLEdBQWEsR0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxHQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEVBQVg7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLFNBQWhCO0FBRUEsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSVIsTUFBSixFQUFkO0FBQ0g7Ozs7V0FFRCxpQkFBUU8sSUFBUixFQUFjO0FBQ1YsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OztXQUVELGdCQUFPRSxHQUFQLEVBQVk7QUFDUkEsU0FBRyxDQUFDQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixLQUFLUCxLQUF6QixFQUFnQyxLQUFLQyxNQUFyQztBQUNBSyxTQUFHLENBQUNFLFNBQUosR0FBZ0IsS0FBS0wsUUFBckI7QUFDQUcsU0FBRyxDQUFDRyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixLQUFLVCxLQUF4QixFQUErQixLQUFLQyxNQUFwQztBQUVBLFdBQUtJLE1BQUwsQ0FBWUssSUFBWixDQUFpQkosR0FBakI7QUFDSDs7Ozs7O0FBSUxLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmIsSUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztJQzNCTUYsTTtBQUNGLG9CQUFjO0FBQUE7O0FBQ1YsU0FBS2dCLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBWDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0g7Ozs7V0FFRCxjQUFLVCxHQUFMLEVBQVU7QUFFTkEsU0FBRyxDQUFDRSxTQUFKLEdBQWdCLEtBQUtLLEtBQXJCO0FBQ0FQLFNBQUcsQ0FBQ0csUUFBSixDQUNJLEtBQUtLLEdBQUwsQ0FBUyxDQUFULElBQWMsS0FBS0MsSUFBTCxHQUFVLENBRDVCLEVBRUksS0FBS0QsR0FBTCxDQUFTLENBQVQsSUFBYyxLQUFLQyxJQUFMLEdBQVUsQ0FGNUIsRUFHSSxLQUFLQSxJQUhULEVBSUksS0FBS0EsSUFKVDtBQU1IOzs7Ozs7QUFHTEosTUFBTSxDQUFDQyxPQUFQLEdBQWlCZixNQUFqQixDOzs7Ozs7Ozs7Ozs7QUNuQkE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRCxtQkFBTyxDQUFDLDZCQUFELENBQXBCLEMsQ0FFQTs7O0FBQ0FrQixPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEUsQ0FFQTs7QUFDQSxJQUFJQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFiO0FBQ0EsSUFBSWQsR0FBRyxHQUFHWSxNQUFNLENBQUNHLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVjtBQUVBLElBQUlDLElBQUksR0FBRyxJQUFJdkIsSUFBSixFQUFYO0FBQ0FtQixNQUFNLENBQUNLLEtBQVAsR0FBZUQsSUFBSSxDQUFDdEIsS0FBcEI7QUFDQWtCLE1BQU0sQ0FBQ00sTUFBUCxHQUFnQkYsSUFBSSxDQUFDckIsTUFBckI7QUFDQSxJQUFJRyxJQUFJLEdBQUcsQ0FDUCxDQURPLEVBQ0wsQ0FESyxFQUNILENBREcsRUFDRCxHQURDLEVBRVAsQ0FGTyxFQUVMLENBRkssRUFFSCxDQUZHLEVBRUQsQ0FGQyxFQUVDLENBRkQsRUFHUCxDQUhPLEVBR0wsQ0FISyxFQUdILENBSEcsRUFHRCxDQUhDLEVBR0MsQ0FIRCxFQUlQLENBSk8sRUFJTCxDQUpLLEVBSUgsQ0FKRyxFQUlELENBSkMsRUFJQyxDQUpELEVBS1AsQ0FMTyxFQUtMLENBTEssRUFLSCxDQUxHLEVBS0QsQ0FMQyxFQUtDLENBTEQsQ0FBWDtBQU9Ba0IsSUFBSSxDQUFDRyxPQUFMLENBQWFyQixJQUFiO0FBQ0FrQixJQUFJLENBQUNJLE1BQUwsQ0FBWXBCLEdBQVosRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUGxheWVyID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5XSURUSCA9IDY0MDtcbiAgICAgICAgdGhpcy5IRUlHSFQgPSA0ODA7XG4gICAgICAgIHRoaXMuRlBTID0gNjA7XG4gICAgICAgIHRoaXMuQkdfQ09MT1IgPSBcIiNmZjU3MzNcIjtcblxuICAgICAgICB0aGlzLmdyaWQgPSBbXVxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICB9XG5cbiAgICBhZGRHcmlkKGdyaWQpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5XSURUSCwgdGhpcy5IRUlHSFQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5CR19DT0xPUjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuV0lEVEgsIHRoaXMuSEVJR0hUKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVyLmRyYXcoY3R4KTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgdGhpcy5wb3MgPSBbNTAsIDgwXTtcbiAgICAgICAgdGhpcy5zaXplID0gMjA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICB0aGlzLnBvc1swXSAtIHRoaXMuc2l6ZS8yLCBcbiAgICAgICAgICAgIHRoaXMucG9zWzFdIC0gdGhpcy5zaXplLzIsIFxuICAgICAgICAgICAgdGhpcy5zaXplLCBcbiAgICAgICAgICAgIHRoaXMuc2l6ZVxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5cbi8vVGVzdCB0byBzZWUgaWYgSlMgaXMgd29ya2luZ1xuY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZGRcIik7XG5cbi8vY2FudmFzIHJlc2VhcmNoXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoKTtcbmNhbnZhcy53aWR0aCA9IGdhbWUuV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gZ2FtZS5IRUlHSFQ7XG5sZXQgZ3JpZCA9IFtcbiAgICAwLDAsMCwwLjAsXG4gICAgMCwxLDAsMSwwLFxuICAgIDAsMSwwLDEsMCxcbiAgICAwLDAsMSwwLDAsXG4gICAgMCwwLDAsMCwwLFxuXVxuZ2FtZS5hZGRHcmlkKGdyaWQpO1xuZ2FtZS5yZW5kZXIoY3R4KTsiXSwic291cmNlUm9vdCI6IiJ9
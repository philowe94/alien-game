// Imports
import "./styles/index.scss";
const Game = require("./game");

//Test to see if JS is working
console.log("Hello worldd");

//canvas research
let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let game = new Game();
canvas.width = game.WIDTH;
canvas.height = game.HEIGHT;
let grid = [
    0,0,0,0.0,
    0,1,0,1,0,
    0,1,0,1,0,
    0,0,1,0,0,
    0,0,0,0,0,
]
game.addGrid(grid);
game.render(ctx);
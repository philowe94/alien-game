// Imports
import "./styles/index.scss";
const Game = require("./game");


//canvas research
let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

//set up game
let map = [
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
    [0,0,0,0.0,0,0,0,0,0],
];
let game = new Game(map, [1,1]);
canvas.width = game.VIEW_WIDTH;
canvas.height = game.VIEW_HEIGHT;



game.render(ctx);

game.player.move([0,-1]);
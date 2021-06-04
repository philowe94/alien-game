// Imports
import "./styles/index.scss";
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function() {
    //canvas research
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext('2d');

    //set up game

    let game = new Game([0,0]);
    canvas.width = game.VIEW_WIDTH;
    canvas.height = game.VIEW_HEIGHT;

    new GameView(game, ctx).start();

});





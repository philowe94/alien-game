const Player = require("./player");

class Game {
    constructor() {
        this.WIDTH = 640;
        this.HEIGHT = 480;
        this.FPS = 60;
        this.BG_COLOR = "#ff5733";

        this.grid = []
        this.player = new Player();
    }

    addGrid(grid) {
        this.grid = grid;
    }

    render(ctx) {
        ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        ctx.fillStyle = this.BG_COLOR;
        ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        
        this.player.draw(ctx);
    }

}

module.exports = Game;
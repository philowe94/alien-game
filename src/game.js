const Player = require("./player");
const Floor = require("./floor");
const Wall = require("./wall");

class Game {
    constructor(map, playerpos) {
        this.VIEW_WIDTH = 640;
        this.VIEW_HEIGHT = 477;
        this.WIDTH = 10;
        this.HEIGHT = 9;
        this.FPS = 60;
        this.BG_COLOR = "#ff5733";

        this.map = [];
        this.addMap(map);
        this.player = new Player({game: this, pos: playerpos });
    }

    getMapTile(pos) {
        return this.map[pos[0]][pos[1]];
    }

    //given a grid, set this.grid to an array of the classes
    addMap(map) {
        this.map = map;

        this.map.forEach( (row, row_i) => {
            row.forEach( (square, col_i) => {
                // 0 is floor
                if (square === 0) {
                    this.map[row_i][col_i] = new Floor();
                
                //1 is wall
                } else if (square === 1) {
                    this.map[row_i][col_i] = new Wall();
                }
            })
        })
    }

    moveObjects() {
        //this.player.move();
    }

    step() {
        this.moveObjects();
    }

    //render the current gamestate
    render(ctx) {
        ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
        ctx.fillStyle = this.BG_COLOR;
        ctx.fillRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
        //render the map
        this.map.forEach( (row, row_i) => {
            row.forEach( (square, col_i) => {
                square.render(ctx);      
            })
        })

        this.player.render(ctx);
    }

}

module.exports = Game;
const Player = require("./player");
const Floor = require("./floor");
const Wall = require("./wall");
const Alien = require("./alien");

class Game {
    constructor(playerpos) {
        this.VIEW_WIDTH = 640;
        this.VIEW_HEIGHT = 576;
        this.WIDTH = 10;
        this.HEIGHT = 9;
        this.FPS = 60;
        this.BG_COLOR = "#ff5733";

        this.level1 = [
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,1,1,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,1,1,1,0,0,0],
            [1,0,0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0,1,1],
            [0,1,0,1,0,1,1,0,0,0],
            [0,0,0,0,0,1,0,0,0,0],
            [0,0,1,1,0,0,0,0,0,0],
        ];

        this.level2 = [
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,0,0,0],
            [1,0,0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0,1,1],
            [0,1,0,1,0,1,1,0,0,0],
            [0,0,0,0,0,1,0,0,0,0],
            [0,0,1,1,0,0,0,0,0,0],
        ];

        this.level3 = [
            [0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,1,1,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,1,1,1,0,0,0],
            [1,0,0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0,1,1],
            [0,1,0,1,0,1,1,0,0,0],
            [0,0,0,0,0,1,0,0,0,0],
            [0,0,1,1,0,0,0,0,0,0],
        ];


        this.addMap(this.level1);
        this.player = new Player({game: this, pos: playerpos });
        this.aliens = [
            new Alien({game: this, pos: [0, 8]}),
            new Alien({game: this, pos: [4, 4]}),
            new Alien({game: this, pos: [5, 5]})
        ];

        this.STATE = "MAIN_MENU";

    }

    gameOver() {
        this.player = [];
    }

    // [ horizontal, vertical ]
    getMapTile(pos) {
        if(pos) {
            return this.map[pos[1]][pos[0]];
        }
    }

    // returns true if pos is on the board, false if otherwise
    isLegalPosition(pos) {
        if (pos) {
            if( pos[0] >= 0 && pos[0] < this.map[0].length) {
                if ( pos[1] >= 0 && pos[1] < this.map.length) {
                    return true;
                }
            }
        }
        return false;
    }

    //given a grid, set this.grid to an array of the classes
    addMap(map) {
        this.map = map;

        this.map.forEach( (row, row_i) => {
            row.forEach( (square, col_i) => {
                // 0 is floor
                if (square === 0) {
                    
                    this.map[row_i][col_i] = new Floor({pos: [col_i, row_i]});
                
                //1 is wall
                } else if (square === 1) {
                    this.map[row_i][col_i] = new Wall({pos: [col_i, row_i]});
                }
            })
        })
    }

    moveObjects() {
        switch (this.state) {
            case "PLAYING":
                this.player.move();
                this.aliens.forEach( (alien) => {
                    alien.move();
                });
        default:
            break;
        }
        
    }



    start() {
        this.state = "PLAYING"
    }

    step() {

        switch (this.state) {
            case "PLAYING":
            this.moveObjects();
            break;
        default:
            break;
        }
    }
    //render the current gamestate
    render(ctx) {
        ctx.imageSmoothingEnabled = false;


        switch (this.state) {
            case "PLAYING":
                ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
                ctx.fillStyle = this.BG_COLOR;
                ctx.fillRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
                //render the map
                this.map.forEach( (row, row_i) => {
                    row.forEach( (square, col_i) => {
                        square.render(ctx);      
                    })
                })
        
                //render the actors
                this.player.render(ctx);
                this.aliens.forEach( (alien) => {
                    alien.render(ctx);
                })

                
                //check if all aliens are defeated
                if(this.aliens.every((alien) => alien.state === "DEAD")) {
                    
                    this.addMap(this.level2);
                }
                
                break;
            default:
                ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
                ctx.font = "20px Georgia";
                ctx.fillText("Press Enter to start the game", 10, 50);
                break;
        }
    }
}

module.exports = Game;
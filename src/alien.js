const Floor = require("./floor");

class Alien {
    constructor(options) {
        this.pos = options.pos;
        this.color = "#ffffff";
        this.game = options.game;
        this.state = this.decideNewState();
        this.state_timer = 0;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(
            (this.pos[0] * 64) + (64/2), 
            (this.pos[1] * 53) + (53/2), 
            20, 
            2 * Math.PI,
            false
            );
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    decideNewState() {
        //randomly choose direction
        let dirs = [
            [ 0, -1], //up
            [-1,  0], //left
            [ 0,  1],  //down
            [ 1,  0]   //right
        ];

        let randomDir = dirs[Math.floor(Math.random() * dirs.length)];
        
        while (!this.game.getMapTile([this.pos[0] + randomDir[0], this.pos[1] + randomDir[1]]) instanceof Floor) {
            randomDir = dirs[Math.floor(Math.random() * dirs.length)];
        }
    }

    move() {
        switch (this.state) {
            case "MOVING_UP":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0], this.pos[1] - 1];
                    this.state = "FACING_UP";
                    console.log(this.state);
                }
                break;
            case "MOVING_LEFT":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0] - 1, this.pos[1]];
                    this.state = "FACING_LEFT";
                    console.log(this.state);
                }
                break;
            case "MOVING_DOWN":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0], this.pos[1] + 1];
                    this.state = "FACING_DOWN";
                    console.log(this.state);
                }
                break;

            case "MOVING_RIGHT":
                this.state_timer += 1;
                if (this.state_timer === 16) {
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
}

module.exports = Alien;
const Floor = require("./floor");
const Wall = require("./wall");

class Player {
    constructor(options) {
        this.color = "#000000";
        this.pos = options.pos;
        this.game = options.game;
        this.state = "FACING_DOWN";
        this.state_timer = 0;

        this.DIRS = {
            w: [0, -1],
            a: [-1, 0],
            s: [0, 1],
            d: [1, 0]
        }
    }

    render(ctx) {

        switch (this.state) {
            case "FACING_UP":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
            case "FACING_LEFT":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
            case "FACING_DOWN":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
            case "FACING_RIGHT":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
            case "MOVING_UP":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64) , 
                    (this.pos[1] * 53) - (this.state_timer * (53/16)), 
                    64, 
                    53
                );
                break;
            case "MOVING_LEFT":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64) - (this.state_timer * (64/16)), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
                break;
            case "MOVING_DOWN":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64) , 
                    (this.pos[1] * 53) + (this.state_timer * (53/16)), 
                    64, 
                    53
                );
                break;
            case "MOVING_RIGHT":
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    (this.pos[0] * 64) + (this.state_timer * (64/16)), 
                    (this.pos[1] * 53), 
                    64, 
                    53
                );
                break;
            default:
                break;
        }
    }

    set_state(k) {
        let nextPos = [];

        if (["FACING_DOWN", "FACING_UP", "FACING_LEFT", "FACING_RIGHT"].includes(this.state)) {
            if (Object.keys(this.DIRS).includes(k)) {
                switch (k) {
                    case "w":
                        nextPos = [this.pos[0], this.pos[1] - 1]
                        if (this.game.getMapTile([this.pos[0], this.pos[1] - 1]) instanceof Floor){
                            this.state = "MOVING_UP";
                        }
                        break;
                    case "a":
                        nextPos = [this.pos[0] - 1, this.pos[1] ];
                        if (this.game.getMapTile(nextPos) instanceof Floor){
                            this.state = "MOVING_LEFT";
                        }
                        break;
                    case "s":
                        nextPos = [this.pos[0], this.pos[1] + 1];
                        if (this.game.getMapTile(nextPos) instanceof Floor){
                            this.state = "MOVING_DOWN";
                        }
                        break;
                    case "d":
                        nextPos = [this.pos[0] + 1, this.pos[1]];
                        if (this.game.getMapTile(nextPos) instanceof Floor){
                            this.state = "MOVING_RIGHT";
                        }
                        break;
                    default:
                        break;
                }
            }
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

module.exports = Player;
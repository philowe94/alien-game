const Floor = require("./floor");
const Wall = require("./wall");


class Player {
    constructor(options) {
        this.color = "#000000";
        this.pos = options.pos;
        this.game = options.game;
        this.state = "FACING_DOWN";
        this.state_timer = 0;
        this.sprites = new Image();
        this.sprites.src = 'https://philowe94.github.io/heiankyo-alien/assets/chibi-layered.png';

        this.DIRS = {
            w: [0, -1],
            a: [-1, 0],
            s: [0, 1],
            d: [1, 0]
        }
    }

    dig(digpos){
        console.log("DIGGING");
        console.log(digpos);
        let digTile = this.game.getMapTile(digpos);
        if (digTile instanceof Floor){
            digTile.dig();
            console.log(digTile.digLevel);
        }
    }

    fill(fillpos){
        console.log("FILLING");
        console.log(fillpos);
        let fillTile = this.game.getMapTile(fillpos);
        if (fillTile instanceof Floor){
            if (fillTile.digLevel === 1) {
                this.game.aliens.forEach( (alien) => {
                    if (fillTile.pos[0] === alien.pos[0] &&
                        fillTile.pos[1] === alien.pos[1]) {
                            alien.die();
                        }            
                })
            }
            if (fillTile.digLevel >= 1) {
                fillTile.fill();
                console.log(digTile.digLevel);
            }
        }
    }

    getDigPos() {
        let dirsStates = ["FACING_UP", "FACING_LEFT", "FACING_DOWN", "FACING_RIGHT"];
        let dirIdx = dirsStates.indexOf(this.state);

        if (dirIdx >=0) {
            let dir = Object.values(this.DIRS)[dirIdx];
            let digPos = [this.pos[0] + dir[0], this.pos[1] + dir[1]]
            if (this.game.isLegalPosition(digPos)) {
                return digPos;
            }
        } else {
            return null;
        }
    }

    set_state(k) {
        let nextPos = [];

        if (["FACING_DOWN", "FACING_UP", "FACING_LEFT", "FACING_RIGHT"].includes(this.state)) {
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
                case "k":
                    let digPos = this.getDigPos();
                    this.dig(digPos);
                    break;
                case "j":
                    let fillPos = this.getDigPos();
                    this.fill(fillPos);
                    break;
                default:
                    break;
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

    render(ctx) {

        switch (this.state) {
            case "FACING_UP":
                ctx.drawImage(
                    this.sprites,
                    32,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64), 
                    (this.pos[1] * 64), 
                    64, 
                    64
                );
                break;
            case "FACING_LEFT":
                ctx.drawImage(
                    this.sprites,
                    16,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64), 
                    (this.pos[1] * 64), 
                    64, 
                    64
                );
                break;
            case "FACING_DOWN":
                
                ctx.drawImage(
                    this.sprites,
                    0,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64), // offset on canvas
                    (this.pos[1] * 64), 
                    64, 64 // size on canvas
                );
                break;
            case "FACING_RIGHT":
                ctx.drawImage(
                    this.sprites,
                    144,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64), 
                    (this.pos[1] * 64), 
                    64, 
                    64
                );
                break;
            case "MOVING_UP":
                ctx.drawImage(
                    this.sprites,
                    80,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64) , 
                    (this.pos[1] * 64) - (this.state_timer * (64/16)), 
                    64, 
                    64
                );
                break;
            case "MOVING_LEFT":
                ctx.drawImage(
                    this.sprites,
                    64,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64) - (this.state_timer * (64/16)), 
                    (this.pos[1] * 64), 
                    64, 
                    64
                );
                break;
            case "MOVING_DOWN":
                ctx.drawImage(
                    this.sprites,
                    48,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64) , 
                    (this.pos[1] * 64) + (this.state_timer * (64/16)), 
                    64, 
                    64
                );
                break;
            case "MOVING_RIGHT":
                ctx.drawImage(
                    this.sprites,
                    160,0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64) + (this.state_timer * (64/16)), 
                    (this.pos[1] * 64), 
                    64, 
                    64
                );
                break;
            default:
                break;
        }
    }
}

module.exports = Player;
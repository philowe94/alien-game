const Floor = require("./floor");

class Alien {
    constructor(options) {
        this.pos = options.pos;
        this.color = "#ffffff";
        this.game = options.game;
        this.state = this.decideNewState();
        this.state_timer = 0;
        this.sprites = new Image();
        this.sprites.src = 'https://philowe94.github.io/heiankyo-alien/assets/alien-sprite.png';
    }

    die() {
        this.state = "DEAD";
    }

    checkCollision() {
        let mapTile = this.game.getMapTile(this.pos);
        if (mapTile instanceof Floor) {
            if (mapTile.digLevel === 1) {
                this.state = "FILLING_TRAP";
            }
            if (mapTile.digLevel === 2) {
                this.state = "TRAPPED";
            }
        }
        if (this.pos[0] === this.game.player.pos[0] &&
            this.pos[1] === this.game.player.pos[1]) {
                this.game.player.state = "DEAD";
        } 
    }

    decideNewState() {
        //randomly choose direction
        let dirs = [
            [ 0, -1], //up
            [-1,  0], //left
            [ 0,  1],  //down
            [ 1,  0]   //right
        ];

        let legalDirIdxs = [];
        //get rid of illegal positions
        dirs.forEach((dir, idx) => {
            let newPos = [this.pos[0] + dir[0], this.pos[1] + dir[1]]
            if (this.game.isLegalPosition(newPos)) {
                legalDirIdxs.push(idx);
            }
        })

        let floorDirIdxs = [];
        legalDirIdxs.forEach((diridx, idx) => {
            let newPos = [this.pos[0] + dirs[diridx][0], this.pos[1] + dirs[diridx][1]]
            if (this.game.getMapTile(newPos) instanceof Floor) {
                floorDirIdxs.push(diridx);
            }
        })

        //get random move
        let index = floorDirIdxs[Math.floor(Math.random() * floorDirIdxs.length)];

        let newState = "";
        switch (index) {
            case 0:
                newState = "MOVING_UP";
                break;
            case 1:
                newState = "MOVING_LEFT";
                break;
            case 2:
                newState = "MOVING_DOWN";
                break;
            case 3:
                newState = "MOVING_RIGHT";
                break;
            default:
                break;
        }        

        
        return newState;
        
    }

    move() {
        
        switch (this.state) {
            case "MOVING_UP":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0], this.pos[1] - 1];
                    this.state = this.decideNewState();
                    this.checkCollision();
                }

                break;
            case "MOVING_LEFT":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0] - 1, this.pos[1]];
                    this.state = this.decideNewState();
                    this.checkCollision();
                }

                break;
            case "MOVING_DOWN":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0], this.pos[1] + 1];
                    this.state = this.decideNewState();
                    this.checkCollision();
                }

                break;

            case "MOVING_RIGHT":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    this.pos = [this.pos[0] + 1, this.pos[1] ];
                    this.state = this.decideNewState();
                    this.checkCollision();
                }

                break;
            case "FILLING_TRAP":
                this.state_timer += 1;
                if (this.state_timer === 16) {
                    this.state_timer = 0;
                    let mapTile = this.game.getMapTile(this.pos);
                    mapTile.digLevel = 0;
                    this.state = this.decideNewState();
                }
                break;
            case "TRAPPED":
                this.state_timer += 1;
                if (this.state_timer === 160) {
                    this.state_timer = 0;
   
                    this.state = this.decideNewState();
                }
                break;
            default:
                break;
        }


    }

    render(ctx) {
        switch (this.state) {
            case "MOVING_UP":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2), 
                    (this.pos[1] * 64) + (64/2) - (this.state_timer * (64/16)),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();

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
            case "MOVING_LEFT":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2) - (this.state_timer * (64/16)),
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
            case "MOVING_DOWN":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2),
                    (this.pos[1] * 64) + (64/2) + (this.state_timer * (64/16)),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
            case "MOVING_RIGHT":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2) + (this.state_timer * (64/16)),
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
            case "FILLING_TRAP":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2),
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
            case "TRAPPED":
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2),
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
        }

    }
}

module.exports = Alien;
const Floor = require("./floor");

class Player {
    constructor(options) {
        this.color = "#000000";
        this.pos = options.pos

        this.game = options.game
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            (this.pos[0] * 64), 
            (this.pos[1] * 53), 
            64, 
            53
        );
    }

    move(dir) {
        let newPos = [
            this.pos[0] + dir[0],
            this.pos[1] + dir[1]
        ]
        
        let newPosTile = this.game.getMapTile(newPos);

        if (newPosTile instanceof Floor) {
            this.pos = newPos;
        }
        console.log(this.pos);
    }
}

module.exports = Player;
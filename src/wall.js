const Tile = require('./tile');

class Wall extends Tile {
    constructor(options) {
        super(options);
        this.color = "#ff0000"
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
}

module.exports = Wall;
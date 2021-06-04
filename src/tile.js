class Tile {
    constructor(options) {
        
        this.pos = options.pos;
        this.color = "#222222"

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

module.exports = Tile;
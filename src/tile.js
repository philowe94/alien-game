class Tile {
    constructor(options) {
        
        this.pos = options.pos;
        this.color = "#222222"

    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            (this.pos[0] * 64), 
            (this.pos[1] * 64), 
            64, 
            64
        );
    }
}

module.exports = Tile;
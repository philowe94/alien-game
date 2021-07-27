const Tile = require('./tile');

class Wall extends Tile {
    constructor(options) {
        super(options);
        this.color = "#114b5f"
        this.sprites = new Image();
        this.sprites.src = 'assets/map-tiles.png';
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            (this.pos[0] * 64), 
            (this.pos[1] * 64), 
            64, 
            64
        );

        ctx.drawImage(
            this.sprites,
            0,0,
            16,16,
            (this.pos[0] * 64),
            (this.pos[1] * 64),
            64,
            64
        );
    }
}

module.exports = Wall;
const Tile = require('./tile');

class Floor extends Tile {
    constructor(options) {
        super(options);

        this.color = "#1a936f"
        this.digLevel = 0;
        this.sprites = new Image();
        this.sprites.src = 'assets/map-tiles.png';
    }

    fill() {

        if (this.digLevel >= 0) {
            this.digLevel -= 1;
        }
        
    }

    dig() {
        if (this.digLevel < 2) {
            this.digLevel += 1;
        }
    }

    render(ctx) {
        switch (this.digLevel) {
            case 0:

                ctx.drawImage(
                    this.sprites,
                    16,0,
                    16,16,
                    (this.pos[0] * 64),
                    (this.pos[1] * 64),
                    64,
                    64
                );
                break;
            case 1:
                ctx.drawImage(
                    this.sprites,
                    16,0,
                    16,16,
                    (this.pos[0] * 64),
                    (this.pos[1] * 64),
                    64,
                    64
                );
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2), 
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.lineWidth = 1;
                ctx.fillStyle = "#ffffff";
                ctx.stroke();
                break;
            case 2:
                ctx.drawImage(
                    this.sprites,
                    16,0,
                    16,16,
                    (this.pos[0] * 64),
                    (this.pos[1] * 64),
                    64,
                    64
                );
                ctx.beginPath();
                ctx.arc(
                    (this.pos[0] * 64) + (64/2), 
                    (this.pos[1] * 64) + (64/2),
                    20, 
                    2 * Math.PI,
                    false
                    );
                ctx.lineWidth = 3;
                ctx.fillStyle = "#ffffff";
                ctx.stroke();
                break;
            default:
                break;
        }
    }
}

module.exports = Floor;
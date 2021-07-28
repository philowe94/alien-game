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
                    32,0,
                    16,16,
                    (this.pos[0] * 64),
                    (this.pos[1] * 64),
                    64,
                    64
                );
       
                break;
            case 2:
                ctx.drawImage(
                    this.sprites,
                    64,0,
                    16,16,
                    (this.pos[0] * 64),
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

module.exports = Floor;
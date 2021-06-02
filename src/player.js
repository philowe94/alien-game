class Player {
    constructor() {
        this.color = "#000000";
        this.pos = [50, 80];
        this.size = 20;
    }

    draw(ctx) {
        
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos[0] - this.size/2, 
            this.pos[1] - this.size/2, 
            this.size, 
            this.size
        );
    }
}

module.exports = Player;
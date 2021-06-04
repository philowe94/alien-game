class GameView {

    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;

        this.DIRS = {
            w: [0, -1],
            a: [-1, 0],
            s: [0, 1],
            d: [1, 0]
        }
    }

    //bind keys to moves
    bindKeys() {
        Object.keys(this.DIRS).forEach( (k) => {
            
            let move = this.DIRS[k];
            
            key(k, () => this.game.player.move(move))
        })
    }

    //run the game
    start() {
        this.bindKeys();

        setInterval(() => this.animate(), 16.66);
    }

    animate() {
        this.game.step();
        this.game.render(this.ctx);
        
    }
}

module.exports = GameView;
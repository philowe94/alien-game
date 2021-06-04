class GameView {

    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.lastTime = 0;
 

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
            key(k, () => this.game.player.set_state(k))
        })
    }

    //run the game
    start() {
        this.bindKeys();

        requestAnimationFrame(this.animate.bind(this));
    };

    animate(time) {
        //change in time is current time - last time
        let timeDelta = time - this.lastTime;

        //if time has changed more than 16 ms
        if (timeDelta > 16.66) {
            this.game.step();
            this.game.render(this.ctx);

            //lastTime is current time
            this.lastTime = time + (timeDelta - 16.66);
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;
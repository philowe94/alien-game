# Alien Game

## Background and Overview

Alien Game is a maze action game, based on the classic PC/arcade game Heiankyo Alien. It involves digging ditches to trap aliens, and then covering up the hole on top of them. By trapping all aliens, the player moves on to the next stage.

![alien-game](/images/screenshot.png)

## Setup and Installation

Clone repo

`npm run watch`

Open up index.html in your browser, reccomended to use Live Server from VSCode.

## Functionality and MVPs

### Render game state

The current state of the game, which includes the map and all actors, is rendered onto a Javascript canvas.

### Move player character 

Inputs are handled correctly, triggering functions which move the player character and perform actions.

### Move enemies 

Aliens randomly determine which direction to move.

### Ability to trap aliens 

The player character is able to dig ditches. Aliens get stuck in the ditches. Filling a ditch that an alien is stuck in removes the Alien from the game.

### Game logic 

Mechanics such as collision, stage progression, restarting, and winning.

## Architecture and Technology

### Javascript

The game logic is entirely written in Object-Oriented Javascript. A Game-View object binds keys for and animates the Game object, which itself manages objects for each actor (the Player and the Aliens) and map tile (Walls and Floors), asking them to move and render themselves. Here is the code that handles this within the Game object.

```javascript 
    render(ctx) {
        ctx.imageSmoothingEnabled = false;


        switch (this.state) {
            case "PLAYING":
                ctx.clearRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
                ctx.fillStyle = this.BG_COLOR;
                ctx.fillRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
                //render the map
                this.map.forEach( (row, row_i) => {
                    row.forEach( (square, col_i) => {
                        square.render(ctx);      
                    })
                })
        
                //render the actors
                this.player.render(ctx);
                this.aliens.forEach( (alien) => {
                    alien.render(ctx);
                })

                
                //check if all aliens are defeated
                if(this.aliens.every((alien) => alien.state === "DEAD")) {
                    this.goToNextLevel();
                }

                //check if player is dead
                if(this.player.state === "DEAD") {
                    this.handleGameOver();
                }
                
                break;
```
All game logic is handled on a grid, with smooth animations being calculated in order to disguise this. This was done in order to have the game mechanics and feel more closely resemble the original game this is based on.


### HTML Canvas

The game state is rendered 60 times per second onto an HTML Canvas element. Each object has its own render method, which are all combined in order to create the scene. Sprite sheets are used by drawing the sprite sheet with different offsets to access different frames of animation.

Here is sample code from the Alien class demonstrating calculated animation. Every 8 frames the xoffset is changed which is what causes the Alien to have a walk cycle animation. Also the y position is decreased 16 times each time an alien moves up, which creates the appearence of the Alien smoothly moving up despite the Alien actually moving abruptly up one tile as far as collision is concerned.

```javascript
    render(ctx) {
        let xoffset = 0;
        if (this.state_timer > 8) {
            xoffset = 16;
        }
        switch (this.state) {
            
            case "MOVING_UP":
                ctx.drawImage(
                    this.sprites,
                    xoffset, 0, //offset on sprite sheet
                    16,16, //width/height on sprite sheet
                    (this.pos[0] * 64), 
                    (this.pos[1] * 64) - (this.state_timer * (64/16)),
                    64, 
                    64
                );
                break;
```

## Wireframe

https://wireframe.cc/pro/pp/c05c7ef5f446629

## Future Additions

In the future I would like to implement multiple enemy types, better enemy AI, more stages, and more environment/map tile types.

## Credits

Javascript Source Code and alien sprites by me

(Player character sprites)[https://route1rodent.itch.io/16x16-rpg-character-sprite-sheet] by route1rodent

(Environment sprites)[https://monkeyimage.itch.io/outdoors-gameboy-tileset] by MonkeyImage

Based on the classic (Heiankyo Alien)[https://en.wikipedia.org/wiki/Heiankyo_Alien] designed by the University of Tokyo's Theoretical Science Group (TSG) in 1979


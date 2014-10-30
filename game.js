// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        game.stage.backgroundColor = '#71c5cf';	  	
        game.load.image('player', 'clanger.png');
        game.load.image('pipe', 'missionbit.png');
    },

    // set up the game
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // create the player using the missionbit image and place it at (100, 245)
        this.player = game.add.sprite(100, 245, 'player');        
       	game.physics.arcade.enable(this.player);
        
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        
        this.player.body.gravity.y = 1000; 
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.jump, this);
        
        game.time.events.loop(2000, 
this.addPipe, this);
    },

    // update the state of the game
    update: function() {
  		if (this.player.inWorld === false)
            this.restartGame();
        
      game.physics.arcade.overlap(this.player, this.pipes, this.restartGame, null, this);      

    },
  
    // makes the player jump
    jump: function() {
  		this.player.body.velocity.y = -500; 
    },
  
    addPipe: function() {
        var pipe = this.pipes.getFirstDead();
        
        pipe.reset(800, 400);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

    },

    // resest the state of the game
    restartGame: function() {
        game.state.start('default');    
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);
game.state.start("default");
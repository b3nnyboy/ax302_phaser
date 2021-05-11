var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {preload: preload, create: create, update: 
	update });

var score = 0;

var lives = 3;

function preload(){
	game.load.image("sky", "./assets/sky.png");
	game.load.image("platform", "./assets/sky.png");
	game.load.image("star", "./assets/sky.png");
	game.load.spritesheet("dude", "./assets/dude.png", 32, 48);
	game.load.spritesheet("baddie", "./assets/baddie.png", 32, 32);
}

function create(){

	game.physics.startSystem(Phaser.physics.Arcade)

	game.add.sprite(0, 0, "sky");

	var platform = game.add.physicsGroup();
	platform.enableBody = true;

	var ground = platform.create(0, 550, "ground");
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	var style = {
		font: "32px Arial bold",
		fill: "#fff"
	};


	var scoreLabel = game.add.text(300, 560, "score: ", style);
	var scoreText = game.add.text(420, 560, score, style);
	scoreLabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	scoreText.setShadow(3,3,'rgba(0,0,0,0.5)',2);

	var lifeLabel = game.add.text(10,5, "Lives: ", style);
	var lifeText = game.add.text(120,5, lives,style);
	
	lifeLabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	lifeText.setShadow(3,3,'rgba(0,0,0,0.5)',2);

	stars = game.add.physicsGroup();
	stars.enableBody = true;

	for(var count = 0; count < 12; ++count){

		var star = stars.create(count * 70, 0, "star");

		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
}

// Creating the player sprite
player = game.add.sprite(32, 400, 'dude');
// Animating the player sprite
player.animations.add('left', [0, 1, 2, 3], 10, true);
player.animations.add('right', [5, 6, 7, 8], 10, true);
game.physics.arcade.enable(player);
player.body.bounce.y = 0.2;
player.body.gravity.y = 300;
player.body.collideWorldBounds = true;

// Create the enemy
enemy1 = game.add.sprite(760, 20, 'baddie');
// Animate the enemy1
enemy1.animations.add('left', [0,1], 10, true);
enemy1.animations.add('right', [2,3], 10, true);
game.physics.arcade.enable(enemy1);
enemy1.body.bounce.y = 0.2;
enemy1.body.gravity.y = 500;
enemy1.body.collideWorldBounds = true;

	cursors = game.imput.keyboard.createCursorKeys();

}



function update(){

	game.physics.arcade.collide(player, platform);
	game.physics.arcade.collide(stars, platform);
	game.physics.arcade.collide(enemy1, platform);
}





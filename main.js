var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {preload: preload, create: create, update: 
	update });

var score = 0;

var lives = 3;

function preload(){
	game.load.image("sky", "./assets/sky.png");
	game.load.image("platform", "./assets/platform.png");
	game.load.image("star", "./assets/star.png");
	game.load.spritesheet("dude", "./assets/dude.png", 32, 48);
	game.load.spritesheet("baddie", "./assets/baddie.png", 32, 32);

	game.load.image("diamond", "./assets/diamond.png");
	game.load.image("Health", "./assets/Health.png");
}

function create(){

	game.physics.startSystem(Phaser.Physics.ARCADE)

	game.add.sprite(0, 0, "sky");

	var platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	var ground = platforms.create(0, 550, "ground");
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
var player = game.add.sprite(32, 400, 'dude');
// Animating the player sprite
player.animations.add('left', [0, 1, 2, 3], 10, true);
player.animations.add('right', [5, 6, 7, 8], 10, true);
game.physics.arcade.enable(player);
player.body.bounce.y = 0.2;
player.body.gravity.y = 300;
player.body.collideWorldBounds = true;

// Create the enemy
var enemy1 = game.add.sprite(760, 20, 'baddie');
// Animate the enemy1
enemy1.animations.add('left', [0,1], 10, true);
enemy1.animations.add('right', [2,3], 10, true);
game.physics.arcade.enable(enemy1);
enemy1.body.bounce.y = 0.2;
enemy1.body.gravity.y = 500;
enemy1.body.collideWorldBounds = true;

// Create the enemy
var enemy2 = game.add.sprite(10, 20, 'baddie');
// Animate the enemy2
enemy2.animations.add('left', [0,1], 10, true);
enemy2.animations.add('right', [2,3], 10, true);
game.physics.arcade.enable(enemy1);
enemy2.body.bounce.y = 0.2;
enemy2.body.gravity.y = 500;
enemy2.body.collideWorldBounds = true;

// Create the enemy
var enemy3 = game.add.sprite(200, 20, 'baddie');
// Animate the enemy3
enemy3.animations.add('left', [0,1], 10, true);
enemy3.animations.add('right', [2,3], 10, true);
game.physics.arcade.enable(enemy1);
enemy3.body.bounce.y = 0.2;
enemy3.body.gravity.y = 500;
enemy3.body.collideWorldBounds = true;	
	
	// Create keyboard entries
	var cursors = game.imput.keyboard.createCursorKeys();
	// Create Diamonds
	var diamonds = game.add.physicsGroup();
	diamonds.enableBody = true;
	var diamond = diamonds.create(Math.floor(Math.random()*750), 0, "diamond");
	diamond.body.gravity.y = 200;
	diamond.body.bounce.y = 0.7 + Math.random() * 0.2;

	//V2 - add enter key as an input
	var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	//V2 - create health pack group
  	var healths = game.add.physicsGroup();
  	healths.enableBody = true;

  	//V2 - game over text
  	var goText = game.add.text(0,0,'',style);
  	goText.setShadow(3,3,'rgba(0,0,0,0.5)',2);
  	goText.setTextBounds(100,200,800,100);
  	goText.visible = false;

}



function update(){

	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemy1, platforms);
	game.physics.arcade.collide(enemy2, platforms);
	game.physics.arcade.collide(enemy3, platforms);
	game.physics.arcade.collide(diamonds, platforms);
	game.physics.arcade.collide(healths, platforms);


	player.body.velocity.x = 0;

	if (cursors.left.isDown) {

		player.body.velocity.x = -150;
		player.animations.play("left")
	}

	else if (cursors.right.isDown) {
		player.bod.velocity.x = 150;
		player.animations.player("right");

	}

	else {

		player.animations.stop();
		player.frame = 4;
	
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -300;
	}

	game.physics.arcade.overlap(player, stars, collectStar);
	game.physics.arcade.overlap(player, enemy1, loseLife);
	game.physics.arcade.overlap(player, enemy2, loseLife);
	game.physics.arcade.overlap(player, enemy3, loseLife);

	game.physics.arcade.overlap(player, diamonds, collectDiamond);
	game.physics.arcade.overlap(player, healths, collectHealths);
	moveEnemy();

	if (lives < 0) {

		endGame();
	}



}

function collectStar(player, star){
	score + 1;

	scoreText.setText(score);

	star.kill();

	star.reset(Math.floor(Math.random() * 750), 0);
}

function loseLife(player, enemy1){
	lives -= 1;

	lifeText.setText(lives);

	enemy1.kill();

	enemy1.reset(10,20);

}

function collectDiamond(player, diamond){
	score += 10;

	scoreText.setText(score);

	diamond.kill();

	diamond.reset(Math.random() * 750, 0);
}

function collectHealth(player, health){
	life += 1;

	lifeText.setText(life);

	health.kill();
}

function moveEnemy(){
	if (enemy1.x > 759) {

		enemy1.animations.play("left");

		enemy1.body.velocity.x = -120;

	}
	else if (enemy1.x < 405) {
		enemy1.animations.play("right")

		enemy1.body.velocity.x = 120;

	}
}

function restartGame(){
	stars.callAll("kill");
	diamonds.callAll("kill");
	healths.callAll("kill");

	for (var count = 0; count < 12; ++count){
		var star = stars.create(count * 70, 0, "star");
		star.body.gravity.y = 200;

		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	var diamond = diamonds.create(Math.floor(Math.random()*750), 0, 'diamond');
	
	diamond.body.gravity.y = 200;
	
	diamond.body.bounce.y = 0.7 + Math.random() * 0.2;

	score = 0;

	lives = 3;

	player.reset(32, 400);

	lifeText.setText(lives);

	scoreText.setText(score);

	goText.visible = false;

	scoreLabel.visible = true;

	scoreText.visible = true;

	lifeLabel.visible = true;

	lifeText.visible = true;
}

function endGame(){

	player.kill();
	scoreLabel.text="GAME OVER! You scored " + score;
	scoreText.visible = false;
	lifeLabel.visible = false;
	lifeText.visible = false;

	goText.visible = true;
	goText.text = "You have scored" + score + ".\nPress ENTER to start again";

	scoreLabel.visible = false;

	enterKey.onDown.addOnce(restartGame);




}
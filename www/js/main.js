'use strict';

var view = {};
view.width = 500;
view.height = 320;

var game = new Phaser.Game(view.width, view.height, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', 'assets/bc-ionicphaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.scale.refresh();
}

var map, background, clouds, ground, dude, money;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');

  background = map.createLayer('Background');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');
  ground.resizeWorld();

  map.setCollision(34, true, 'Ground');

  money = game.add.group();
  money.physicsBodyType = Phaser.Physics.ARCADE;
  money.enableBody = true;
  map.createFromObjects('Money', 45, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(0, 0, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.gravity.y = 500;
  dude.body.bounce.y = 0.3;
  dude.body.collideWorldBounds = true;
  game.camera.follow(dude);
}

function update(){
  game.physics.arcade.collide(dude, ground);
  game.physics.arcade.collide(money, ground);
  game.physics.arcade.overlap(dude, money, collectCoin);

  if(dude.body.touching.down){
    console.log('touching');
  }

  if(game.input.activePointer.isDown){
    if(game.input.activePointer.x < view.width / 2 && game.input.activePointer.y > view.height / 2){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else if(game.input.activePointer.x < view.width / 2 && game.input.activePointer.y < view.height / 2){
      dude.body.velocity.x = -150;
      dude.body.velocity.y = -150;
      dude.animations.play('left');
    }else if(game.input.activePointer.x > view.width / 2 && game.input.activePointer.y > view.height / 2){
       dude.body.velocity.x = 150;
       dude.animations.play('right');
    }else if(game.input.activePointer.x > view.width / 2 && game.input.activePointer.y < view.height / 2){
      dude.body.velocity.x = 150;
      dude.body.velocity.y = -150;
      dude.animations.play('right');
    }
  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }
}


function collectCoin(due, money){
  money.kill();
}

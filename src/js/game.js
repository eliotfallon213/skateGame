(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.back = null;
    this.back2 = null;
    this.addCrateLoop =null;

    this.crates = null;

    this.jumping = false;
    this.falling = false;
    this.up = false;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.back = this.add.sprite(0, 0, 'background');
      this.back2 = this.add.sprite(0, 0, 'background');

      this.back2.x = this.back.x + this.back.width;
      this.back2.y = this.back.y;

      this.player = this.add.sprite(0, 0, 'player');
      this.player.animations.add('run',[0,1,2,3],4,true);
      this.player.animations.play('run');

      this.input.onDown.add(this.duckAction, this);
      this.input.onUp.add(this.jumpAction, this);

      this.physics.enable(this.player,Phaser.Physics.ARCADE);

      this.player.x = 25;
      this.player.y = 231;

      this.bkgContainer = this.game.add.group();

      this.bkgContainer.add(this.back);
      this.bkgContainer.add(this.back2);

      this.bkgContainer.add(this.player);

      this.crates = this.game.add.group();

      this.crates.enableBody = true;

      this.crates.physicsBodyType = Phaser.Physics.ARCADE;

      this.crates.createMultiple(30,'crate');

      this.crates.setAll('body.immovable',true);

      this.crates.setAll('checkWorldBounds',true);

      this.crates.setAll('outOfBoundsKill',true);

      this.addCrateLoop = this.game.time.events.loop(2400,this.addCrate,this);

    },

    addCrate: function() {
      var crate = this.crates.getFirstDead();
      crate.reset(this.game.width,350);
      crate.body.velocity.x = -180;
    },

    update: function () {
      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      if(!this.falling) {
        this.player.x += 3;
        this.bkgContainer.x = 125 - this.player.x;
      }
  
      if ( this.back.x + this.back.width + this.bkgContainer.x < 0 )
      {
        this.back.x = this.back.x + (2 * this.back.width);
      }
      if ( this.back2.x + this.back.width + this.bkgContainer.x < 0 )
      {
        this.back2.x = this.back2.x + (2 * this.back.width);
      }
      

        if(this.player.y<231) {
          this.player.y +=3;
          this.up =true;
        }

        if(this.jumping && this.up && this.player.y>=231) {
          //landed
          this.jumping = false;
          this.up = false;
          this.player.loadTexture('player', 0);
          this.player.animations.add('run',[0,1,2,3],4,true);
          this.player.animations.play('run');
        }

      this.game.physics.arcade.collide(this.player,this.crates,null,this.fallAction,this);

    },

    fallAction: function() {

      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.falling = true;

      this.crates.setAll('body.velocity.x',0);
      this.game.time.events.remove(this.addCrateLoop);

      this.player.loadTexture('fall', 0);
      this.player.animations.add('fallAnim',[0,1,2,3],4,false);
      // To play the animation with the new texture ( 'key', frameRate, loop, killOnComplete)
      this.player.animations.play('fallAnim');

    },

    duckAction: function() {

      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.ducking = true;

      this.player.loadTexture('duck', 0);
      this.player.animations.add('duckAnim',[0,1,2,3],4,false);
      // To play the animation with the new texture ( 'key', frameRate, loop, killOnComplete)
      this.player.animations.play('duckAnim');

    },

    jumpAction: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.jumping = true;

      this.player.loadTexture('jump', 0);
      this.player.animations.add('jumpAnim',[0,1,2,3],4,true);
      // To play the animation with the new texture ( 'key', frameRate, loop, killOnComplete)
      this.player.animations.play('jumpAnim');

      var tween = this.game.add.tween(this.player);

      tween.to({y : 80}, 500, Phaser.Easing.Linear.None, true);

    },

    lost: function() {
      this.world.removeAll();
      this.stage.backgroundColor = 0xffcc00
      this.add.text(100,100,'You Lost, sorry',{});
    }

  };

  window['skate'] = window['skate'] || {};
  window['skate'].Game = Game;

}());

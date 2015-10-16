(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.load.spritesheet('player','assets/sprite-rolling.png',108,137);
      this.load.spritesheet('jump','assets/sprite-jump.png',139,138);
      this.load.spritesheet('duck','assets/sprite-duck.png',100,130);
      this.load.spritesheet('fall','assets/sprite-fall.png',255,159);
      this.load.spritesheet('crate','assets/crate.jpg');

      this.load.image('background','assets/back-street.png');

      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['skate'] = window['skate'] || {};
  window['skate'].Preloader = Preloader;

}());

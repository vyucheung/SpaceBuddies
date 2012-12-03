//add fire ability
Crafty.c("shoot", {
	init: function(){
		var autoattack_CD = true;
		var Q_weap_CD = true;
		var key_down = false;
		this.bind("KeyDown", function(key){
			if(key.keyCode === Crafty.keys.SPACE){//shoot
				key_down = true;
			}

			if (key.keyCode === Crafty.keys.Q){//Q-weapon
				this.weapons[0].activate(this);
			}
			
			if (key.keyCode === Crafty.keys.W){//W-weapon
				this.weapons[1].activate(this);
			}
			
			if (key.keyCode === Crafty.keys.E){//E-weapon
				this.weapons[2].activate(this);
			}
			
			if (key.keyCode === Crafty.keys.R){//R-weapon
				this.weapons[3].activate();
			}
		})
		
		.bind("KeyUp", function(key){
			if(key.keyCode === Crafty.keys.SPACE){
				key_down = false;
			}
		})

		.bind("EnterFrame", function (frame){
			if(autoattack_CD && key_down){
				Crafty.e("AutoAttack")
				.attr({x: this.x + this.w/2-5, y:this.y - this.h/2, firerate: this.firerate});
				autoattack_CD = false;
				setTimeout( function(){
					autoattack_CD = true;
				}, this.firerate);
			}
		}) 
	}
	
});

//ship statistics and weapons
Crafty.c("player", {
	hp:{
		current: 100,
		max: 100
	},
	shield:{
		current: 0,
		max: 0
	},
	moveSpeed: 5,
	weapons: [new RapidFire(),
			new Heal(),
			new Teleport(),
			new Terminate()],
	score: 0,
	firerate: 500,
	enteringlevel: true,
	init: function(){
		var keyDown = false;
		this.requires("2D, DOM, ship, shoot, target, Multiway, Collision")
			.multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
			.bind("Moved", function(from){

				//make sure it doesn't go out of bounds
				if (this.x + this.w > 720){
					this.attr({x:from.x});
				}else if (this.x  < 0){
					this.attr({x:from.x});
				}else if (this.y < 0){
					this.attr({y:from.y});
				}else if (this.y + this.h > 415){
					this.attr({y:from.y});
				}
			})
			.bind("EnterFrame",function(frame){
				Crafty.trigger("UpdateStats");
				if(this.enteringlevel){
					this.y--;
					if(this.y < 720/2)
						this.enteringlevel = false;
				}
			})
			.bind("Hurt", function(dmg){
				if (this.shield.current > 0){
					this.shield.current -= dmg;
					console.log("Shield is damaged: " + this.shield);
				}else if ((this.hp.current - dmg) <= 0){
					console.log("dead");
					this.hp.current = 0;
				}else{
					this.hp.current -= dmg;
					console.log("HP is damaged: " + this.hp.current);
				}
				Crafty.trigger("UpdateStats");
			})
	}
});

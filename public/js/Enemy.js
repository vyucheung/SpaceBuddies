//enemy movement styles:
function chase(){
		var player = Crafty("player");
		player = Crafty(player[0]);
		if (this.x > player.x){
			this.x -= 1;
		}else if(this.x < player.x){
			this.x += 1;
		}

		this.y +=0.5;
}

function zigZag(direction)
{
	if (this.direction){
		this.x += 1;
	}else{
		this.x += -1;
	}
	this.y += 1;
	if (this.x + this.w > 720){
		//console.log("change direction");
		this.direction = false;
	}else if (this.x  < 0){
		//console.log("change direction");
		this.direction = true;
	}
}

function straightDown()
{
	this.y += 1;
}

Crafty.c("Enemy",{
	id: "enemy",
	init:function(){
		this.requires("2D,DOM,Collision,target")
		.bind("Hurt", function(dmg){
				if (this.shield.current > 0){
					this.shield.current -= dmg;
					console.log("Shield is damaged: " + this.shield);
				}else if ((this.hp.current - dmg) <= 0){
					console.log("dead");
					this.hp.current = 0;
					this.trigger('Death');
				}else{
					this.hp.current -= dmg;
					console.log("HP is damaged: " + this.hp.current);
				}
		})
		.onHit('ship', function(ent){
				var player = ent[0].obj;
				Crafty(player[0]).trigger("Hurt", this.expl_dmg);
				this.trigger('Death');
		})
		.bind('Death', function(){
			Crafty.e("2D, DOM, explosion, SpriteAnimation")
				.attr({x: this.x - (320/5)/2, y:this.y - (320/5)/2})
				.animate("die", 0, 0, (320 - (320/5)))
				.animate('die', 0, 0);
				this.destroy();
		})
		.bind("EnterFrame", function(frame){
			if(this.x > Crafty.viewport.width+this.w ||
			this.x < -this.w || 
			this.y < -this.h || 
			this.y > Crafty.viewport.height-35-this.h){
				this.destroy();
			}
			if (frame.frame % (Crafty.math.randomInt(100, 150)) === 0){
					//console.log("I was told to shoot");
					this.shoot();
				}
			this.movement();
		})
	}
});

//basic enemy
Crafty.c("Scrub",{	
	expl_dmg: 10,
	shield:{
		current: 0,
		max: 0
	},
	shoot: function(){
		Crafty.e("Bullet, bullet_sprite")
			.attr({x: this.x + this.w/2-5, 
				y:this.y + this.h/2 + 15, xspeed:0, yspeed:-3, id: this.id, dmg:10});
	},	
	movement: straightDown,
	init:function(){
		this.requires("Enemy,enemy_ship")
			.attr({x:Math.floor((Math.random()*720)+1), y: -10,hp:{current:100,max:100}})
	}
});


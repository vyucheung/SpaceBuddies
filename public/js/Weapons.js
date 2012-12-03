//bullet
Crafty.c("Bullet",{
	dmg:0,
	alteration:0, 
	init: function(){
		var definition = false;
		this.addComponent("2d, DOM, Collision")
		.bind("EnterFrame", function(){//destroy if out of screen
			if(this.x > Crafty.viewport.width+this.w ||
				this.x < -this.w || 
				this.y < -this.h || 
				this.y > Crafty.viewport.height-40){
				this.destroy();
				}
			this.x += this.xspeed;
			this.y -= this.yspeed;
		})
		.onHit('target', function(ent){//destroy on collision
			var target = ent[0].obj;
			if(!(target.id === "enemy" && this.id === "enemy"))
			{
				target.trigger("Hurt", this.dmg);
				this.destroy();
			}
		});
	},
	
});
//Space-bar
Crafty.c("AutoAttack", {
	init:function(){
		this.addComponent("Bullet", "bullet_sprite")
		.attr({ xspeed: 0, yspeed: 5, dmg: 10})
	}

});	
//weapon2
Crafty.c("Rocket", {
	init:function(){
		this.addComponent("Bullet", "rocket_sprite")
		.attr({ xspeed: 1, yspeed: 1, dmg: 10, alteration:1})
	}

});

//weapon2
Crafty.c("Laser", {
	init:function(){
		this.addComponent("Bullet", "laser_sprite")
		.attr({ xspeed: 0, yspeed: 20, dmg: 10})
	}

});



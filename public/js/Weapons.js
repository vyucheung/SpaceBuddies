//Projectile component base here
Crafty.c("Bullet",{
	dmg:0,
	alteration:0, 
	multiplier: 1,
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
			if(!(target.id === this.shooter))		//make sure the shooter and allies don't get hurt
			{
				if (target.shield.superShield){	
					target.shield.superShieldBehavior(this);
				}else{
					//hurt the player only if super shield is offline
					target.trigger("Hurt", this.dmg * this.multiplier);
					this.destroy();
				}
			}
		});
	},
	
});
//Space-bar - Standard Attack
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

function RapidFire()
{
	this.name = "RapidFire";
	this.description = "Temporarily increases firerate for 2.5 seconds.";
	this.cooldown = 8;
	this.activate = function(owner)
	{
		owner.firerate = owner.firerate/2;
		setTimeout( function(){
			owner.firerate = owner.firerate*2;
		}, 2500);
	}
}

function Heal()
{
	this.name = "Heal";
	this.description = "Heals 10 HP.";
	this.cooldown = 20;
	this.activate = function(owner)
	{
		if(owner.hp.current < owner.hp.max)
			owner.hp.current += 10;
	}
}

function Teleport()
{
	this.name = "Teleport";
	this.description = "Teleport to random location horizontally.";
	this.cooldown = 1;
	this.activate = function(owner)
	{
		var randomNum = Math.floor((Math.random()*720)+1);
		if(randomNum > 720-owner.w)
			owner.x = 720-owner.w;
		else
			owner.x = randomNum;
	}
}

function Terminate()
{
	this.name = "Terminate";
	this.description = "Destroy all enemies on the screen.";
	this.cooldown = 200;
	this.activate = function()
	{
		Crafty("Enemy").each( function(){
			this.trigger('Death');
		});
	}
}

function WeaponPriority(){
	this.name 	= "WeaponPriority";
	this.description = "Improved damage for 5 seconds.";
	this.cooldown	= 8;
	this.activate = function (owner){
		console.log("Activating Weapon Priority");
		owner.damageMultiplier = 10;
		setTimeout(function(){
			console.log("Priority Weapon is now over");
			owner.damageMultiplier = 1;
		}, 5000);
	}
}

function ReactiveShields(){
	this.name 		= "ReactiveShields";
	this.description = "Shields take no damage for 5 seconds, only if shield has power.";
	this.cooldown	= 15;
	this.activate = function (owner){
		if (owner.shield.current > 0){
			console.log("Activating Reactive Shield");
			owner.shield.superShield=true;
			owner.shield.superShieldBehavior = function(bullet){
				console.log("Performing a supershield behavior");
				bullet.destroy();
			}
			setTimeout(function(){
				owner.shield.superShield = false;
			}, 5000);
		}
	}
}

function Maneuver(){
	this.name 		= "Maneuver";
	this.description = "Temporarily avoid incoming attacks.";
	this.cooldown	= 15;
	
	this.activate = function (owner){
			owner.shield.superShield = true;
			owner.shield.superShieldBehavior = function(){ console.log("AVOIDED");}
			setTimeout(function(){
				owner.shield.superShield = false;
			}, 7000);
	}
}

function ReflectiveShields(){
	this.name 		= "ReflectiveShields";
	this.description = "Reflects five incoming bullets.";
	this.cooldown	= 20;
	this.activate = function (owner){
		console.log("Starting Reflective Shields");
		var theShield 			= owner.shield;
		theShield.superShield 	= true;
		theShield.charge		= 5;
		theShield.superShieldBehavior = function(bullet){
			console.log("activated this baby!!!");
			if (this.charge > 0){
				//console.log("We have charges: " + this.charge + " " + this.super.id);
				bullet.xspeed 		= bullet.xspeed * (-1);
				bullet.yspeed 		= bullet.yspeed * (-1);
				bullet.shooter 		= "player";
				this.charge   	       -= 1;
			}else{
				if (this.charge <= 0){
					console.log("No more charges");
					this.superShield = false;
				}
				Crafty("player").trigger("Hurt", bullet.dmg * bullet.multiplier);
				bullet.destroy();
			}
		}
	}
}

function ThirdGenShields(){
		this.name 			= "ThirdGenShields";
		this.description = "Passive shield regen and heal on activate.";
		this.passiveClock	= 100;
		this.cooldown 		= 20;
		this.passive = function (owner, frameNum){
			if ((owner.shield.current < owner.shield.max) & (frameNum % this.passiveClock === 0)){
				console.log("Current Shield is: " + owner.shield.current + " adding 1 point to it");
				owner.shield.current += 1;
			}
		}
		this.activate = function (owner){
				owner.hp.current += 10;
				if (owner.hp.current > owner.hp.max){
						owner.hp.current = owner.hp.max;
				}
		}
}

function VanguardSystem(){
		this.name	= "VanguardSystem";
		this.description = "Regenerates health and shield and allows to activate invulnerability.";
		this.passiveClock = 100;
		this.cooldown	= 25;
		this.passive = function(owner, frameNum){
			var isShieldNotMax = (owner.shield.current < owner.shield.max);
			var isHealthNotMax = (owner.hp.current < owner.hp.max);

			if (frameNum % this.passiveClock === 0){
				if (isShieldNotMax){
					console.log("Current Shield is: " + owner.shield.current + " adding 1 point to it");
					owner.shield.current += 1;
				}
				
				if (isHealthNotMax){
					console.log("Current Shield is: " + owner.shield.current + " adding 1 point to it");
					owner.hp.current += 1;
				}
			}
		}
		this.activate = function (owner, frameNum){
			console.log("Activating Super Shield For Invulnurability");
			owner.shield.superShield=true;
			owner.shield.superShieldBehavior = function(bullet){
				bullet.destroy();
			}
			setTimeout(function(){
				console.log("De-Activating Super Shield");
				owner.shield.superShield = false;
			}, 5000);
		}
}
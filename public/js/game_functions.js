function makeEnemy(enemy){
	Crafty.e(enemy.name).attr({secret: enemy.secret});
}

var all_weapons = [];
function makeWeaponsArray()
{
	all_weapons[0] = new RapidFire();
	all_weapons[1] = new Heal();
	all_weapons[2] = new Teleport();
	all_weapons[3] = new Terminate();
	all_weapons[4] = new WeaponPriority();
	all_weapons[5] = new ReactiveShields();
	all_weapons[6] = new Maneuver();
	all_weapons[7] = new ReflectiveShields();
	all_weapons[8] = new ThirdGenShields();
	all_weapons[9] = new VanguardSystem();
}

function load_game(){
	Crafty.init(720, 450);
	
	//some resources
	Crafty.sprite(40, "./img/test_ship4.png", {ship:[0,0]});
	Crafty.sprite(24, "./img/enemy_ship2.png", {enemy_ship:[0,0]});
	Crafty.sprite(16, "./img/bullet.png", {bullet_sprite:[0,0]});
	Crafty.sprite(24, "./img/rocket.png", {rocket_sprite:[0,0]});
	Crafty.sprite(16, "./img/bullet_laser.png", {laser_sprite:[0,0]});
	Crafty.sprite(320/5, "./img/explosion.png", {explosion: [0,0]});
	
	makeWeaponsArray();
	var ship;
	
	socket.emit('RequestBotGame');
	
	socket.on('ConstructGame', function(enemies, weapons){
		ship = Crafty.e("player")
			.attr({x:720/2-20, y:420, q_cd: 0, w_cd: 0, e_cd: 0, r_cd: 0, 
				weapons: [all_weapons[parseInt(weapons[0].equipped_weapons.charAt(0))],
						  all_weapons[parseInt(weapons[0].equipped_weapons.charAt(1))],
						  all_weapons[parseInt(weapons[0].equipped_weapons.charAt(2))],
						  all_weapons[parseInt(weapons[0].equipped_weapons.charAt(3))]]});
		for(var i =0; i < enemies.length; i++)
		{
			var curEnemy = enemies[i];
			setTimeout( function(){
				makeEnemy(curEnemy);
			}, 1000*(i+1));
		}
	});
	/*
	socket.on('EndGame', function(score, won){
		//if(won)
			//some visualization
	}); */
		
	Crafty.bind("UpdateStats", function(){
		//Update progressbars
		$('#hp').progressbar({
			value:ship.hp.current
		});
		$('#Q_weap').progressbar({
			value:(ship.q_cd/ship.weapons[0].cooldown)*100
		});
		$('#W_weap').progressbar({
			value:(ship.w_cd/ship.weapons[1].cooldown)*100
		});
		$('#E_weap').progressbar({
			value:(ship.e_cd/ship.weapons[2].cooldown)*100
		});
		$('#R_weap').progressbar({
			value:(ship.r_cd/ship.weapons[3].cooldown)*100
		});
		
		
		$('#hp').find('.text').text('HP: '+ship.hp.current + '/'+ship.hp.max);
		$('#Q_weap').find('.text').text('Q: '+ship.q_cd);
		$('#W_weap').find('.text').text('W: '+ship.w_cd);
		$('#E_weap').find('.text').text('E: '+ship.e_cd);
		$('#R_weap').find('.text').text('R: '+ship.r_cd);
		
		
	});
	
}


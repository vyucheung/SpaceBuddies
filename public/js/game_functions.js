function load_game(){
	Crafty.init(720, 450);
	
	//some resources
	Crafty.sprite(40, "./img/test_ship4.png", {ship:[0,0]});
	Crafty.sprite(24, "./img/enemy_ship2.png", {enemy_ship:[0,0]});
	Crafty.sprite(16, "./img/bullet.png", {bullet_sprite:[0,0]});
	Crafty.sprite(24, "./img/rocket.png", {rocket_sprite:[0,0]});
	Crafty.sprite(16, "./img/bullet_laser.png", {laser_sprite:[0,0]});
	Crafty.sprite(320/5, "./img/explosion.png", {explosion: [0,0]});
	
	 var enemiesNum = 0;
	
	var enemInt = setInterval( function(){
		enemiesNum++;
		if(enemiesNum > 99)
			clearInterval(enemInt);
		Crafty.e("Scrub");
	}, 1000); 
	
	var ship = Crafty.e("player")
		.attr({x:720/2, y:420});
		
	Crafty.bind("UpdateStats", function(){
		//infos.hp.text('HP: '+player.hp.current+ '/'+player.hp.max);
		//Update progressbars
		$('#hp').progressbar({
			value:ship.hp.current
		});
		
		$('#hp').find('.text').text('HP: '+ship.hp.current + '/'+ship.hp.max);
		
		if(ship.hp.current === 0)
		{
			Crafty.e("2D, DOM, explosion, SpriteAnimation")
				.attr({x: ship.x - (320/5)/2, y:ship.y - (320/5)/2})
				.animate("die", 0, 0, (320 - (320/5)))
				.animate('die', 0, 0);
			ship.destroy();
		}
		
	});
	
}


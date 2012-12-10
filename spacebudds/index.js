var jwt = require('jwt-simple'),
	mysql = require('mysql'),
	program = require('commander'),
	async = require('async'),
	jwt_secret = "timRichard$";

var connInfo = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'timRichard$',
	database: 'spacebuddies'
};

var conn;

// This function is used to connect to the database.  We use the
// async library to eliminate heavily nested callbacks.
exports.connectToDatabase = function () {
      conn = mysql.createConnection(connInfo);
      conn.connect(function (err) {
        if (err) {
          throw err;
        }
        console.log('Connected to ' +
                    connInfo.database);
      });
};
	
/* MYSQL COMMANDS */
function register_user(user_id) {
	conn.query('insert ignore into users values (?,NULL,0123,NULL,0123,100)',
				[user_id]);
};

function get_weapons(socket) {
	conn.query('select equipped_weapons from users where id='+socket.user_id,
				function(err, result)
				{
					if(!err)
					{
						socket.emit('ConstructGame', socket.enemies, result);
						return result;
					}
				}
	);
};

function get_money(user_id) {
	conn.query('select money from users where id='+user_id,
		function(err, result)
		{
			if(!err)
				return result;
		}
	);
};

function set_money(user_id, amount){
	conn.query('update users set money = '+amount+' where id='+user_id);
};

/* SOCKET.IO STUFF */	
exports.init = function(socket) {
	
	socket.on('UserLogin', function(user_key) {
		if(user_key !== undefined)
		{
			socket.user_id = jwt.decode(user_key, jwt_secret);
			register_user(socket.user_id);
		}
	});
	
	socket.on('RequestBotGame', function(){
		if(socket.user_id !== undefined)
		{
			socket.enemies = [];
			for(var i = 0; i < 100; i++)
			{
				socket.enemies[i] = {name: "Scrub", secret: Math.random(), score: 10};
			}
			get_weapons(socket);
		}
	});
	
	socket.on('HitEnemy', function(secret_key){
		if(socket.user_id !== undefined)
		{
			var undefined_count = 0;
			for(var i = 0; i < 100; i++)
			{
				if(socket.enemies[i] !== undefined)
				{
					if(socket.enemies[i].secret === secret_key)
					{
						socket.score += socket.enemies[i].score;
						break;
					}
				}
				else
					undefined_count++;
			}
			if(undefined_count === 100)
				socket.emit('EndGame', socket.score, true);
		}
	});
	
	socket.on('PlayerDied', function(){
		if(socket.user_id !== undefined)
		{
			var enemy_score = 0;
			for(var i = 0; i< 100; i++)
			{
				if(socket.enemies[i] !== undefined)
					enemy_score += socket.enemies[i].score;
			}
			var cur_money = get_money(socket.user_id);
			if(cur_money - enemy_score < 0)
				set_money(socket.user_id, 0);
			else
				set_money(socket.user_id, cur_money-enemy_score);
			socket.emit('EndGame', enemy_score, false);
		}
	});
};
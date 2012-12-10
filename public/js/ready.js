var user_key;
var socket;

$(function () {

	socket = io.connect();
		
	$.ajax({
		url: "username",
		success: function(data){
			user_key = data;
			socket.emit('UserLogin', user_key);
		}
	});

  $("#nav-reflection li").append("<span></span>");	
 
    // Animate buttons, move reflection and fade
		
	$("#nav-reflection a").hover(function() {
		$(this).stop().animate({ marginTop: "-10px" }, 200);
		$(this).parent().find("span").stop().animate({ marginTop: "18px", opacity: 0.25 }, 200);
	},function(){
		$(this).stop().animate({ marginTop: "0px" }, 300);
		$(this).parent().find("span").stop().animate({ marginTop: "1px", opacity: 1 }, 300);
	});

	$('.adventure_button').bind('click', function() {
		$('#game_wrapper').fadeOut( '1000', function() {

			load_game();
			$('#game_wrapper').html('');
			$('#game_wrapper').append($('#cr-stage'));
			var gameStats = '<div class="panel transparent bottom"></div>';
			gameStats += '<div class="bars bottom left"><div id="hp"><span class="text"></span></div>';
			gameStats += '<div id="Q_weap"><span class="text"></span></div>';
			gameStats += '<div id="W_weap"><span class="text"></span></div>'
			gameStats += '<div id="E_weap"><span class="text"></span></div>';
			gameStats += '<div id="R_weap"><span class="text"></span></div>';
			gameStats += '</div>';
			$('#game_wrapper').append(gameStats);
			$('#hp').addClass('green');
			$('#Q_weap').addClass('red');
			$('#Q_weap').addClass('cooldown');
			$('#W_weap').addClass('yellow');
			$('#W_weap').addClass('cooldown');
			$('#E_weap').addClass('blue');
			$('#E_weap').addClass('cooldown');
			$('#R_weap').addClass('red'); 
			$('#R_weap').addClass('cooldown');
			$('#game_wrapper').fadeIn('1000');
		});
	});
  
	$('.invade_button').bind('click', function(){
		$('#friend_list').modal({
			overlayClose: true,
			position: ["140px", ""]
		});
		$('#friend_list .scrollable').slimScroll({
			height: '350px',
			color: '#000',
			railVisible: true
		});
	});
  
});
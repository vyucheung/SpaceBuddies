$(function () {
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
			$('#game_wrapper').append('<div class="panel transparent bottom">');
			$('#game_wrapper').append('<div class="bars bottom left"><div id="hp"><span class="text"></span></div>');
		/*	$('#game_wrapper').append('<div class="Q_weap"><span class="text"></span></div>');
			$('#game_wrapper').append('<div class="W_weap"><span class="text"></span></div>');
			$('#game_wrapper').append('<div class="E_weap"><span class="text"></span></div>');
			$('#game_wrapper').append('<div class="R_weap"><span class="text"></span></div>'); */
			$('#game_wrapper').append('</div></div>');
			$('#hp').addClass('green');
		/*	$('#Q_weap').addClass('red');
			$('#W_weap').addClass('yellow');
			$('#E_weap').addClass('blue');
			$('#R_weap').addClass('red'); */
			$('#game_wrapper').fadeIn('1000');
		});
	});
  
});
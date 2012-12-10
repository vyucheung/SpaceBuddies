function loadFacebookFriends()
{

	var fql =
		'SELECT uid, name, pic_square, is_app_user FROM user WHERE uid IN (' +
		'	SELECT uid2 FROM friend WHERE uid1 = me()' +
		')';
	FB.api({
			method: 'fql.query',
			query: fql,
		},
		function(response) {
			console.log(response);
			var html = '';
			for (var i = 0; i < response.length; i++) {
				var itemClass = response[i].is_app_user ? 'app_user' : '';
				var buttonClass = response[i].is_app_user ? 'play' : 'invite';
				var buttonText = response[i].is_app_user ? 'Play' : 'Invite';
				html +=
					'<div class="item ' + itemClass + '" fb-id="' + response[i].uid + '">' + 
					'<img class="pic" src="' + response[i].pic_square + '" />' +
					'<div class="name">' + response[i].name + '</div>' +
					'<div class="button ' + buttonClass + '">' + buttonText + '</div>' +
					'</div>';
			}
			$('#friend_list .scrollable').html(html);			
		}
	);
}
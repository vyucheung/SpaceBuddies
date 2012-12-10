var jwt = require('jwt-simple'),
	jwt_secret = "timRichard$";
	
/*
 * GET home page.
 */
exports.index = function(req, res){
	if(req.user)
		res.render('index', { title: 'Space Adventure with Buddies', appId: '502777829753079' });
	else
		res.send('<!DOCTYPE html><html><body><script type="text/javascript">top.location.href="http://spacebuddies.socialitegames.com/auth/facebook";</script></body></html>');
};

exports.username = function(req, res){
	if(req.user)
	{
		var encoded = jwt.encode(req.user.facebook.id, jwt_secret);
		console.log( encoded );
		res.send(encoded);
	}
	else
		res.send('<!DOCTYPE html><html><body><script type="text/javascript">top.location.href="http://spacebuddies.socialitegames.com/auth/facebook";</script></body></html>');
};	
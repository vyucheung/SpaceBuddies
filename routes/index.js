/*
 * GET home page.
 */
exports.index = function(req, res){
	if(req.user)
		res.render('index', { title: 'Space Adventure with Buddies' });
	else
		res.send('<!DOCTYPE html><html><body><script type="text/javascript">top.location.href="http://spacebuddies.socialitegames.com/auth/facebook";</script></body></html>');
};
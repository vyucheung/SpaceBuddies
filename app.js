var express = require('express'),
	everyauth = require('everyauth'),
    routes = require('./routes');
	
var FACEBOOK_APP_ID = "502777829753079";
var FACEBOOK_APP_SECRET = "eff59030dbcf702372e134a522f55777";

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth.facebook
  .appId(FACEBOOK_APP_ID)
  .appSecret(FACEBOOK_APP_SECRET)
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
  })
  .redirectPath('http://apps.facebook.com/spacebuddies');

var app = module.exports = express();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(everyauth.middleware(app));
  app.use(express.static(__dirname + '/public' , { maxAge: 86400} ));
});


// Routes
app.post('/', routes.index);
app.get('/', routes.index);

app.listen(80);


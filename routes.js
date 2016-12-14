
module.exports = function(app, passport) {
    app.get('/ap', function(req, res) {
        res.render('home');
    });
    
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
//    app.get('/ap/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
//    // the callback after google has authenticated the user
//    app.get('/ap/auth/google/callback',
//            passport.authenticate('google', {
//                    successRedirect : '/ap/account',
//                    failureRedirect : '/ap/failedlogin'
//            }));
//    app.get('/logout', function(req, res){
//        req.logout();
//        res.redirect('/');
//    });
    app.get('/ap/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/ap/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/ap/account',
	                                    failureRedirect: '/ap' }));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/ap');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/ap');
}
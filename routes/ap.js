var express = require('express');
var router = express.Router();

var path = require('path');
var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var Contact = require('../models/contact');

var passport = require('passport');
require('../config/passport.js')(passport);

router.get('/', function(req, res) {
	res.locals.title = 'APAUDIO';
	res.render('home');
});

router.get('/portfolio', function(req, res) {
	res.locals.title = 'APAUDIO - Portfolio';
	res.render('portfolio');
});

router.get('/services', function(req, res) {
	res.locals.title = 'APAUDIO - Services';
	res.render('services');
});

router.get('/contact', function(req, res) {
	res.locals.title = 'APAUDIO - Contact';
	res.render('contact');
});

router.get('/login', function(req, res) {
	res.locals.title = 'APAUDIO - Login';
	res.render('login');
});

router.get('/account', function(req, res) {
	res.locals.title = 'APAUDIO - Account';
	res.render('account');
});

router.get('/myfiles', function(req, res) {
	res.locals.title = 'APAUDIO - My Files';
	res.render('myFiles');
});

router.get('/test', function(req, res) {
	res.locals.title = 'APAUDIO - TEST';
	res.render('test');
});


// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {  
  successRedirect: '/contact',
  failureRedirect: '/ap',
}));

//router.post('/contact', function(req, res) {
router.post('/contact', upload.single('refUpload'), function(req, res) {
    
    console.log(req.file);
    
    var contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        musicLink: req.body.musicLink,
        sessionType: req.body.sessionType,
        genre: req.body.genre,
        refUpload: req.file.refUpload,
        comments: req.body.comments
    });
    
    contact.save(function(err, data) {
        if (err) {
            console.log(err);
            
            return res.redirect(303, '/ap/contact');
        }
        return res.redirect(303, '/ap/contact');
    });
});

module.exports = router;
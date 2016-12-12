module.exports = function(app, passport) { 



	// Homepage
	app.get('/', (req, res) => {
	  res.render('home.handlebars', {
            user : req.user // get the user out of session and pass to template
      });
	})

    // New Game
    app.get('/add_game', (req, res) => {
      var Game = require('./models/game');
      Game.find({"user_id": req.user.id}, function(err, result) {
        if (err) throw err;

        // object of all the users
        console.log(result);

        res.render('add_game.handlebars', {
          user : req.user, // get the user out of session and pass to template
          games: result
        })
      });
    })

    // Create Game
    app.post('/add_game', (req, res) => {
        var form = req.body
        var Game = require('./models/game');
        var newGame = new Game({
            location: form.location,
            date: form.date,
            time: form.time,
            minimum: form.minimum,
            maximum: form.maximum,
            user_id: form.user_id
        });

        newGame.save(req.body, (err, result) => {
            if (err) return console.log(err)

            res.redirect('/add_game')
        })
    })

    // Destroy Game
    app.delete('/cancel_game', (req, res) => {
      console.log(req.body.id)
      // db.collection('games').remove( {_id: ObjectID(req.body.id)},
      // (err, result) => {
      //   if (err) return res.send(500, err)
      //   res.send('The Game was deleted')
      // })
        var Game = require('./models/game');
        Game.remove({ _id: req.body.id },
        (err, result) => {
            if (err) return res.send(500, err)
            res.send('The Game was deleted')
        })
    })

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.handlebars', { message: req.flash('loginMessage') }); 
    });

	// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.handlebars', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.handlebars', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
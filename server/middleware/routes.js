const passport = require('passport');
const bCrypt = require('bcrypt');

module.exports = (app, db) => {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/profile');
    })

    app.get('/profile', ensureAuthenticated, (req, res) => {
        return res.json({
            loginSuccess: true,
            message: "Auth success"
        })
    })

    app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.get('/', (req, res) => {
        res.json({
            loginSuccess: false,
            message: "Auth unSuccess"
        })
    })

    app.post('/register', (req, res, next) => {
            db.collection('users').findOne({ username: req.body.username }, function(err, user) {
                if (err) {
                    next(err);
                } else if (user) {
                    res.redirect('/');
                } else {
                    const hash = bCrypt.hashSync(req.body.password, 10);
                    db.collection('users').insertOne({
                            username: req.body.username,
                            password: hash
                        },
                        (err, doc) => {
                            if (err) {
                                res.redirect('/');
                            } else {
                                next(null, user);
                            }
                        }
                    )
                }
            })
        },
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res, next) => {
            res.redirect('/profile');
        }
    );

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });



}
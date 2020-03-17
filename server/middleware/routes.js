const passport = require('passport');
const bCrypt = require('bcrypt');

module.exports = (app, db) => {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    app.post('/api/users/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/api/users/profile');
    })

    app.get('/api/users/profile', ensureAuthenticated, (req, res) => {
        res.json({
            loginSuccess: true,
            message: "Auth success"
        })
    })

    app.get('/api/users/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.get('/', (req, res) => {
        res.json({
            loginSuccess: false,
            message: "Auth unSuccess"
        })
    })

    app.post('/api/users/register', (req, res, next) => {
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
            res.redirect('/api/users/profile');
        }
    );

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });



}
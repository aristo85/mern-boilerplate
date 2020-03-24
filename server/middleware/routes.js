const passport = require('passport');
const bCrypt = require('bcrypt');

module.exports = (app, db) => {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            db.collection('users').findOne({ username: req.body.username }, function(err, user) {
                if (err) {
                    next(err);
                } else if (user) {
                    req.user = user;
                }
            })
            return next();
        }
        res.json({
            login: false,
            message: "logged out",
            isAuth: false
        })
    };

    app.get('/api/users/auth', ensureAuthenticated, (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role !== 0,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            username: req.user.username,
        });
    });

    app.post('/api/users/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.status(200).json({
            loginSuccess: true
        });
    })

    app.get('/api/users/logout', (req, res) => {
        req.logout();
        res.status(200).send({
            success: true
        });
    });

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
                            password: hash,
                            lastname: req.body.lastname,
                            name: req.body.name,
                            email: req.body.email,
                            role: 0
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
            res.status(200).json({
                success: true
            });
        }
    );

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });

}
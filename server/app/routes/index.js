const usersController = require('../controllers').users

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to Our Api',
    }));

    app.post('/api/users/signup', usersController.signup);
    app.get('/api/users/login', usersController.login);
    app.get('/api/user/details', usersController.getData);
}
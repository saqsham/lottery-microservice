const User = require('../models').User;
const BookingChart = require('../models').BookingChart

module.exports = {

    async login(req,res) {
        await User
        .adminAuth(req.body.email, req.body.password)
        .then(() => res.status(204).send('ok'))
        .catch(error => res.status(400).send(error))
    },

    


};
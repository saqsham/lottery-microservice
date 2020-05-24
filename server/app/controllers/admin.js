const User = require('../models').User;
const BookingChart = require('../models').BookingChart

module.exports = {

    async login(req,res) {
        await User
        .adminAuth(req.body.email, req.body.password)
        .then(() => res.status(204).send('ok'))
        .catch(error => res.status(400).send(error))
    },

    async durationGame1(req, res) {
        await BookingChart
        .update({
            time_for_game1: req.body.duration1,
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },

    async mulGame1(req, res) {
        await BookingChart
        .update({
            mul_for_game1: req.body.mul1
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },

    async durationGame2(req, res) {
        await BookingChart
        .update({
            time_for_game2: req.body.duration2,
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },

    async mulGame2(req, res) {
        await BookingChart
        .update({
            mul_for_game2: req.body.mul2
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },

    async durationGame3(req, res) {
        await BookingChart
        .update({
            time_for_game3: req.body.duration3,
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },

    async mulGame3(req, res) {
        await BookingChart
        .update({
            mul_for_game3: req.body.mul3
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    },
    


};
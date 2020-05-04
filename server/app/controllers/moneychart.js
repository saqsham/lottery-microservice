const MoneyChart = require('../models').MoneyChart;
const User = require('../models').User;

module.exports = {

    async listAll(req, res) {
        await MoneyChart
        .findAll({
            include: [{
                model: User,
                as: 'user',
            }],
            order: [
                [{ model: User, as: 'user'}, 'username', 'ASC']
            ],
            raw: true,
            nest: true,
        })
        .then((chart) => res.status(200).send(chart))
        .catch((error) => res.status(400).send(error));
    },

    async listTop20(req, res) {
        await MoneyChart
        .findAll({
            order : [
                ['amountHeld', 'DESC']
            ],
            limit: 20,
            include: [{
                model: User,
                as: 'user',
            }],
            raw: true,
            nest: true,
        })
        .then((chart) => res.status(200).send(chart))
        .catch((error) => res.status(400).send(error));
    },



};
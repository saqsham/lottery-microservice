const paytm = require('../paytm/services/index')
const MoneyChart = require('../models').MoneyChart

module.exports = {
    async payWithPaytm(req, res) {
        await paytm
        .initPayment(req.body.amount)
        .then(async () => {
            await MoneyChart
            .transactionBetOnDelete(req.params.userId, amount * 10)
            .then(() => res.status(204).send())
            // redicrect to a url
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    // async payWithPaytmResponse(req, res) {

    // }
};
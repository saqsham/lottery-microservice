const BookingChart = require('../models').BookingChart

module.exports = {

  // display only
  async list(req, res) {
    await BookingChart
      .findAll({
        raw: true,
      })
      .then(chart => res.status(200).send(chart))
      .catch(error => res.status(400).send(error))
  },

}
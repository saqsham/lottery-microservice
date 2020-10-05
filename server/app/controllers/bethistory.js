const BetHistory = require('../models').BetHistory

module.exports = {

  async listAll(req, res) {
    await BetHistory
      .findAll({
        where: {
          userId: req.params.userId
        },
        order: [
          ['birth', 'DESC']
        ],
        raw: true,
      })
      .then(history => res.status(200).send(history))
      .catch(error => res.status(400).send(error))
  },

  async listWin(req, res) {
    await BetHistory
      .findAll({
        where: {
          is_win: true,
          userId: req.params.userId,
        },
        order: [
          ['birth', 'DESC']
        ],
        raw: true,
      })
      .then(history => res.status(200).send(history))
      .catch(error => res.status(400).send(error))
  },




}
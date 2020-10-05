const Booking = require('../models').Booking2
const MoneyChart = require('../models').MoneyChart
const BetHistory = require('../models').BetHistory
const BookingChart = require('../models').BookingChart
module.exports = {

  // admin
  // start game / create new game / destroy 
  async newGame(req, res) {
    await BookingChart
      .findOne({
        where: {
          is_game2: false
        }
      })
      .then(async () => {
        await Booking
          .sync({
            force: true
          })
          //redirect
          .then(() => res.status(200).send('ok'))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))

  },

  //admin
  async closeGame(req, res) {
    await BookingChart
      .findOne({
        where: {
          is_game2: true
        }
      })
      .then(async booking => {
        if (!booking) {
          return res.status(404).send({
            message: `should'nt happen `
          })
        }
        await booking
          .update({
            is_game2: false
          })
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  // user
  // place bets
  async createBet(req, res) {
    await Booking
      .checkBet(req.params.userId, req.body.twoDigit)
      .then(async user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        let dateNow = new Date()
          .toISOString()
          .replace(/ /, ' ')
          .replace(/\..+/, '')

        await user
          .create({
            twoDigit: req.body.twoDigit,
            betValue: req.body.betValue,
            userId: req.params.userId,
            birth: dateNow,
          })
          .then(async () => {
            await MoneyChart
              .transactionBet(req.params.userId, req.body.betValue, req.body.twoDigit)
              .then(async () => {
                await BetHistory
                  .create({
                    betValue: req.body.betValue,
                    betted_on: req.body.twoDigit,
                    userId: req.params.userId,
                    birth: dateNow,
                  })
              })
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error))
          })
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))

  },

  async displayBets(req, res) {
    await Booking
      .findAll({
        where: {
          userId: req.params.userId
        },
      })
      .then(booking => res.status(200).send(booking))
      .catch(error => res.status(400).send(error))
  },

  //user 
  // delete bet
  async deleteOneBet(req, res) {
    await Booking
      .findOne({
        where: {
          twoDigit: req.body.twoDigit,
          userId: req.params.userId,
          // id: req.params.betId
        },
      })
      .then(async booking => {
        if (!booking) {
          return res.status(400).send({
            message: 'Booking not fonund'
          })
        }
        let birthBet = booking.birth
        await booking
          .destroy()
          .then(async () => {
            await MoneyChart
              .transactionBetOnDelete(req.params.userId, req.body.betValue)
              .then(async () => {
                await BetHistory
                  .update({
                    is_delete: true,
                  }, {
                    where: {
                      userId: req.params.userId,
                      betted_on: req.params.twoDigit,
                      birth: birthBet,
                    }
                  })
              })
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error))
          })
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))

  },

  // redundant method
  // user 
  // delete all bets
  async deleteAllBets(req, res) {
    let bookingData = await Booking
      .findAll({
        where: {
          userId: req.params.userId
        },
        raw: true,
      })
      .catch(error => res.status(400).send(error))

    for (data of bookingData) {
      let userBooking = await Booking
        .destroy({
          where: {
            twoDigit: data.twoDigit
          },
          raw: true,
        })
        .then(async () => {
          await MoneyChart
            .transactionBetOnDelete(data.userId, data.betValue)
            .catch(error => res.status(400).send(error))
        })
        .then(async () => {
          await BetHistory
            .update({
              is_delete: true,
            }, {
              where: {
                userId: data.userId,
                betted_on: data.twoDigit,
                birth: data.birth
              }
            })
            .catch(error => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error))
    }

    return res.status(204).send()

  },

  // user
  // update a betValue
  async updateBetValue(req, res) {
    await Booking
      .findOne({
        where: {
          twoDigit: req.body.twoDigit,
          userId: req.params.userId,
        },
        raw: true,
      })
      .then(async booking => {
        if (!booking) {
          return res.status(404).send({
            message: 'No bookings found',
          })
        }
        oldvalue = booking.betValue
        await booking
          .update({
            betValue: req.body.betValue,
          })
          .then(async () => {
            await MoneyChart
              .transactionBetUpdate(req.params.userId, req.body.betValue, oldvalue)
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error))

          })
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))

  },

  // mics
  async totalDisplay(req, res) {
    await Booking
      .totalMoney()
      .then(totalMoney => res.status(201).send([totalMoney]))
      .catch(error => res.status(400).send(error))
  },

  // misc 
  // front end
  // at the end
  async displayWinNum(req, res) {
    await Booking
      .calculate()
      .then(function (numWin) {
        winNumber = numWin[numWin.length - 1]
      })
      .then(async () => {
        await BookingChart
          .update({
            pre_winNum_game2: winNumber
          })
          .then(() => res.status(201).send([winNumber]))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  // admin 
  // caculate prize 
  async calculateScoresAndTransfer(req, res) {
    await BookingChart
      .findOne({
        where: {
          is_game2: true
        }
      })
      .then(booking => {
        if (!booking) {
          return res.status(404).send({
            message: 'game is closed',
          })
        }
        mul = booking.mul_for_game2
        winNumThis = booking.pre_winNum_game2
      })
      .catch(error => res.status(400).send(error))

    let bookingData = await Booking
      .findAll({
        where: {
          twoDigit: winNumThis,
        },
        raw: true,
      })
      .catch(error => res.status(400).send(error))

    for (data of bookingData) {
      await Booking
        .update({
          amountWon: data.betValue * mul,
        }, {
          where: {
            userId: data.userId
          }
        })
        .then(async () => {
          await MoneyChart
            .transactionBetOnDelete(data.userId, data.betValue * mul)
            .catch(error => res.status(400).send(error))
        })
        .then(async () => {
          await BetHistory
            .update({
              winNum: winNumThis,
              moneyWon: data.betValue * mul,
            }, {
              where: {
                birth: data.betBirth
              }
            })
            .catch(error => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error))
    }

    return res.status(204).send()

  },

}
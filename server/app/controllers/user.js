const User = require('../models').User
const MoneyChart = require('../models').MoneyChart
import isMobileNumber from '../helpers/is-mobile-number'
import isEmailAddress from '../helpers/is-email-address'
import APIError from '../helpers/api-error'

module.exports = {

    async signup(req, res) {
        let newUser = await User
            .checkData(req.body.username, req.body.email, req.body.password, req.body.phone)
            .then(async user => {
                await user
                    .create({
                        username: req.body.username,
                        fullName: req.body.fullName,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                    })
                    .then(async () => {
                        await MoneyChart
                            .create({
                                amountHeld: 500,
                                userId: user.id,
                            })
                            .then(() => res.status(204).send())
                            .catch(error => res.status(400).send(error));
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));

    },

    async getData(req, res) {
        let thisUser = await User
            .findByPk(req.params.userId)
            .then(() => res.status(200).send(thisUser))
            .catch(error => res.status(400).send(error));
    },

    async login(req, res, next) {
        try {
            let user

            if (isMobileNumber(req.body.email)) {
                user = await User.authUsingPhone(req.body.email, req.body.password)
            } else if (isEmailAddress(req.body.email)) {
                user = await User.authUsingMail(req.body.email, req.body.password)
            } else {
                user = await User.authUsingUsername(req.body.email, req.body.password)
            }

            if (!user) {
                const err = new APIError('User not found', httpStatus.NOT_FOUND)
                return next(err)
            }

            // passport

        } catch (error) {
            const err = new APIError(error.message, httpStatus.UNAUTHORIZED)
            return next(err)
        }
    },

    async changePassword(req, res, next) {
        await User
            .findByPk(req.params.userId)
            .then(async user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                await user
                    .update({
                        password: req.body.password || user.password,
                    })
                    .then(() => res.status(200).send('ok'))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    async retrieveMoney(req, res) {
        await MoneyChart
            .findOne({
                where: {
                    userId: req.params.userId
                },
                raw: true,
            })
            .then(moneychart => res.status(201).send(moneychart.amountHeld))
            .catch(error => res.status(400).send(error));
    },

};
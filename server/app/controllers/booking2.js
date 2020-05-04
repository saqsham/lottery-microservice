const Booking = require('../models').Booking2;

module.exports = {

    add(req, res) {
        return Booking
        .create({
            bookNumber: req.body.bookNumber,
            betValue: req.body.betValue,
            userId: req.params.userId,
        })
        .then(booking => res.status(201).send(booking))
        .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Booking
        .findAll({
            where: {
                id: req.params.bookingId,
                userId: req.params.userId,
            },
        })
        .then(booking => {
            if (!booking) {
                return res.status(404).send({
                    message: 'Booking not found',
                });
            }
            return booking
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    updateBookNumber(req, res) {
        return Booking
        .findAll({
            where: {
                id: req.params.bookingId,
                userId: req.params.userId,
            },
        })
        .then(booking => {
            if(!booking) {
                return res.status(404).send({
                    message: 'No bookings found',
                });
            }
            return booking
            .update({
                bookNumber: req.body.bookNumber,
            })
            .then(updatedBooking => res.status(200).send(updatedBooking))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    updateBetValue(req, res) {
        return Booking
        .findAll({
            where: {
                id: req.params.bookingId,
                userId: req.params.userId,
            },
        })
        .then(booking => {
            if(!booking) {
                return res.status(404).send({
                    message: 'No bookings found',
                });
            }
            return booking
            .update({
                betValue: req.body.betValue,
            })
            .then(updatedBetValue => res.status(200).send(this.updatedBetValue))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    timerUp(req, res) {
        return Booking
        .findAll()
        .then(booking => {
            if (!booking) {
                return res.status(404).send({
                    message: 'shouldnt happen',
                });
            }
            return booking
            .update({
                is_open: false,
            })
            .then(updatedBooking => res.status(200).send(updatedBooking))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(404).send(error));
    },

    totalDisplay(req, res) {
        return Booking
        .sum('betValue')
        .then(booking => res.status(201).send(booking))
        .catch(error => res.status(400).send(error));
    },

    displayWinNum(req, res) {
        return Booking.calculate();
    },

    calculateScores(req, res) {
        return Booking
        .findAll({
            where: {
                oneDigit: Booking.calculate(),
            }
        })
        .then(booking => {
            if(!booking) {
                return res.status(404).send({
                    message: 'No bookings found',
                });
            }
            return booking
            .update({
                amountWon: Booking.betValue * 10,
            })
            .then(updatedAmout => res.status(200).send(this.updatedAmout))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    clearBooking(req, res) {
        return Booking
        .drop()
        .then(booking => res.status(201).send(booking))
        .catch(error => res.status(400).send(error));
    }

};
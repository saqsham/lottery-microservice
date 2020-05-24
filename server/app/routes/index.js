const adminCtrl = require('../controllers').admin
const usersCtrl = require('../controllers').users
const bethistoryCtrl = require('../controllers').bethistory
const bookings1Ctrl = require('../controllers').bookings1
const bookings2Ctrl = require('../controllers').bookings2
const bookings3Ctrl = require('../controllers').bookings3
const bookingchartCtrl = require('../controllers').bookingcharts
const moneychartCtrl = require('../controllers').moneycharts
const paymentCtrl = require('../controllers').payments

module.exports = (app) => {

    // USER

    // user
    // post 
    app.post('/api/u/signup', usersCtrl.signup)
    app.post('/api/u/chpwd/:userId', usersCtrl.changePassword)
    app.post('/api/u/login', usersCtrl.login)
    // get
    app.get('/api/u/details/:userId', usersCtrl.getData)
    app.get('/api/u/getMoney/:userId', usersCtrl.retrieveMoney)

    // bet history
    app.get('/api/bh/listAll/:userId', bethistoryCtrl.listAll)
    app.get('/api/bh/listWin/:userId', bethistoryCtrl.listWin)

    // game 1 post
    app.post('/api/g1/createBet/:userId', bookings1Ctrl.createBet)
    app.post('/api/g1/deleteOne/:userId', bookings1Ctrl.deleteOneBet)
    app.post('/api/g1/deleteAll/:userId', bookings1Ctrl.deleteAllBets)
    app.post('/api/g1/updateValue/:userId', bookings1Ctrl.updateBetValue)
    // get 
    app.get('/api/g1/currBets/:userId', bookings1Ctrl.displayBets)

    // game 2 post 
    app.post('/api/g2/createBet/:userId', bookings2Ctrl.createBet)
    app.post('/api/g2/deleteOne/:userId', bookings2Ctrl.deleteOneBet)
    app.post('/api/g2/deleteAll/:userId', bookings2Ctrl.deleteAllBets)
    app.post('/api/g2/updateValue/:userId', bookings2Ctrl.updateBetValue)
    // get 
    app.get('/api/g2/currBets/:userId', bookings2Ctrl.displayBets)


    // game 3 post 
    app.post('/api/g3/createBet/:userId', bookings3Ctrl.createBet)
    app.post('/api/g3/deleteOne/:userId', bookings3Ctrl.deleteOneBet)
    app.post('/api/g3/deleteAll/:userId', bookings3Ctrl.deleteAllBets)
    app.post('/api/g3/updateValue/:userId', bookings3Ctrl.updateBetValue)
    // get 
    app.get('/api/g3/currBets/:userId', bookings3Ctrl.displayBets)

    // payment
    // post
    app.post('/api/pay/:userId', paymentCtrl.payWithPaytm)


    // MISC

    // both
    // game 1 get
    app.get('/api/g1/total', bookings1Ctrl.totalDisplay)
    app.get('/api/g1/winNum', bookings1Ctrl.displayWinNum)

    // game 2 get
    app.get('/api/g2/total', bookings2Ctrl.totalDisplay)
    app.get('/api/g2/winNum', bookings2Ctrl.displayWinNum)

    // game 3 get
    app.get('/api/g3/total', bookings3Ctrl.totalDisplay)
    app.get('/api/g3/winNum', bookings3Ctrl.displayWinNum)

    // bookingchart get
    app.get('/api/bc/list', bookingchartCtrl.list)

    // moneychart get
    app.get('/api/mc/listAll', moneychartCtrl.listAll)
    app.get('/api/mc/listTop', moneychartCtrl.listTop20)


    // ADMIN

    // admin
    // post 
    app.post('/api/a/login', adminCtrl.login)
    app.post('/api/a/dur1', adminCtrl.durationGame1)
    app.post('/api/a/mul1', adminCtrl.mulGame1)
    app.post('/api/a/dur2', adminCtrl.durationGame2)
    app.post('/api/a/mul2', adminCtrl.mulGame2)
    app.post('/api/a/dur3', adminCtrl.durationGame3)
    app.post('/api/a/mul3', adminCtrl.mulGame3)

    // game 1
    // get 
    app.get('/api/g1/new', bookings1Ctrl.newGame)
    app.get('/api/g1/close', bookings1Ctrl.closeGame)
    // post
    app.post('/api/g1/final', bookings1Ctrl.calculateScoresAndTransfer)

    // game 2
    // get 
    app.get('/api/g2/new', bookings2Ctrl.newGame)
    app.get('/api/g2/close', bookings2Ctrl.closeGame)
    // post
    app.post('/api/g2/final', bookings2Ctrl.calculateScoresAndTransfer)

    // game 3
    // get 
    app.get('/api/g3/new', bookings3Ctrl.newGame)
    app.get('/api/g3/close', bookings3Ctrl.closeGame)
    // post
    app.post('/api/g3/final', bookings3Ctrl.calculateScoresAndTransfer)
};
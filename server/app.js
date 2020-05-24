const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)
const Knex = require("knex")

const app = express()

const knex = Knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "saqsham",
        password: "1234",
        database: "mydb"
    }
})

const store = new KnexSessionStore({
    knex: knex,
    tablename: "session" 
})

app.use(
    session({
        secret: "keyboard cat",
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days, otherwise 10 sec for dev
        },
        store: store
    })
)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// Routes
require('./app/routes')(app)
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome'
}))

module.exports = app
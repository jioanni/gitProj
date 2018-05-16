const express = require('express')
const app = express()
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = 3333

app.use(volleyball)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/api', require("./api"))

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  }) 

// app.use(express.static(path.join(__dirname, '..', 'public')))

app.listen(PORT, console.log('oh hai mark'))


const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

router.post('/', (req, res, next) => {
    const body = req.body
    res.send(body)
})

module.exports = router


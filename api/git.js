const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

module.exports = router
const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

router.post('/', (req, res, next) => {
    const added = req.body.commits.added
    const modified = req.body.commits.added
    const updates = added.concat(modified)
    res.send(updates)
})

module.exports = router


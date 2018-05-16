const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

router.post('/', (req, res, next) => {
    let added;
    let modified;
    req.body.commits[0].added.length > 0 ?  added = req.body.commits.added : []
    req.body.commits[0].modified.length > 0 ? modified = req.body.commits.added : []
    const updates = added.concat(modified)
    res.send(updates)
})

module.exports = router


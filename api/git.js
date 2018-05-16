const router = require('express').Router();
const functions = require('../functions')
const arrayCleaner = functions.arrayCleaner
const commitConsolidator = functions.commitConsolidator
const requester = functions.requester


router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

router.post('/', (req, res, next) => {
    let body = commitConsolidator(req.body.commits);
    let result = arrayCleaner(body)
    let results = requester(result)
    res.send(results)                       //when this route gets hit with the post from the git webhook, it generates our data.
})

module.exports = router


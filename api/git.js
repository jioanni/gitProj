const router = require('express').Router();
const functions = require('../functions')
const arrayCleaner = functions.arrayCleaner
const commitConsolidator = functions.commitConsolidator
const requester = functions.requester
const fileWriter = functions.fileWriter


router.get('/', (req, res, next) => {
    res.status(418)
    res.send("Boom goes the dynamite.")
})

router.post('/', async (req, res, next) => {
    let body = commitConsolidator(req.body.commits);
    let result = arrayCleaner(body)
    let results = await requester(result)
    console.log(results, " RESULTS STUFFS")
    fileWriter(results)
    res.send(results)                       //when this route gets hit with the post from the git webhook, it generates our data.
    
})

module.exports = router


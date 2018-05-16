const router = require('express').Router();

router.use('/git', require('./git'))

router.use((req, res, next) => {
    const error = new Error('API Route Not Found')
    error.status = 404;
    next(error)
})

module.exports = router
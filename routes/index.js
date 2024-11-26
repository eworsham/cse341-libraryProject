const router = require('express').Router()

router.use('/books', require('./booksRoute'))
router.use('/users', require('./usersRoute'))

module.exports = router
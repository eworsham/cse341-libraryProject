const router = require('express').Router()

router.use('/books', require('./booksRoute'))
router.use('/users', require('./usersRoute'))
router.use('/libraryProcesses', require('./libraryProcessesRoute'))

module.exports = router
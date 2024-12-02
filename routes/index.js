const router = require('express').Router();
const passport = require('passport')

router.use('/books', require('./booksRoute'));
router.use('/users', require('./usersRoute'));
router.use('/libraryProcesses', require('./libraryProcessesRoute'));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        return next(err)
    })
    res.redirect('/')
})

module.exports = router;

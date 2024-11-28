const router = require('express').Router();

const libraryProcessesController = require('../controllers/libraryProcessesController')

router.put('/checkoutBook', libraryProcessesController.checkoutBook)
// router.put('/returnBook', libraryProcessesController.returnBook)

module.exports = router
const router = require('express').Router();

const libraryProcessesController = require('../controllers/libraryProcessesController');
const auth = require('../middleware/authenticate');

router.put('/checkoutBook', auth.isAuthenticated, libraryProcessesController.checkoutBook);
router.put('/returnBook', auth.isAuthenticated, libraryProcessesController.returnBook);

module.exports = router;

const router = require('express').Router();
const usersController = require('../controllers/usersController');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate')

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', auth.isAuthenticated, validation.createUser, usersController.createUser);
router.put('/:id', auth.isAuthenticated, validation.updateUser, usersController.updateUser);
router.delete('/:id', auth.isAuthenticated, usersController.deleteUser);

module.exports = router;

const router = require('express').Router();
const usersController = require('../controllers/usersController');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', validation.createUser, usersController.createUser);
router.put('/:id', validation.updateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;

const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.getAll)
router.get('/:id', usersController.getById)
// router.post('/', usersController.createUser)
// router.put('/:id', usersController.updateUser)
// router.delete('/:id', usersController.deleteUser)

module.exports = router
const router = require('express').Router()
const booksController = require('../controllers/booksController')

router.get('/', booksController.getAll)
router.get('/:id', booksController.getById)
router.post('/', booksController.createBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)

module.exports = router
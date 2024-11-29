const router = require('express').Router();
const booksController = require('../controllers/booksController');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.post('/', validation.createBook, booksController.createBook);
router.put('/:id', validation.updateBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;

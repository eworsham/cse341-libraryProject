const router = require('express').Router();
const booksController = require('../controllers/booksController');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate')

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.post('/', auth.isAuthenticated, validation.createBook, booksController.createBook);
router.put('/:id', auth.isAuthenticated, validation.updateBook, booksController.updateBook);
router.delete('/:id', auth.isAuthenticated, booksController.deleteBook);

module.exports = router;

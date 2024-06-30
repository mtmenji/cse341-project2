const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validation.bookCheck, booksController.createBook);
router.put("/:id", validation.bookCheck, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
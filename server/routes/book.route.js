const Router = require('express');
const router = new Router();
const controller = require('../controller/bookController');

router.get('/all', controller.getAllBooks)
router.post('/create', controller.createBook)
router.delete('/delete/:id', controller.deleteBook)
router.put('/update/:id', controller.updateBook)

module.exports = router;
const Router = require('express');
const router = new Router();
const controller = require('../controller/readerController');

router.get('/all', controller.getAllReaders)
router.post('/create', controller.createReader)
router.delete('/delete/:id', controller.deleteReader)
router.put('/update/:id', controller.updateReader)

module.exports = router;
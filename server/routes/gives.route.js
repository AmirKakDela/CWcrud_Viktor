const Router = require('express');
const router = new Router();
const controller = require('../controller/giveController');

router.get('/all', controller.getAllGives)
router.post('/create', controller.createGive)
// router.delete('/delete/:id', controller.deleteReader)
// router.put('/update/:id', controller.updateReader)

module.exports = router;
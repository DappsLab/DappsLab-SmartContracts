var express = require('express');
var router = express.Router();
const controller = require('../controllers/ipfs.controller')
/* GET users listing. */
router.get('/', controller.read)
router.post('/',controller.create)
router.put('/',controller.update)



module.exports = router;

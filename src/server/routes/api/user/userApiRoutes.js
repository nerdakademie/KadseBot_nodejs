const userApiController = require('../../../controller/api/user/userApiController');
const router = require('express').Router();

router.post('/', userApiController.register);

module.exports = router;

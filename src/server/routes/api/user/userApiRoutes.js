const userApiController = require('../../../controller/api/user/userApiController');
const router = require('express').Router();

router.post('/register', userApiController.register);

module.exports = router;

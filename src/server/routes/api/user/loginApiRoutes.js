const loginApiController = require('../../../controller/api/user/loginApiController');
const router = require('express').Router();

router.post('/', loginApiController.login);

module.exports = router;

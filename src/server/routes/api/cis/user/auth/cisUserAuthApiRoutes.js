const cisUserAuthApiController = require('../../../../../controller/api/cis/user/auth/cisUserAuthApiController');
const router = require('express').Router();

router.get('/getApiKey', cisUserAuthApiController.getApiKey);

module.exports = router;

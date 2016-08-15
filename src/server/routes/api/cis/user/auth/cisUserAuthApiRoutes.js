const cisUserAuthApiController = require('../../../../../controller/api/cis/user/auth/cisUserAuthApiController');
const router = require('express').Router();

router.post('/getUserKey', cisUserAuthApiController.getUserKey);

module.exports = router;

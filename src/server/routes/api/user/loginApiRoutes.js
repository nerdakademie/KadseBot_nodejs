const loginApiController = require('../../../controller/api/user/loginApiController');
const router = require('express').Router();

router.post('/', loginApiController.login);
router.get('/logout', loginApiController.logout);

module.exports = router;

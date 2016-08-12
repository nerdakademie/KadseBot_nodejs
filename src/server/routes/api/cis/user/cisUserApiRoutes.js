const cisUserApiController = require('../../../../controller/api/cis/user/cisUserApiController');
const cisUserAuthApiRoutes = require('./auth/cisUserAuthApiRoutes');
const router = require('express').Router();

router.post('/isNAKUser', cisUserApiController.isNAKUser);
router.post('getAuthCookie', cisUserApiController.getNAKAuthCookie);
router.get('/getUserDetails', cisUserApiController.getUserDetails);
router.post('/getApiKey', cisUserApiController.getApiKey);
router.use('/auth', cisUserAuthApiRoutes);

module.exports = router;

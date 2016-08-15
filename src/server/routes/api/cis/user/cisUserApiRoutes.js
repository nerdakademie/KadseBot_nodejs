const cisUserApiController = require('../../../../controller/api/cis/user/cisUserApiController');
const cisUserAuthApiRoutes = require('./auth/cisUserAuthApiRoutes');
const router = require('express').Router();

router.post('/getAuthCookie', cisUserApiController.getNAKAuthCookie);
router.get('/getUserDetails', cisUserApiController.getUserDetails);
router.get('/getGrades', cisUserApiController.getGrades);
router.get('/getSeminars', cisUserApiController.getSeminars);
router.use('/auth', cisUserAuthApiRoutes);

module.exports = router;

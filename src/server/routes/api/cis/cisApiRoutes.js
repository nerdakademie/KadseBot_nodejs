const cisApiController = require('../../../controller/api/cis/cisApiController');
const cisUserApiRoutes = require('./user/cisUserApiRoutes');
const router = require('express').Router();

router.get('/speiseplan', cisApiController.speiseplan);
router.use('/user', cisUserApiRoutes);

module.exports = router;

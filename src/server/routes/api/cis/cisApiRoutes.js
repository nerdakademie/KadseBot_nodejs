const cisApiController = require('../../../controller/api/cis/cisApiController');
const router = require('express').Router();

router.get('/speiseplan', cisApiController.speiseplan );

module.exports = router;

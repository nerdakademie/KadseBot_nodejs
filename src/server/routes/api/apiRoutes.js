const telegramApiRoutes = require('./telegram/telegramApiRoutes.js');
const slackApiRoutes = require('./slack/slackApiRoutes');

const router = require('express').Router();

router.use('/telegram', telegramApiRoutes);
router.use('/slack', slackApiRoutes);

module.exports = router;

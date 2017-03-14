const slackApiController = require('../../../controller/api/slack/slackApiController');
const router = require('express').Router();

//router.post('/send', telegramApiController.sendMessage);
router.post('/webhook', slackApiController.webHook);

module.exports = router;

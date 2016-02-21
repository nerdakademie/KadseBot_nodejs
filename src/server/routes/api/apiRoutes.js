const userApiRoutes = require('./user/userApiRoutes');
const loginApiRoutes = require('./user/loginApiRoutes');
const telegramApiRoutes = require('./telegram/telegramApiRoutes.js');
const router = require('express').Router();

router.use('/users', userApiRoutes);
router.use('/login', loginApiRoutes);
router.use('/telegram', telegramApiRoutes);

module.exports = router;

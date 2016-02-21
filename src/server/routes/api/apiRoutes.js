const productApiRoutes = require('./product/productApiRoutes');
const userApiRoutes = require('./user/userApiRoutes');
const loginApiRoutes = require('./user/loginApiRoutes');
const telegramApiRoutes = require('./telegram/telegramApiRoutes.js');
const router = require('express').Router();

router.use('/product', productApiRoutes);
router.use('/users', userApiRoutes);
router.use('/login', loginApiRoutes);
router.use('/telegram', telegramApiRoutes);

module.exports = router;

const router = require('express').Router();
const userController = require('../controller/user');

router.post('/signup', userController.signUp);

router.post('/login', userController.login);

module.exports = router;
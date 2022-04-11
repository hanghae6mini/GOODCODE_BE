const router = require('express').Router();
const userController = require('../controller/user');

router.post('/signup', userController.signUp);

router.post('/login', userController.login);

router.put('/', userController.modifyProfile);

router.get('/', userController.getUser);

module.exports = router;
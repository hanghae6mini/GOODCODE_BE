const router = require('express').Router();
const userController = require('../controller/user');

router.post('/', userController.signUp);

module.exports = router;
const router = require('express').Router();
const feedController = require('../controller/feed');
const selectFeedMiddleware = require('../middlewares/selectFeed-middleware');

router.get('/', selectFeedMiddleware, feedController.selectFeed);

module.exports = router;
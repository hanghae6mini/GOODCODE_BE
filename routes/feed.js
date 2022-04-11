const router = require('express').Router();
const feedController = require('../controller/feed');
const selectFeedMiddleware = require('../middlewares/selectFeed-middleware');
const insertFeedMiddleware = require('../middlewares/insertFeed-middleware');
const updateFeedMiddleware = require('../middlewares/updateFeed-middleware');
const deleteFeedMiddleware = require('../middlewares/deleteFeed-middleware');

router.route('/')
    .get(selectFeedMiddleware, feedController.selectFeed)
    .post(insertFeedMiddleware, feedController.insertFeed)
    .put(updateFeedMiddleware, feedController.updateFeed)
    .delete(deleteFeedMiddleware, feedController.deleteFeed)

module.exports = router;
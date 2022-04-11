const router = require("express").Router();
const authMiddle = require("../middlewares/auth-middleware");
const feedController = require("../controller/feed");
const selectFeedMiddleware = require("../middlewares/selectFeed-middleware");
const insertFeedMiddleware = require("../middlewares/insertFeed-middleware");
const updateFeedMiddleware = require("../middlewares/updateFeed-middleware");
const deleteFeedMiddleware = require("../middlewares/deleteFeed-middleware");

router
  .route("/")
  .get(authMiddle, selectFeedMiddleware, feedController.selectFeed)
  .post(authMiddle, insertFeedMiddleware, feedController.insertFeed)
  .put(authMiddle, updateFeedMiddleware, feedController.updateFeed)
  .delete(authMiddle, deleteFeedMiddleware, feedController.deleteFeed);

module.exports = router;

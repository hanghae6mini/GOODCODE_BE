const router = require("express").Router();
const authMiddle = require("../middlewares/auth-middleware");
const feedController = require("../controller/feed");

const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
  limiuts: { fileSize: 10 * 1024 * 1024 }
});

const selectFeedMiddleware = require("../middlewares/selectFeed-middleware");
const insertFeedMiddleware = require("../middlewares/insertFeed-middleware");
const updateFeedMiddleware = require("../middlewares/updateFeed-middleware");
const deleteFeedMiddleware = require("../middlewares/deleteFeed-middleware");

router.route("/")
  .get(authMiddle, selectFeedMiddleware, feedController.selectFeed)
  .post(upload.single('image'), authMiddle, insertFeedMiddleware, feedController.insertFeed)
  .put(authMiddle, updateFeedMiddleware, feedController.updateFeed)
  .delete(authMiddle, deleteFeedMiddleware, feedController.deleteFeed);

module.exports = router;

const router = require("express").Router();
const feedCommentController = require("../controller/feedcomment");
const authMiddle = require("../middlewares/auth-middleware");

router.get("/", authMiddle, feedCommentController.showComments);
router.post("/", authMiddle, feedCommentController.writeComment);
router.patch("/", authMiddle, feedCommentController.updateComment);
router.delete("/", authMiddle, feedCommentController.deleteComment);

module.exports = router;

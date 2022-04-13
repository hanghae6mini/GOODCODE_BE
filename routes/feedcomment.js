const router = require("express").Router();
const feedCommentController = require("../controller/feedcomment");
const authMiddle = require("../middlewares/auth-middleware");

router.get("/:feedId", authMiddle, feedCommentController.showComments);
router.post("/:feedId", authMiddle, feedCommentController.writeComment);
router.patch("/:commentId", authMiddle, feedCommentController.updateComment);
router.delete("/:commentId", authMiddle, feedCommentController.deleteComment);

module.exports = router;

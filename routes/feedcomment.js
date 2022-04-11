const router = require("express").Router();
const feedCommentController = require("../controller/feedcomment");
const authMiddle = require("../middlewares/auth-middleware");

router.get("/", feedCommentController.showComments);
router.post("/", feedCommentController.writeComment);
router.patch("/", feedCommentController.updateComment);
router.delete("/", feedCommentController.deleteComment);

module.exports = router;

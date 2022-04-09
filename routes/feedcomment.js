const router = require("express").Router();
const feedCommentController = require("../controller/feedcomment");

router.get("/", feedCommentController.showComments);
router.post("/", feedCommentController.writeComment);
router.patch("/", feedCommentController.updateComment);
router.delete("/", feedCommentController.deleteComment);

module.exports = router;

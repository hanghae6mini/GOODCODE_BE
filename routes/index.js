const router = require("express").Router();

const userRouter = require("./user");
const feedRouter = require("./feed");
const feedCommentRouter = require("./feedcomment");

router.use("/user", userRouter);
router.use("/feed", feedRouter);
router.use("/feedcomment", feedCommentRouter);

module.exports = router;

const FeedComment = require("../schemas/feedcomment");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

async function showComments(req, res) {
  // #swagger.description = "여기는 피드댓글을 보여주는 곳 입니다."
  // #swagger.tags = ["FeedComment"]
  // #swagger.summary = "피드댓글 조회"
  const { feedId } = req.query;
  const comments = await FeedComment.find({ feedId }).sort({ commentId: -1 });
  try {
    res.status(200).json({
      result: {
        feed: comments.map((commentInfo) => {
          return {
            userId: commentInfo.userId,
            feedId: commentInfo.feedId,
            commentId: commentInfo.commentId,
            nickname: commentInfo.nickname,
            comment: commentInfo.comment,
            regDate: commentInfo.regDate,
            modDate: commentInfo.modDate,
          };
        }),
      },
    });
  } catch (err) {
    res.status(400).json({ result: "FAIL" });
  }
}

async function writeComment(req, res) {
  // #swagger.description = "여기는 피드댓글을 작성하는 곳 입니다."
  // #swagger.tags = ["FeedComment"]
  // #swagger.summary = "피드댓글 생성"
  try {
    const { user } = res.locals;
    const { feedId } = req.query;
    const { comment } = req.body;
    const regDate = moment().format("YYYY-MM-DD HH:mm:ss");
    if (!comment) return res.status(400).json({ result: "FAIL", message: "댓글을 입력해주세요." });
    FeedComment.create({
      userId: user.userId,
      nickname: user.nickname,
      feedId,
      comment,
      regDate,
    });
    res.status(200).json({ result: "SUCCESS", message: "피드 댓글 등록이 성공했습니다." });
  } catch (err) {
    res.status(400).json({ result: "FAIL", message: "피드 댓글 등록이 실패했습니다." });
  }
}

async function updateComment(req, res) {
  // #swagger.description = "여기는 피드댓글을 수정하는 곳 입니다."
  // #swagger.tags = ["FeedComment"]
  // #swagger.summary = "피드댓글 수정"
  try {
    const { user } = res.locals;
    const { comment } = req.body;
    const { commentId } = req.query;
    const modDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const checkcomment = await FeedComment.findOne({ commentId });
    if (user.nickname !== checkcomment.nickname) return res.status(400).json({ result: "FAIL", message: "수정 권한이 없습니다." });
    if (!checkcomment) return res.status(400).json({ result: "FAIL", message: "해당 댓글이 없습니다." });
    if (!comment) return res.status(400).json({ result: "FAIL", message: "수정할 내용을 입력해 주세요" });

    await FeedComment.updateOne({ commentId }, { $set: { comment, modDate } });
    res.status(200).json({ result: "SUCCESS", message: "피드 댓글 수정이 성공했습니다." });
  } catch (err) {
    res.status(400).json({ result: "FAIL", message: "피드 댓글 수정이 실패했습니다." });
  }
}

async function deleteComment(req, res) {
  // #swagger.description = "여기는 피드댓글을 삭제하는 곳 입니다."
  // #swagger.tags = ["FeedComment"]
  // #swagger.summary = "피드댓글 삭제"
  try {
    const { user } = res.locals;
    const { commentId } = req.query;
    const checkcomment = await FeedComment.findOne({ commentId });
    if (user.nickname !== checkcomment.nickname) return res.status(400).json({ result: "FAIL", message: "삭제 권한이 없습니다." });
    if (!checkcomment) return res.status(400).json({ result: "FAIL", message: "해당 댓글이 없습니다." });

    await FeedComment.deleteOne({ commentId });
    res.status(200).json({ result: "SUCCESS", message: "피드 댓글 삭제가 성공했습니다." });
  } catch (err) {
    res.status(400).json({ result: "FAIL", message: "피드 댓글 삭제가 실패했습니다." });
  }
}
module.exports = { showComments, writeComment, updateComment, deleteComment };

const FeedComment = require("../schemas/feedcomment");
const User = require("../schemas/user");

async function showComments(req, res) {
  try {
    const comments = await FeedComment.find();
    res.status(200).json({
      result: { feed: comments },
    });
  } catch (err) {
    res.status(400).json({ result: "FAIL" });
  }
}
async function writeComment(req, res) {
  try {
  } catch (err) {}
}
async function updateComment(req, res) {
  try {
  } catch (err) {}
}
async function deleteComment(req, res) {
  try {
  } catch (err) {}
}

module.exports = { showComments, writeComment, updateComment, deleteComment };

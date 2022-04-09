const mongoose = require("mongoose");
const autoIdSetter = require("./auto-id-setter");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  feedId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  regDate: {
    type: String,
  },
  modDate: {
    type: String,
  },
});
autoIdSetter(schema, mongoose, "schema", "commentId");
module.exports = mongoose.model("FeedComment", schema);

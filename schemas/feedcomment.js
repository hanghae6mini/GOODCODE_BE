const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    commentId : {
        type: String,
        required: true,
        unique: true,
    },
    feedId : {
        type: String,
        required: true,
    },
    comment : {
        type: String,
        required: true,
    },
    regDate : {
        type: String,
    },
    modDate : {
        type: String,
    },
});

module.exports = mongoose.model('FeedComment', schema);
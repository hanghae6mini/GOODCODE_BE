const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    feedId : {
        type: String,
        required: true,
        unique: true,
    },
    userId : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    image : {
        type: String,
    },
    regDate : {
        type: String,
    },
    modDate : {
        type: String,
    },
});

module.exports = mongoose.model('Feed', schema);
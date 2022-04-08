const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    nickname : {
        type: String,
        required: true,
    },
    introduce : {
        type: String,
    },
    location : {
        type: String,
    },
    email : {
        type: String,
    },
    url : {
        type: String,
    },
    regDate : {
        type: String,
    },
    modDate : {
        type: String,
    },
});

module.exports = mongoose.model('User', schema);
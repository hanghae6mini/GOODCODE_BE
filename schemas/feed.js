const mongoose = require('mongoose');
const autoIdSetter = require('./auto-id-setter');

const schema = new mongoose.Schema({
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
autoIdSetter(schema, mongoose, 'schema', 'feedId');
module.exports = mongoose.model('Feed', schema);
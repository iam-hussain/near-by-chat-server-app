var mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;


var conversation = new mongoose.Schema({
    author: {
        require: true,
        type: Schema.Types.ObjectId, ref: 'User'
    },
    body: String,
    attachment: String,
});

var ChatSchema = new mongoose.Schema({
    members: [{ type : Schema.Types.ObjectId, ref: 'User' }],
    messages: [conversation]
});

// mongoose.plugin(timestamps, {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });


module.exports = mongoose.model("Chat", ChatSchema);
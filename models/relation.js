var mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var RelationSchema = new mongoose.Schema({
    relating: {
        require: true,
        type: Schema.Types.ObjectId, ref: 'User'
    },
    related: {
        require: true,
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        require: true,
        type: String,
    }
});

mongoose.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = mongoose.model("Relation", RelationSchema);
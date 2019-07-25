var mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        require: true,
        type: String,
    },
    phone: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    salt: {
        require: true,
        type: String
    },
});

// mongoose.plugin(timestamps, {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });


module.exports = mongoose.model("User", UserSchema);
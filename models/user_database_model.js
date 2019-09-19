const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_database_schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});
user_database_schema.on('save', function () {
    console.log("A new User is Added To Document");
})
module.exports = mongoose.model('User', user_database_schema);
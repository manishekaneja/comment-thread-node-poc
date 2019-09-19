const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment_database_schema = new Schema({
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    postedBy: { type: Schema.Types.ObjectId, required: true },
    postedOn: { type: Date, default: Date.now(), immutable: true },
    childComments: [Schema.Types.ObjectId],
    parentComment: { type: Schema.Types.ObjectId, required: false }
});
comment_database_schema.on('save', function () {
    console.log("A new Comment has been added");
})
module.exports = mongoose.model('Comment', comment_database_schema);
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            unique: false,
        },
        body: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            unique: true,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required.'],
            min: 1,
            max: 5
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

const Review = model("Review", reviewSchema);

module.exports = Review;
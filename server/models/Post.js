const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    summary: String,
    content: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = model('Post', PostSchema);
module.exports = PostModel;

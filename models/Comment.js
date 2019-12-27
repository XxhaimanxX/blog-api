const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    maxlength: 20,
    minlength: 2
  },
  content: {
    type: String,
    required: [true, "Please add content"],
    maxlength: 200,
    minlength: 2
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post"
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);

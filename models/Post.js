const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: 20,
    minlength: 2
  },
  description: {
    type: String,
    required: [true, "Please add description"],
    maxlength: 200,
    minlength: 2
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Post", PostSchema);

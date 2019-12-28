const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      maxlength: [50, "Maximum title length is 20"],
      minlength: [2, "Minimun title length is 2"]
    },
    description: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [200, "Maximum description length is 20"],
      minlength: [2, "Minimun description length is 2"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Cascade delete comments whren post id deleted
PostSchema.pre("remove", async function(next) {
  await this.model("Comment").deleteMany({ post: this._id });
  next();
});

//Reverse populate with virtuals
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false
});

module.exports = mongoose.model("Post", PostSchema);

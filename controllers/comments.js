const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

//@desc      Add comment
//@route     POST /api/v1/posts/:postId/comments
//@access    Private
exports.addComment = asyncHandler(async (req, res, next) => {
  //Add the post and user to the comment body
  req.body.post = req.params.postId;
  req.body.user = req.user.id;

  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(
        `Post not found with the id of ${req.params.postId}`,
        404
      )
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment
  });
});

//@desc      Get comments
//@route     GET /api/v1/posts/comments
//@route     GET /api/v1/posts/:postId/comments
//@access    Public
exports.getComments = asyncHandler(async (req, res, next) => {
  if (req.params.postId) {
    const comments = await Comment.find({ post: req.params.postId });
    return res
      .status(200)
      .json({ success: true, count: comments.length, data: comments });
  } else {
    const comments = await Comment.find().populate({
      path: "post",
      select: "title"
    });
    res.status(200).json({ success: true, data: comments });
  }
});

//@desc      Update comment
//@route     PUT /api/v1/comments/:id
//@access    Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(
        `Comment not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  //Make sure user is comment owner
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Must be owner of the comment in order to update", 401)
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, { ...req.body });
  res.status(200).json({ success: true, data: comment });
});

//@desc      Delete comment
//@route     DELETE /api/v1/comments/:id
//@access    Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(
        `Comment not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  //Make sure user is comment owner
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Must be owner of the comment in order to delete", 401)
    );
  }

  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, msg: `Comment Removed!` });
});

//@desc      Delete all comments
//@route     DELETE /api/v1/comments
//@access    Private (Admin)
exports.deleteComments = asyncHandler(async (req, res, next) => {
  await Comment.deleteMany();
  res.status(200).json({ success: true, msg: `Comments Removed!` });
});

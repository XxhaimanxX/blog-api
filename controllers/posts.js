const ErrorResponse = require("../utils/errorResponse");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const asyncHandler = require("../middleware/async");

//@desc      Get all posts
//@route     GET /api/v1/posts
//@access    Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("comments");
  res.status(200).json({ success: true, data: posts });
});

//@desc      Get single post
//@route     GET /api/v1/posts/:id
//@access    Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  res.status(200).json({ success: true, data: post });
});

//@desc      Create new post
//@route     POST /api/v1/posts
//@access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;
  const post = await Post.create(req.body);

  res.status(201).json({ success: true, data: post });
});

//@desc      Update post
//@route     PUT /api/v1/posts/:id
//@access    Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  //Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Must be owner of the post in order to update", 401)
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: post });
});

//@desc      Delete all posts
//@route     DELETE /api/v1/posts
//@access    Private (Admin)
exports.deletePosts = asyncHandler(async (req, res, next) => {
  console.log("Deleting Posts And Comments...");
  await Post.deleteMany();
  await Comment.deleteMany();
  console.log("All Posts And Comments Deleted!");
  res.status(200).json({ success: true, msg: "All posts removed!" });
});

//@desc      Delete Single post
//@route     DELETE /api/v1/posts/:id
//@access    Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  //Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Must be owner of the post in order to delete", 401)
    );
  }

  await post.remove({ _id: req.params.id });
  res
    .status(200)
    .json({ success: true, msg: `Post with the id ${req.params.id} removed!` });
});

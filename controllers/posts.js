const ErrorResponse = require("../utils/errorResponse");
const Post = require("../models/Post");
const asyncHandler = require("../middleware/async");

//@desc      Get all posts
//@route     GET /api/v1/posts
//@access    Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ success: true, data: posts });
});

//@desc      Get single post
//@route     GET /api/v1/posts/:id
//@access    Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ success: true, data: post });
});

//@desc      Create new post
//@route     POST /api/v1/posts
//@access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
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
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: post });
});

//@desc      Delete all posts
//@route     DELETE /api/v1/posts
//@access    Private
exports.deletePosts = asyncHandler(async (req, res, next) => {
  await Post.deleteMany();
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
  await Post.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ success: true, msg: `Post with the id ${req.params.id} removed!` });
});

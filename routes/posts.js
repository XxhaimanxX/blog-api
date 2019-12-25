const express = require("express");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  deletePosts
} = require("../controllers/posts");

const Post = require("../models/Post");

const router = express.Router();

router
  .route("/")
  .get(getPosts)
  .post(createPost)
  .delete(deletePosts);

router
  .route("/:id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;

const express = require("express");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  deletePosts
} = require("../controllers/posts");

//Include other resource routers
const commentsRouter = require("./comments");

const router = express.Router();

//Re-route into other resource routers
router.use("/:postId/comments", commentsRouter);

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

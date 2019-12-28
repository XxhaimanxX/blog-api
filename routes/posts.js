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

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:postId/comments", commentsRouter);

router
  .route("/")
  .get(getPosts)
  .post(protect, authorize("publisher", "admin"), createPost)
  .delete(protect, authorize("admin"), deletePosts);

router
  .route("/:id")
  .get(getPost)
  .put(protect, authorize("publisher", "admin"), updatePost)
  .delete(protect, authorize("publisher", "admin"), deletePost);

module.exports = router;

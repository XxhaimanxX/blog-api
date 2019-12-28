const express = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  deleteComments
} = require("../controllers/comments");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getComments)
  .post(protect, authorize("user", "admin"), addComment)
  .delete(protect, authorize("admin"), deleteComments);

router
  .route("/:id")
  .put(protect, authorize("user", "admin"), updateComment)
  .delete(protect, authorize("user", "admin"), deleteComment);

module.exports = router;

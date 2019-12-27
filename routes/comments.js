const express = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  deleteComments
} = require("../controllers/comments");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getComments)
  .post(addComment)
  .delete(deleteComments);

router
  .route("/:id")
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;

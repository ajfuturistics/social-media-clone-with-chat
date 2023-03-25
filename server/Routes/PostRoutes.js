import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/:postId", getPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);
router.put("/:postId/like", likePost);
router.get("/:userId/timeline", getTimelinePosts);

export default router;

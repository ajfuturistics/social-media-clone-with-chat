import mongoose from "mongoose";
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

// Create new post
export const createPost = async (req, res) => {
  try {
    const newPost = new PostModel(req.body);

    await newPost.save();

    res.status(200).json({ message: "Post created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a post
export const getPost = async (req, res) => {
  const id = req.params.postId;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post does not exists" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const id = req.params.postId;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post does not exists" });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ message: "Action forbidden" });
    }

    await post.updateOne({ $set: req.body });
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const id = req.params.postId;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post does not exists" });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ message: "Action forbidden" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like dislike post
export const likePost = async (req, res) => {
  const id = req.params.postId;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post does not exists" });
    }

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "Post liked" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

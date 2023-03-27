import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get user details
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id).select("-password"); // "-password for not showing password"

    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password"); // "-password for not showing password"

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select("-password");

      // generating new token
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(403)
      .json({ message: "Access Denied! You can only update your own profile" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  try {
    if (id === currentUserId || currentUserAdminStatus) {
      await UserModel.findByIdAndDelete(id).select("-password");

      res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      res.status(403).json({
        message: "Access Denied! You can only delete your own profile",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Follow user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id: currentUserId } = req.body;

  if (currentUserId === id) {
    return res.status(403).json({ message: "Action forbidden" });
  }

  try {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(currentUserId);

    if (!followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $push: { followers: currentUserId } });
      await followingUser.updateOne({ $push: { following: id } });

      res.status(200).json({ message: "User followed!" });
    } else {
      res.status(403).json({ message: "You are already following this user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow user
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id: currentUserId } = req.body;

  if (currentUserId === id) {
    return res.status(403).json({ message: "Action forbidden" });
  }

  try {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(currentUserId);

    if (followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $pull: { followers: currentUserId } });
      await followingUser.updateOne({ $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed!" });
    } else {
      res
        .status(403)
        .json({ message: "You are already not following this user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

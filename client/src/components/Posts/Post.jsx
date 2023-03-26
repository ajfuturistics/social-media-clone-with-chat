import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { likePost } from "../../api/postRequests";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth.authData);

  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const [likes, setLikes] = useState(post?.likes?.length);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    await likePost(post._id, user._id);

    if (liked) {
      setLikes((prev) => {
        if (prev === 0) return prev;
        return prev - 1;
      });
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <div className="Post flex flex-col p-4 bg-[#ffffffa3] rounded-2xl gap-4">
      <img
        src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""}
        alt=""
        className="w-full max-h-80 object-cover rounded-lg"
      />

      <div className="postReact flex items-start gap-5">
        {liked ? (
          <AiFillHeart
            size={32}
            className="text-rose-500 cursor-pointer"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart
            size={32}
            className="cursor-pointer"
            onClick={handleLike}
          />
        )}
        <AiOutlineComment size={32} className="cursor-pointer" />
        <AiOutlineSend size={32} className="cursor-pointer" />
      </div>
      <span className="text-[#242d49a5] text-xs">{likes} likes</span>
      <div className="detail">
        <span className="font-semibold">{post?.name}</span>
        <span> {post?.desc}</span>
      </div>
    </div>
  );
};

export default Post;

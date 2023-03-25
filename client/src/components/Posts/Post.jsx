import React from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";

const Post = ({ post }) => {
  return (
    <div className="Post flex flex-col p-4 bg-[#ffffffa3] rounded-2xl gap-4">
      <img
        src={post.img}
        alt=""
        className="w-full max-h-80 object-cover rounded-lg"
      />

      <div className="postReact flex items-start gap-5">
        {post?.liked ? (
          <AiFillHeart size={32} className="text-rose-500" />
        ) : (
          <AiOutlineHeart size={32} />
        )}
        <AiOutlineComment size={32} />
        <AiOutlineSend size={32} />
      </div>
      <span className="text-[#242d49a5] text-xs">{post?.likes} likes</span>
      <div className="detail">
        <span className="font-semibold">{post?.name}</span>
        <span> {post?.desc}</span>
      </div>
    </div>
  );
};

export default Post;

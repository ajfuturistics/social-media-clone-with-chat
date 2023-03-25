import React from "react";
import { PostsData } from "../../Data/PostsData";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="Posts flex flex-col gap-4">
      {PostsData.map((post, idx) => {
        return <Post key={idx} post={post} />;
      })}
    </div>
  );
};

export default Posts;

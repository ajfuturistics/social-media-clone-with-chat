import React, { useEffect } from "react";
// import { PostsData } from "../../Data/PostsData";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { user } = useSelector((state) => state.auth.authData);
  let { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  if (!posts) return "No Posts";
  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className="Posts flex flex-col gap-4">
      {loading
        ? "Fetching Posts..."
        : posts.map((post) => {
            return <Post key={post?._id} post={post} />;
          })}
    </div>
  );
};

export default Posts;

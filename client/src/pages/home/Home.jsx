import React from "react";
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";

const Home = () => {
  return (
    <div className="Home relative grid grid-cols-[18rem_auto_20rem] gap-4 px-2">
      <ProfileSide location="homepage" />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;

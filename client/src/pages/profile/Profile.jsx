import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";

const Profile = () => {
  return (
    <div className="Profile relative grid grid-cols-[18rem_auto_20rem] gap-4">
      <ProfileLeft />

      <div className="profileCenter flex flex-col gap-4">
        <ProfileCard />
        <PostSide />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;

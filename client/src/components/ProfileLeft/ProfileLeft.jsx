import React from "react";
import LogoSearch from "../LogoSearch/LogoSearch";
import InfoCard from "../InfoCard/InfoCard";
import FollowersCard from "../FollowersCard/FollowersCard";

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft flex flex-col gap-4 items-center">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;

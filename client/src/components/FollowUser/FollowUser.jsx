import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/userActions";

const FollowUser = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id) || false
  );

  const handleFollow = (e) => {
    if (following) {
      dispatch(unfollowUser(person?._id, user));
    } else {
      dispatch(followUser(person?._id, user));
    }
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower flex justify-between">
      <div className="flex gap-3">
        <img
          src={
            person?.profilePic
              ? process.env.REACT_APP_PUBLIC_FOLDER + person?.profilePic
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          alt={`${person.username}_img`}
          className="followerImg w-[3.2rem] h-[3.2rem] rounded-full"
        />
        <div className="name flex flex-col items-start justify-center">
          <span className="font-semibold">{`${person?.firstname} ${person?.lastname}`}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={`custom-btn h-8 px-5 ${
          following
            ? "bg-transparent border-rose-500 border-2 border-solid text-rose-500"
            : ""
        }`}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowUser;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.auth.authData);
  const { posts } = useSelector((state) => state.post);

  return (
    <div className="profileCard rounded-3xl flex flex-col relative gap-4 overflow-x-clip bg-[#ffffffa3]">
      <div className="profileImages relative flex flex-col items-center justify-center">
        <img
          src={
            user?.coverPic
              ? process.env.REACT_APP_PUBLIC_FOLDER + user?.coverPic
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultCover.jpg"
          }
          alt="profile-cover"
          className="w-full"
        />
        <img
          src={
            user?.profilePic
              ? process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePic
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          alt="profile-img"
          className="w-24 rounded-full absolute -bottom-12 shadow-md"
        />
      </div>
      <div className="profileName flex flex-col items-center mt-12 gap-1">
        <span className="font-bold">{`${user?.firstname} ${user?.lastname}`}</span>
        <span>{user?.worksAt ? user?.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus flex justify-center items-center gap-3 flex-col">
        <hr className="w-[85%] border border-solid border-gray-400" />
        <div className="flex gap-4 w-[80%] justify-around items-center">
          <div className="follow flex flex-col gap-2 justify-center items-center">
            <span className="font-bold">{user?.following?.length}</span>
            <span className="text-gray-600 text-sm">Following</span>
          </div>

          <div className="vl h-[100%] border-l-2 border-solid border-gray-400"></div>

          <div className="follow flex flex-col gap-2 justify-center items-center">
            <span className="font-bold">{user?.followers?.length}</span>
            <span className="text-gray-600 text-sm">Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl h-[100%] border-l-2 border-solid border-gray-400"></div>

              <div className="follow flex flex-col gap-2 justify-center items-center">
                <span className="font-bold">
                  {posts?.filter((p) => p.userId === user?._id).length || "0"}
                </span>
                <span className="text-gray-600 text-sm">Posts</span>
              </div>
            </>
          )}
        </div>
        <hr className="w-[85%] border border-solid border-gray-400" />
      </div>

      {location !== "profilePage" && (
        <span className="font-bold text-rose-500 self-center mb-4 cursor-pointer">
          <Link to={`/profile/${user?._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

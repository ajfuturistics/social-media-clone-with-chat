import React from "react";
import Cover from "../../img/cover.jpg";
import ProfileImg from "../../img/profileImg.jpg";

const ProfileCard = () => {
  const profilePage = true;

  return (
    <div className="profileCard rounded-3xl flex flex-col relative gap-4 overflow-x-clip bg-[#ffffffa3]">
      <div className="profileImages relative flex flex-col items-center justify-center">
        <img src={Cover} alt="profile-cover" className="w-full" />
        <img
          src={ProfileImg}
          alt="profile-img"
          className="w-24 rounded-full absolute -bottom-12 shadow-md"
        />
      </div>
      <div className="profileName flex flex-col items-center mt-12 gap-1">
        <span className="font-bold">Zendaya MJ</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus flex justify-center items-center gap-3 flex-col">
        <hr className="w-[85%] border border-solid border-gray-400" />
        <div className="flex gap-4 w-[80%] justify-around items-center">
          <div className="follow flex flex-col gap-2 justify-center items-center">
            <span className="font-bold">6,890</span>
            <span className="text-gray-600 text-sm">Followings</span>
          </div>

          <div className="vl h-[100%] border-l-2 border-solid border-gray-400"></div>

          <div className="follow flex flex-col gap-2 justify-center items-center">
            <span className="font-bold">1</span>
            <span className="text-gray-600 text-sm">Followers</span>
          </div>

          {profilePage && (
            <>
              <div className="vl h-[100%] border-l-2 border-solid border-gray-400"></div>

              <div className="follow flex flex-col gap-2 justify-center items-center">
                <span className="font-bold">3</span>
                <span className="text-gray-600 text-sm">Posts</span>
              </div>
            </>
          )}
        </div>
        <hr className="w-[85%] border border-solid border-gray-400" />
      </div>

      {!profilePage && (
        <span className="font-bold text-rose-500 self-center mb-4 cursor-pointer">
          My Profile
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

import React, { useEffect, useState } from "react";
import { getUser } from "../../api/userRequests";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const userId = data?.members?.find((id) => id !== currentUserId);
    try {
      const res = await getUser(userId);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex gap-4 rounded-lg p-[10px] hover:bg-[#80808038] hover:cursor-pointer">
        <div className="relative">
          <div className="online-dot bg-[#adff2f] rounded-full absolute left-8 w-4 h-4 shadow-md"></div>
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={
              userData?.profilePic
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData?.profilePic
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="c-p"
          />
        </div>
        <div className="name flex flex-col items-start justify-center text-sm">
          <span className="font-semibold">{`${userData?.firstname} ${userData?.lastname}`}</span>
          <span className="">Online</span>
        </div>
      </div>

      <hr className="w-[85%] border-[0.1px] border-solid border-[#ececec] my-2" />
    </>
  );
};

export default Conversation;

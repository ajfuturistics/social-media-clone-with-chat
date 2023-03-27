import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/userRequests";
import { logout } from "../../redux/actions/authActions";

const InfoCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.auth.authData);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const fetchProfileUser = async () => {
    if (profileUserId === user?._id) {
      setProfileUser(user);
    } else {
      const { data } = await UserApi.getUser(profileUserId);
      setProfileUser(data);
    }
  };

  useEffect(() => {
    fetchProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="InfoCard flex flex-col gap-3 bg-[#ffffffa3] p-4 rounded-2xl w-[90%]">
      <div className="infoHead flex justify-between items-center">
        <h4 className="font-semibold">Profile Info</h4>
        {user?._id === profileUserId && (
          <div>
            <AiFillEdit size={20} className="cursor-pointer" onClick={open} />
            <ProfileModal opened={opened} close={close} data={user} />
          </div>
        )}
      </div>

      <div className="info">
        <span className="font-semibold">Status </span>
        <span>{profileUser?.relationshipStatus}</span>
      </div>

      <div className="info">
        <span className="font-semibold">Lives in </span>
        <span>{profileUser?.livesIn}</span>
      </div>
      <div className="info">
        <span className="font-semibold">Works in </span>
        <span>{profileUser?.worksAt}</span>
      </div>

      <button
        className="custom-btn w-28 h-8 mt-24 self-end"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default InfoCard;

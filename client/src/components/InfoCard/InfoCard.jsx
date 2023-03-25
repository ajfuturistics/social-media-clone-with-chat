import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../ProfileModal/ProfileModal";

const InfoCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="InfoCard flex flex-col gap-3 bg-[#ffffffa3] p-4 rounded-2xl w-[90%]">
      <div className="infoHead flex justify-between items-center">
        <h4 className="font-semibold">Your Info</h4>
        <div>
          <AiFillEdit size={20} className="cursor-pointer" onClick={open} />
          <ProfileModal opened={opened} close={close} />
        </div>
      </div>

      <div className="info">
        <span className="font-semibold">Status </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span className="font-semibold">Lives in </span>
        <span>Mumbai</span>
      </div>
      <div className="info">
        <span className="font-semibold">Works in </span>
        <span>Google</span>
      </div>

      <button className="custom-btn w-28 h-8 mt-24 self-end">Logout</button>
    </div>
  );
};

export default InfoCard;

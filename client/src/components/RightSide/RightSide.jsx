import React from "react";
import NavIcons from "../NavIcons/NavIcons";
import TrendCard from "../TrendCard/TrendCard";
import { useDisclosure } from "@mantine/hooks";
import ShareModal from "../ShareModal/ShareModal";

const RightSide = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="rightSide flex flex-col gap-8">
      <NavIcons />
      <TrendCard />
      <button onClick={open} className="custom-btn h-12 w-[80%] self-center">
        Share
      </button>
      <ShareModal opened={opened} close={close} />
    </div>
  );
};

export default RightSide;

import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({ opened, close }) => {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="55%"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        <PostShare />
      </Modal>
    </>
  );
};

export default ShareModal;

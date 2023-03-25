import { Modal, useMantineTheme } from "@mantine/core";

function ProfileModal({ opened, close }) {
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
        <form className="info-form flex justify-center items-center flex-col gap-8 p-4 rounded-2xl bg-[#ffffffa3]">
          <h2 className="font-bold text-2xl text-rose-500">Your Info</h2>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="lastName"
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Works at"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="worksAt"
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Lives in"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="livesIn"
            />
            <input
              type="text"
              placeholder="Country"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="country"
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Relationship Status"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="RelationshipStatus"
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            Profile Image
            <input type="file" name="ProfileImg" />
          </div>
          <div className="flex gap-4 h-8 w-full">
            Cover Image
            <input type="file" name="CoverImg" />
          </div>

          <button className="custom-btn w-24 h-8 self-end">Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;

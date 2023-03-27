import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../redux/actions/uploadActions";
import { updateUser } from "../../redux/actions/userActions";

function ProfileModal({ opened, close, data }) {
  const theme = useMantineTheme();
  const { password, ...others } = data;

  const [formData, setFormData] = useState(others);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();
  const { updateLoading } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const imageChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (e.target.name === "profilePic") {
        setProfilePic(img);
      } else {
        setCoverPic(img);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;

    if (profilePic) {
      const data = new FormData();
      const fileName = Date.now() + "-" + profilePic.name;

      data.append("name", fileName);
      data.append("file", profilePic);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
      userData.profilePic = fileName;
    }
    if (coverPic) {
      const data = new FormData();
      const fileName = Date.now() + "-" + coverPic.name;

      data.append("name", fileName);
      data.append("file", coverPic);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
      userData.coverPic = fileName;
    }

    dispatch(updateUser(params.id, userData));
    close();
  };

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
        <form
          onSubmit={handleSubmit}
          className="info-form flex justify-center items-center flex-col gap-8 p-4 rounded-2xl bg-[#ffffffa3]"
        >
          <h2 className="font-bold text-2xl text-rose-500">Your Info</h2>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="firstname"
              value={formData.firstname}
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="lastname"
              value={formData.lastname}
              onChange={changeHandler}
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Works at"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="worksAt"
              value={formData.worksAt}
              onChange={changeHandler}
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Lives in"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="livesIn"
              value={formData.livesIn}
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="Country"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="country"
              value={formData.country}
              onChange={changeHandler}
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Relationship Status"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={changeHandler}
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            Profile Image
            <input
              type="file"
              name="profilePic"
              onChange={imageChangeHandler}
            />
          </div>
          <div className="flex gap-4 h-8 w-full">
            Cover Image
            <input type="file" name="coverPic" onChange={imageChangeHandler} />
          </div>

          <button
            disabled={updateLoading}
            type="submit"
            className="custom-btn w-24 h-8 self-end"
          >
            {updateLoading ? "Loading..." : "Update"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;

import React, { useState, useRef } from "react";
import profileImg from "../../img/profileImg.jpg";
import { BiImage, BiPlayCircle, BiCalendar, BiXCircle } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files || e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  return (
    <div className="postShare flex gap-4 bg-[#ffffffa3] p-4 rounded-2xl">
      <img
        src={profileImg}
        alt="post-profile"
        className="rounded-full w-12 h-12"
      />
      <div className="flex flex-col w-[90%]">
        <input
          type="text"
          placeholder="What's happening"
          className="bg-[#28343e11] rounded-xl p-3 text-base border-none outline-none"
        />
        <div className="postOptions flex justify-around pt-2">
          <div
            onClick={() => imageRef.current.click()}
            className="option p-1 px-3 rounded-xl flex justify-center items-center text-xs font-semibold hover:cursor-pointer text-emerald-500"
          >
            <BiImage size={28} />
            Photo
          </div>
          <div className="option p-1 px-3 rounded-xl flex justify-center items-center text-xs font-semibold hover:cursor-pointer text-purple-500">
            <BiPlayCircle size={28} />
            Video
          </div>
          <div className="option p-1 px-3 rounded-xl flex justify-center items-center text-xs font-semibold hover:cursor-pointer text-red-500">
            <MdOutlineLocationOn size={28} />
            Location
          </div>
          <div className="option p-1 px-3 rounded-xl flex justify-center items-center text-xs font-semibold hover:cursor-pointer text-yellow-500">
            <BiCalendar size={28} />
            Schedule
          </div>
          <button className="custom-btn p-1 px-5">Share</button>
          <div className="hidden">
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage relative mt-2">
            <BiXCircle
              size={28}
              onClick={() => setImage(null)}
              className="absolute right-4 top-2 hover:cursor-pointer text-red-500"
            />
            <img
              src={image?.image}
              alt="seleted-img"
              className="w-full max-h-[20rem] object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;

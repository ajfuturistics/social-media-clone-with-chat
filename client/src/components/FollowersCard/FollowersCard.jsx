import React from "react";
import { Followers } from "../../Data/FollowersData";

const FollowersCard = () => {
  return (
    <div className="FollowersCard w-full rounded-xl gap-4 flex flex-col text-sm">
      <h3 className="font-bold text-lg">Who is following you</h3>

      {Followers.map((follower, idx) => {
        return (
          <div className="follower flex justify-between" key={idx}>
            <div className="flex gap-3">
              <img
                src={follower.img}
                alt={`${follower.name}_img`}
                className="followerImg w-[3.2rem] h-[3.2rem] rounded-full"
              />
              <div className="name flex flex-col items-start justify-center">
                <span className="font-semibold">{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="custom-btn h-8 px-5">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;

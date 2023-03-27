import React, { useEffect, useState } from "react";
// import { Followers } from "../../Data/FollowersData";
import FollowUser from "../FollowUser/FollowUser";
import { getAllUsers } from "../../api/userRequests";
import { useSelector } from "react-redux";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);

  const { user } = useSelector((state) => state.auth.authData);

  const fetchPersons = async () => {
    try {
      const { data } = await getAllUsers();
      setPersons(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard w-full rounded-xl gap-4 flex flex-col text-sm">
      <h3 className="font-bold text-lg">Who is following you</h3>

      {persons.map((person) => {
        if (person._id !== user._id) {
          return <FollowUser key={person._id} person={person} />;
        } else {
          return undefined;
        }
      })}
    </div>
  );
};

export default FollowersCard;

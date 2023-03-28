import React, { useEffect, useState } from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/chatRequests";
import Conversation from "../../components/Conversation/Conversation";
import NavIcons from "../../components/NavIcons/NavIcons";
import ChatBox from "../../components/ChatBox/ChatBox";

const Chat = () => {
  const { user } = useSelector((state) => state.auth.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const getChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="relative grid grid-cols-[22%_auto] gap-4">
      <div className="left-side flex flex-col gap-4">
        <LogoSearch />
        <div className="chat-container flex flex-col gap-4 bg-[#ffffffa3] rounded-2xl p-4 h-auto min-h-[80vh]">
          <h2 className="text-2xl font-bold">Chats</h2>
          <div className="chat-list flex flex-col gap-4">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-side flex flex-col gap-4">
        <div className="w-80 self-end">
          <NavIcons />
        </div>

        {/* chat body */}
        <ChatBox chat={currentChat} currentUserId={user?._id} />
      </div>
    </div>
  );
};

export default Chat;

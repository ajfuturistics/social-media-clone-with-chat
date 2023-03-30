import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/chatRequests";
import Conversation from "../../components/Conversation/Conversation";
import NavIcons from "../../components/NavIcons/NavIcons";
import ChatBox from "../../components/ChatBox/ChatBox";

import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.auth.authData);

  const socket = useRef();
  // const socket = io();

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sMessage, setSMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const getChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members?.find(
      (memberId) => memberId !== user?._id
    );
    const online = onlineUsers.find((user) => user?.userId === chatMember);

    return online ? true : false;
  };

  useEffect(() => {
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sMessage !== null) {
      socket.current.emit("send-message", sMessage);
    }
  }, [sMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setRecieveMessage(data);
    });
  }, []);

  return (
    <div className="relative grid grid-cols-[22%_auto] gap-4">
      <div className="left-side flex flex-col gap-4">
        <LogoSearch />
        <div className="chat-container flex flex-col gap-4 bg-[#ffffffa3] rounded-2xl p-4 h-auto min-h-[80vh]">
          <h2 className="text-2xl font-bold">Chats</h2>
          <div className="chat-list flex flex-col gap-4">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
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
        <ChatBox
          chat={currentChat}
          currentUserId={user?._id}
          setSMessage={setSMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

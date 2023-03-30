import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/userRequests";
import { getMessages, sendMessage } from "../../api/messageRequests";
import InputEmoji from "react-input-emoji";
// import * as timeago from "timeago.js";
import TimeAgo from "react-timeago";

const ChatBox = ({ chat, currentUserId, setSMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (newMessage === "") {
      return;
    }

    const message = {
      senderId: currentUserId,
      chatId: chat?._id,
      text: newMessage,
    };

    // send message to database
    try {
      const { data } = await sendMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // send message to socket server
    const recieverId = chat?.members?.find((id) => id !== currentUserId);
    setSMessage({ ...message, recieverId });
  };

  const getUserData = async () => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    try {
      const res = await getUser(userId);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chat !== null) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, currentUserId]);

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages(chat?._id);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chat !== null) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  // setting recieved message from socket
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat?._id) {
      setMessages([...messages, recieveMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recieveMessage]);

  // always scroll to last message
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chatbox-container bg-[#ffffffa3] rounded-2xl grid grid-rows-[14vh_60vh_13vh] mt-2 ">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header p-[1rem_1rem_0rem_1rem] w-full flex flex-col">
              <div className="follower flex justify-between items-center">
                <div className="flex gap-[10px]">
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage w-[50px] h-[50px] rounded-full"
                  />
                  <div className="name flex flex-col items-start justify-center text-sm font-semibold">
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="w-[85%] border-[0.1px] border-solid border-[#ececec] my-2" />
            </div>

            {/* chatbox message */}
            <div className="chat-body flex flex-col gap-2 p-6 overflow-scroll">
              {messages.map((message) => (
                <div
                  key={message._id}
                  ref={scrollRef}
                  className={`text-white p-3 max-w-md w-fit flex flex-col gap-2 ${
                    message.senderId === currentUserId
                      ? "bg-sky-500 self-end rounded-[1rem_1rem_0_1rem]"
                      : "bg-rose-500 rounded-[1rem_1rem_1rem_0]"
                  }`}
                >
                  <span>{message?.text}</span>
                  <span className="text-xs self-end">
                    <TimeAgo date={message?.createdAt} />
                  </span>
                </div>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender bg-white flex justify-between items-center gap-4 h-14 p-3 rounded-2xl self-end">
              <div className="bg-[#e9e9e9] rounded-lg flex justify-center items-center font-bold cursor-pointer w-10 h-10">
                +
              </div>
              <InputEmoji
                className="h-[70%] bg-[#ececec] rounded-lg border-none outline-none flex-1 text-sm p-[0px_15px_0px_15px]"
                value={newMessage}
                onChange={handleChange}
              />
              <button
                onClick={handleSend}
                className="send-button custom-btn p-[0.2rem_0.6rem]"
              >
                Send
              </button>
              <input
                className="h-[70%] bg-[#ececec] rounded-lg border-none outline-none flex-1 text-sm p-[0px_15px_0px_15px]"
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
              />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message flex justify-center items-center text-xl">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

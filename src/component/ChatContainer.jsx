import React, { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";
import { ImSpinner8 } from "react-icons/im";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
const ChatContainer = () => {
    const {messages,getMessages,isMessageLoading,selectedUser}=useChatStore()
    
    useEffect(()=>{
        getMessages(selectedUser._id)
    },[getMessages,selectedUser._id])


    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("default", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
  if(isMessageLoading){
    return(
        <div className="w-full h-full bg-gray-500 shadow-lg border-r border-gray-200 flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-3xl" />
      </div>
    )
  }

  

  return (
    <div className="flex flex-col h-full bg-gray-50 shadow-lg rounded-md">
      {/* Chat Header */}
      <ChatHeader userName={selectedUser.fullName} profilePic={selectedUser.profilePic}/>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.senderId === selectedUser._id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === selectedUser._id
                  ? "bg-slate-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text && <p>{message.text}</p>}
              {message.image && (
                <img
                  src={message.image}
                  alt="Sent"
                  className="rounded-lg max-w-full"
                />
              )}
            <p className="text-xs text-gray-400 mt-1">
                {formatDateTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
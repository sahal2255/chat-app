import React from "react";
import useChatStore from "../store/useChatStore";
import Welcome from "../component/Welcome";
import ChatContainer from "../component/ChatContainer";
import SideBar from "../component/SideBar";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen text-white mt-12">
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-6xl h-[90%] flex">
          <SideBar />

          <div className="flex-1 flex flex-col">
            {!selectedUser ? (
              <Welcome />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

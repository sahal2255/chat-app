import React from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Check if the selected user is online
  const isSelectedUserOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-black text-white rounded-t-md">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
            {selectedUser?.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt="profilePic"
                className="rounded-full h-10 w-10 object-cover"
              />
            ) : (
              <span>
                {selectedUser?.fullName?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-lg">{selectedUser?.fullName || "Unknown User"}</p>
            <p className="text-sm text-gray-200">
              {isSelectedUserOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button className="text-white hover:bg-indigo-500 p-2 rounded-md">
          Options
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { ImSpinner8 } from "react-icons/im";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div className="w-64 h-full bg-gray-500 shadow-lg border-r border-gray-200 flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-3xl" />
      </div>
    );
  }

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  return (
    <div className="w-64 bg-gray-700 shadow-lg border-r border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-3 cursor-pointer ${
                selectedUser?._id === user._id ? "bg-gray-500" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={`${user.fullName}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {user.fullName ? user.fullName[0].toUpperCase() : "?"}
                  </div>
                )}
                {isUserOnline(user._id) && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-700"></span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-white">{user.fullName || "Unknown User"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">No users online</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;

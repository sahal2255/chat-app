import React from "react";
import { FaCommentDots } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
      <FaCommentDots size={64} className="text-indigo-600 mb-6 animate-bounce" />
      <h1 className="text-3xl font-bold mb-2">Welcome to ChatApp</h1>
      <p className="text-sm text-gray-500">
        Select a chat or start a new conversation to begin.
      </p>
    </div>
  );
};

export default Welcome;

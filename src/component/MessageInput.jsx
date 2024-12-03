import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdImage } from "react-icons/md";
import useChatStore from "../store/useChatStore";

const MessageInput = () => {

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const {sendMessage}=useChatStore()
  const handleSendMessage = async() => {
    if (newMessage.trim() || selectedImage) {
      try {
        await sendMessage({
            text:newMessage.trim(),
            image:selectedImage
        })

        setSelectedImage(null)
        setNewMessage('')
      } catch (error) {
        console.log('failed to send message',error)
      }
    }
    return 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-3 bg-gray-100 border-t border-gray-200 flex items-center space-x-3">
      

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Preview"
            className="h-12 w-12 object-cover rounded-md"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs p-1 rounded-full"
            title="Remove Image"
          >
            ✕
          </button>
        </div>
      )}

      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded-md"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <label
        className="cursor-pointer text-black p-2 rounded-md "
        title="Attach Image"
      >
        <MdImage className="text-2xl" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      <button
        className={`p-3 rounded-md text-black ${
          !(newMessage.trim() || selectedImage)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={handleSendMessage}
        title="Send Message"
        disabled={!(newMessage.trim() || selectedImage)}
      >
        <FiSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageInput;

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner icon
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfilePic, isUpdatingProfile } = useAuthStore();
  const [preview, setPreview] = useState(authUser.profilePic);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Show preview immediately
      };
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64Image = reader.result;
          await updateProfilePic({ profilePic: base64Image });
        } catch (error) {
          console.error("Error updating profile picture:", error);
        }
      };
    }
  };

  const createdDate = new Date(authUser.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="container mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-8">Profile</h2>

          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4  shadow-lg flex items-center justify-center overflow-hidden bg-gray-100">
                {isUpdatingProfile ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={32}
                  />
                ) : (
                  <img
                    src={preview || "https://via.placeholder.com/150?text=No+Avatar"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="avatarInput"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-indigo-700"
                title="Edit Avatar"
              >
                <FaEdit size={18} />
              </label>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-sm mt-2 text-gray-500">
              Click the icon to update your profile picture.
            </p>
          </div>

          {/* User Details Section */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-semibold text-lg">Name:</label>
              <input
                type="text"
                value={authUser.fullName}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Email:</label>
              <input
                type="email"
                value={authUser.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">
                Account Created On:
              </label>
              <input
                type="text"
                value={createdDate}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

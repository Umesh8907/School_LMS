"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component from shadcn
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import { FaCloudUploadAlt } from "react-icons/fa"; // For upload icon

const ProfilePage = () => {
  // State for controlling whether the entire form is editable
  const [isEditable, setIsEditable] = useState(false);

  const [userData, setUserData] = useState({
    profilePic: "https://via.placeholder.com/100", // Placeholder image
    name: "Sarah Jones",
    email: "john.doe@example.com",
    phone: "+9134567890", // Non-editable
    dob: { day: "01", month: "01", year: "1990" },
    institute: "Some Institute",
    guardianContact: "+9187654321",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      dob: { ...prevData.dob, [name]: value },
    }));
  };

  // Profile picture upload handler
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPic = URL.createObjectURL(e.target.files[0]);
      setUserData((prevData) => ({ ...prevData, profilePic: newPic }));
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="md:w-[80%] w-[95%] mx-auto mb-20 p-20 bg-[#f4f2ff] shadow-lg rounded-lg mt-40">
      {/* Profile Picture Section */}
      <div className="flex w-full justify-between mb-10">
        <div className="flex items-center">
          <div>
            <img
              src={userData.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 mb-4 border-4 "
            />
            <label
              className={`flex items-center cursor-pointer ${
                !isEditable && "opacity-20"
              }`}
            >
              <FaCloudUploadAlt className=" h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                Upload Profile Picture
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
                disabled={!isEditable}
              />
            </label>
          </div>
          <div className="ml-6">
            <span className="text-2xl text-gray-800">{userData.name}</span>
          </div>
        </div>
        {/* Edit & Save Button at Bottom */}
        <div className="flex justify-end ">
          <Button
            onClick={toggleEdit}
            variant="solid"
            className={`px-6 py-2 transition-all duration-300 rounded-full ${
              isEditable
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-[#6e4a99] text-white hover:bg-[#652ab6]"
            }`}
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Name */}
        {isEditable ? (
          <Input
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border-gray-300 bg-white"
          />
        ) : (
          <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">{userData.name}</span>
        )}

        {/* Email */}
        {isEditable ? (
          <Input
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border-gray-300 bg-white"
          />
        ) : (
          <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">{userData.email}</span>
        )}

        {/* Phone (Non-editable) */}
        <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">{userData.phone}</span>

        {/* Date of Birth */}
        {isEditable ? (
          <div className="flex space-x-2">
            <select
              name="day"
              value={userData.dob.day}
              onChange={handleDOBChange}
              className="border border-gray-300 rounded px-2 py-1 bg-white"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={userData.dob.month}
              onChange={handleDOBChange}
              className="border border-gray-300 rounded px-2 py-1 bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={userData.dob.year}
              onChange={handleDOBChange}
              className="border border-gray-300 rounded px-2 py-1 bg-white"
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={String(1990 + i)}>
                  {1990 + i}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">
            {userData.dob.day}-{userData.dob.month}-{userData.dob.year}
          </span>
        )}

        {/* Institute */}
        {isEditable ? (
          <Input
            name="institute"
            value={userData.institute}
            onChange={handleInputChange}
            placeholder="Institute"
            className="border-gray-300 bg-white"
          />
        ) : (
          <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">{userData.institute}</span>
        )}

        {/* Guardian Contact */}
        {isEditable ? (
          <Input
            name="guardianContact"
            value={userData.guardianContact}
            onChange={handleInputChange}
            placeholder="Guardian Contact"
            className="border-gray-300 bg-white"
          />
        ) : (
          <span className="text-gray-900 font-semibold border p-2 rounded-xl bg-white">{userData.guardianContact}</span>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

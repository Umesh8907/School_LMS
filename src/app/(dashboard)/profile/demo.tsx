'use client';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // Assuming you have an Input component from shadcn
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import { PencilIcon } from '@heroicons/react/24/outline'; // For edit icon
import { FaCloudUploadAlt } from "react-icons/fa"; // For upload icon

const ProfilePage = () => {
  // State for controlling whether the entire form is editable
  const [isEditable, setIsEditable] = useState(false);

  const [userData, setUserData] = useState({
    profilePic: 'https://via.placeholder.com/100', // Placeholder image
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890', // Non-editable
    dob: { day: '01', month: '01', year: '1990' },
    institute: 'Some Institute',
    guardianContact: '+0987654321',
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
    <div className="md:w-[80%] w-[95%] mx-auto mb-20 p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={userData.profilePic}
          alt="Profile"
          className="rounded-full w-32 h-32 mb-4 border-4 border-gray-200"
        />
        <label className={`flex items-center cursor-pointer ${!isEditable && 'opacity-50'}`}>
          <FaCloudUploadAlt className="mr-2 h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">Upload new picture</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
            disabled={!isEditable}
          />
        </label>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Name</label>
          {isEditable ? (
            <Input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-2/3 border-gray-300"
            />
          ) : (
            <span className="w-2/3 text-gray-800">{userData.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Email</label>
          {isEditable ? (
            <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-2/3 border-gray-300"
            />
          ) : (
            <span className="w-2/3 text-gray-800">{userData.email}</span>
          )}
        </div>

        {/* Phone (Non-editable) */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Phone</label>
          <span className="w-2/3 text-gray-500">{userData.phone}</span>
          <span className="text-gray-400 italic">Unchangeable</span>
        </div>

        {/* Date of Birth */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Date of Birth</label>
          {isEditable ? (
            <div className="flex space-x-2 w-2/3">
              <select
                name="day"
                value={userData.dob.day}
                onChange={handleDOBChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={userData.dob.month}
                onChange={handleDOBChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={userData.dob.year}
                onChange={handleDOBChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={String(1990 + i)}>
                    {1990 + i}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="w-2/3 text-gray-800">
              {userData.dob.day}-{userData.dob.month}-{userData.dob.year}
            </span>
          )}
        </div>

        {/* Institute */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Institute</label>
          {isEditable ? (
            <Input
              name="institute"
              value={userData.institute}
              onChange={handleInputChange}
              className="w-2/3 border-gray-300"
            />
          ) : (
            <span className="w-2/3 text-gray-800">{userData.institute}</span>
          )}
        </div>

        {/* Guardian Contact */}
        <div className="flex justify-between items-center">
          <label className="font-semibold text-gray-700">Guardian Contact</label>
          {isEditable ? (
            <Input
              name="guardianContact"
              value={userData.guardianContact}
              onChange={handleInputChange}
              className="w-2/3 border-gray-300"
            />
          ) : (
            <span className="w-2/3 text-gray-800">{userData.guardianContact}</span>
          )}
        </div>
      </div>

      {/* Edit & Save Button at Bottom */}
      <div className="flex justify-end mt-10">
        <Button
          onClick={toggleEdit}
          variant="solid"
          className={`px-6 py-2 transition-all duration-300 ${
            isEditable
              ? 'bg-green-600 text-white hover:bg-green-500'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {isEditable ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;

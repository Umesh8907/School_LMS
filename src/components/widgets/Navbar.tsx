"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci"; // Import the icon from lucide-react

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className=" p-4 flex justify-center items-center">
      <div className="relative w-[400px]">
        {/* Search Input */}
        <div className="flex items-center  border border-gray-600 rounded-md bg-gray-100">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none"
          />
          <CiSearch className="ml-2 h-10 w-10 p-2" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

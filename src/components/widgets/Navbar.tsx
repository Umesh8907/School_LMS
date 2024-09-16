"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci"; 
import { FaBell } from "react-icons/fa6"; // Import the icon from lucide-react

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4 flex justify-between items-center mt-8 mb-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
     <div className="flex justify-end gap-8 items-center">
     <div className="relative w-[300px]">
        {/* Search Input */}
        <div className="flex items-center border border-gray-600 rounded-full bg-white">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none"
          />
          <CiSearch className="ml-2 h-10 w-10 p-2 cursor-pointer" />
        </div>
      </div>

      {/* Bell Icon with Badge */}
      <div className="relative">
        <FaBell className="text-3xl text-[#652ab6]" />
        {/* Badge */}
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          3
        </div>
      </div>
     </div>
    </div>
  );
};

export default Navbar;

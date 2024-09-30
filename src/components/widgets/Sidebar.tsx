"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/Infano Logo.png";
import {
  FaHome,
  FaUsers,
  FaBook,
  FaToolbox,
  FaRegSmile,
  FaPhone,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: FaHome },
  { name: "Community", href: "/community", icon: FaUsers },
  { name: "My Program", href: "/program", icon: FaBook },
  { name: "Wellness Tools", href: "/wellness-tools", icon: FaToolbox },
  { name: "Subscription", href: "/subscription", icon: FaRegSmile },
];

const bottomNavigation = [
  { name: "Talk to us", href: "/talk-to-us", icon: FaPhone },
  { name: "Profile", href: "/profile", icon: FaUser },
];

interface SidebarProps {
  onLogoutClick: () => void;
  onCloseSidebar: () => void; // New prop for closing the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick, onCloseSidebar }) => {
  const pathname = usePathname();

  const handleItemClick = () => {
    onCloseSidebar(); // Close the sidebar after clicking any item
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-[#F8EBF5] px-6 md:px-10 w-full md:w-[260px] relative">
      {/* Close Button (Visible on mobile) */}
      <button
        onClick={onCloseSidebar}
        className="absolute top-4 left-4 text-[#b955aa] text-2xl md:hidden"
      >
        <IoMdCloseCircle />
      </button>

      <div>
        {/* Logo */}
        <div className="mt-10 flex justify-center md:justify-start">
          <Image
            src={logo}
            alt="logo"
            className="md:block w-[80px] object-contain"
          />
        </div>

        {/* Top Navigation */}
        <nav className="mt-10 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                onClick={handleItemClick} // Close sidebar after clicking
                className={`flex items-center gap-2 sm:gap-0 px-8 md:px-4 py-2 font-medium rounded-lg w-full transition-colors
                ${
                  pathname === item.href
                    ? "bg-[#b955aa] text-white"
                    : "hover:bg-[#ed99bb] text-gray-600"
                }`}
              >
                <item.icon className="text-[24px] md:text-[20px] mr-2" />
                <span className="text-sm md:inline">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Line Separator */}
      <div className="my-4 border-t border-gray-400"></div>

      {/* Bottom Navigation */}
      <div className="mb-4 flex flex-col gap-4">
        {bottomNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              onClick={handleItemClick} // Close sidebar after clicking
              className={`flex items-center gap-2 sm:gap-0 px-8 md:px-4 py-2 font-medium rounded-lg w-full transition-colors
              ${
                pathname === item.href
                  ? "bg-[#b955aa] text-white"
                  : "hover:bg-[#ed99bb] text-gray-600"
              }`}
            >
              <item.icon className="text-[24px] md:text-[20px] mr-2" />
              <span className="text-sm md:inline">{item.name}</span>
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <div
          onClick={() => {
            onLogoutClick();
            onCloseSidebar(); // Close sidebar after logging out
          }}
          className="flex items-center gap-2 sm:gap-0 px-8 md:px-4 py-2 font-medium rounded-lg w-full transition-colors cursor-pointer hover:bg-[#ed99bb] text-gray-600"
        >
          <FaSignOutAlt className="text-[24px] md:text-[20px] mr-2" />
          <span className="text-sm md:inline">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

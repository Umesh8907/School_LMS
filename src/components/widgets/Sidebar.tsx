"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/Infano Logo.png";
import logo_icon from "../../assets/favicon.png";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaBook,
  FaToolbox,
  FaRegSmile,
  FaPhone,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

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
  { name: "Logout", href: "/logout", icon: FaSignOutAlt },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col justify-between bg-[#F8EBF5] px-4 md:px-10 w-[70px] md:w-[260px]">
      <div>
        {/* Logo */}
        <div className="mt-10 flex justify-start">
          <Image
            src={logo}
            alt="logo"
            className="hidden md:block w-[80px] object-contain"
          />
          <Image
            src={logo_icon}
            alt="logo"
            className="md:hidden w-[50px] object-contain"
          />
        </div>

        {/* Top Navigation with gap */}
        <nav className="mt-10 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center justify-center md:justify-start md:px-4 py-2 font-medium rounded-lg w-full transition-colors
                  ${
                    pathname === item.href
                      ? "bg-[#b955aa] text-white"
                      : "hover:bg-[#ed99bb] text-gray-600"
                  }`}
              >
                <item.icon className="text-[24px] md:text-[20px] mr-0 md:mr-2" />
                <span className="hidden md:inline">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation with gap */}
      <div className="mb-4 flex flex-col gap-4">
        {bottomNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`flex items-center justify-center md:justify-start px-4 py-2 font-medium rounded-lg w-full transition-colors
                ${
                  pathname === item.href
                    ? "bg-[#b955aa] text-white"
                    : "hover:bg-[#ed99bb] text-gray-600"
                }`}
            >
              <item.icon className="text-[24px] md:text-[20px] mr-0 md:mr-2" />
              <span className="hidden md:inline">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

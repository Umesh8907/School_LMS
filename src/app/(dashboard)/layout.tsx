"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/widgets/Sidebar";
import WhatsAppChat from "@/components/WhatsAppChat";
import LogoutConfirmModal from "@/components/LogoutConfirmModal";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import logo from "../../assets/Infano Logo.png";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    console.log("User logged out");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Scroll event handler for showing/hiding top navigation bar
  const controlTopBar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide top bar
        setIsTopBarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up, show top bar
        setIsTopBarVisible(true);
      }

      setLastScrollY(currentScrollY); // Update the last scroll position
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlTopBar);
      return () => {
        window.removeEventListener("scroll", controlTopBar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out z-40 bg-[#F8EBF5] w-[260px] 
        ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <Sidebar
          onLogoutClick={handleLogoutClick}
          onCloseSidebar={closeSidebar}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#faf9ff] h-full overflow-y-auto relative">
        {/* Top Bar with Hamburger Menu (Visible on mobile) */}
        <div
          className={`${
            isTopBarVisible ? "fixed" : "absolute"
          } top-0 left-0 right-0 p-4 flex items-center justify-between border-b shadow-sm bg-white z-10 transition-transform duration-300 transform ${
            isTopBarVisible ? "translate-y-0" : "-translate-y-full"
          } md:hidden`}
        >
          <Image
            src={logo}
            alt="logo"
            className="md:block w-[60px] object-contain"
          />
          <button onClick={toggleSidebar} className="text-2xl">
            <RxHamburgerMenu />
          </button>
        </div>

        {/* Extra padding to account for the fixed top bar */}
        <div className="pt-[60px]">{children}</div>

        <WhatsAppChat />

        {/* Logout Modal */}
        <LogoutConfirmModal
          isOpen={isLogoutModalOpen}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default DashboardLayout;

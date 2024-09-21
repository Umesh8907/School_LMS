'use client'
import React, { useState } from "react";
import Sidebar from "@/components/widgets/Sidebar";
import WhatsAppChat from "@/components/WhatsAppChat";
import LogoutConfirmModal from "@/components/LogoutConfirmModal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    // Handle the logout logic (e.g., clear session, redirect to login)
    console.log("User logged out");
    // Redirect to login or home page after logging out
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Close the confirmation modal
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="md:block h-full">
        <Sidebar onLogoutClick={handleLogoutClick} />
      </div>

      {/* Main content */}
      <div className="w-full bg-[#faf9ff] h-full overflow-y-auto">
        {children}
        <WhatsAppChat />

        {/* Render the logout modal over the children */}
        <LogoutConfirmModal
          isOpen={isLogoutModalOpen}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;

import WhatsAppChat from "@/components/WhatsAppChat";
import Sidebar from "@/components/widgets/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="md:block  h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-full ] bg-[#faf9ff] h-full overflow-y-auto">
        {children}
        <WhatsAppChat />
      </div>
    </div>
  );
};

export default DashboardLayout;

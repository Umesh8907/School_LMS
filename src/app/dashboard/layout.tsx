
import Sidebar from "@/components/widgets/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" md:flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;

import Expert_Panel from "@/components/dashboard_ui/Expert_Panel";
import Profile_Card from "@/components/dashboard_ui/Profile_Card";
import Assessment_History from "@/components/dashboard_ui/progess/Assessment_History";
import Chapter_Progress from "@/components/dashboard_ui/progess/Chapter_Progress";

import ProgressLayout from "@/components/dashboard_ui/progess/ProgressLayout";
import React from "react";

const page = () => {
  return (
    <div className="md:w-[96%] mx-auto  ">
      <h1>Dashboard</h1>

      <Profile_Card />
      <div className="md:flex  mt-10 md:gap-6  ">
        <ProgressLayout />
        <Expert_Panel />
      </div>
      <div className="md:flex mt-10 md:gap-4">
        <div className="w-1/2"><Chapter_Progress/></div>
        <div className="w-1/2"><Assessment_History/></div>
      </div>
    </div>
  );
};

export default page;

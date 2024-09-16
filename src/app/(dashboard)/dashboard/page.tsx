import Expert_Panel from "@/components/dashboard_ui/Expert_Panel";
import Profile_Card from "@/components/dashboard_ui/Profile_Card";
import Assessment_History from "@/components/dashboard_ui/progess/Assessment_History";
import Chapter_Progress from "@/components/dashboard_ui/progess/Chapter_Progress";

import ProgressLayout from "@/components/dashboard_ui/progess/ProgressLayout";
import Navbar from "@/components/widgets/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="md:w-[96%] w-[95%] mx-auto mb-20 ">
      
      <Navbar/>

      <Profile_Card />
      <div className="md:flex  mt-10 md:gap-6  ">
        <ProgressLayout />
        <Expert_Panel />
      </div>
      <div className="flex md:flex-row flex-col md:mt-10 md:gap-4 gap-4 mt-4">
        <div className="md:w-1/2 w-full"><Chapter_Progress/></div>
        <div className="md:w-1/2 w-full"><Assessment_History/></div>
      </div>
    </div>
  );
};

export default page;

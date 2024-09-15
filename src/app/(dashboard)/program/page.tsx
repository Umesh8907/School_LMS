import Expert_Panel from "@/components/dashboard_ui/Expert_Panel";
import Profile_Card from "@/components/dashboard_ui/Profile_Card";
import Assessment_History from "@/components/dashboard_ui/progess/Assessment_History";
import Chapter_Progress from "@/components/dashboard_ui/progess/Chapter_Progress";

import ProgressLayout from "@/components/dashboard_ui/progess/ProgressLayout";
import ModuleSlider from "@/components/program/ModuleSlider";
import Navbar from "@/components/widgets/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="md:w-[96%] w-[95%] mx-auto mb-20 ">
      <ModuleSlider/>
    </div>
  );
};

export default page;

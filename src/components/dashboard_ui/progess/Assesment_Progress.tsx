'use client'
import React, { useState } from "react";

const Assesment_Progress = () => {
    const [score, setScore] = useState(4.2)
  return ( 
    <div className="p-8 bg-[#ebf3ff] rounded-xl flex flex-col gap-6 h-full border">
      <div className="flex gap-8 justify-center items-center">
        
        <div className="w-24 h-16  rounded-md bg-blue-500 flex items-center  justify-center"   >
          {/* first word of the module title */}
         <p className="text-[36px] font-bold text-center ">
            {score}
         </p>
         
        </div>
        <span className="text-left font-semibold">Assessment Score</span>
      </div>
      <div className="flex justify-between items-center font-semibold">
        <span>Completed - 1</span>
        <span>Pending - 4</span>
      </div>
      <p className="underline font-semibold ">Check Assessment History</p>
    </div>
  );
};

export default Assesment_Progress;

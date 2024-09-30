'use client'
import React, { useState } from "react";

const Assesment_Progress = () => {
    const [score, setScore] = useState(4.2)
  return ( 
    <div className="md:p-6 p-4 bg-[#ebf3ff] rounded-xl flex flex-col md:gap-6 gap-4 h-full border md:mt-0 mt-4">
      <div className="flex  justify-between items-center gap-4">
        
        <div className="md:w-20 md:h-14 w-16 h-12  rounded-md bg-blue-500 flex items-center  justify-center "   >
          {/* first word of the module title */}
         <p className="md:text-[28px] text-[22px] font-bold text-center ">
            {score}
         </p>
         
        </div>
        <span className="text-left font-semibold">Assessment Score</span>
      </div>
      <div className="flex flex-col sm:flex-row  justify-between sm:items-center font-semibold text-sm md:text-[16px] gap-2 sm:gap-0">
        <span>Completed - 1</span>
        <span>Pending - 4</span>
      </div>
      <p className="underline font-semibold hidden sm:block ">Check Assessment History</p>
    </div>
  );
};

export default Assesment_Progress;

import Image from "next/image";
import school_girl from "@/assets/school_girl.png";
import logo from "@/assets/Infano Logo.png";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex md:h-screen w-full">
      {/* Left Side - Static */}
      
      <div className="md:w-1/2 bg-gradient-to-tr from-[#f0c8d8] to-white ">
      <Image src={logo} alt="logo" width={100} height={100}  className=" ml-16 mt-10"/>
        <div className="">
    
          <div className=" border-[2px] border-[#bea7d6] bg-white md:w-[85%] md:p-10 p-4 rounded-lg items-center relative mx-auto mt-8 md:mt-8  h-[450px]    ">
         
            <Image
              src={school_girl}
              alt=""
              className="absolute bottom-0 right-0 lg:w-[360px] sm:w-[300px] "
            />
            <div className="pr-56">
              <h1 className="text-[18px] md:text-[22px] lg:text-[28px] xl:text-[32px] text-black font-bold   sm:text-start mt-4 md:mt-5  ">
                Empowered Flow: Navigating wellness with{" "}
                <span className="text-[#652ab6]">Confidence</span>
              </h1>
              <p className="md:text-[16px] text-sm md:mt-4 mt-4">
                A Multi-Session Wellness Program for Adolescent Girls
              </p>
              <div className="  rounded-xl flex flex-col md:gap-4 gap-2 w-full mt-16 ">
                <p>
                  <strong>Designed By:</strong> Panel of Experts
                </p>
                <p>
                  <strong>Powered by:</strong> Infano.Care
                </p>
              </div>
            </div>
          </div>
          <div className="md:mt-10 md:w-[85%] mx-auto md:block hidden">
            <h1 className="text-[18px] font-bold">Testimonials</h1>
            <div className="grid grid-cols-2 justify-center gap-4 mt-4">
              <div className="flex flex-col justify-between ring-1 rounded-lg ring-[#bea7d6] p-4 bg-[#f5f0f9]">
                <p>
                  Program exceeded expectations, I didn't expect real results.
                </p>
                <div className="flex flex-col items-end mt-2">
                  <p className="font-bold text-gray-700">Keerti Jain</p>
                  <p>Raipur</p>
                </div>
              </div>
              <div className="flex flex-col justify-between ring-1 rounded-lg ring-[#bea7d6] p-4 bg-[#f5f0f9]">
                <p>
                  The program is value for money and the support team is very
                  supportive.
                </p>
                <div className="flex flex-col items-end mt-2">
                  <p className="font-bold text-gray-700">Deepika</p>
                  <p>Surat, Gujarat</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="md:w-1/2 flex justify-center items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;

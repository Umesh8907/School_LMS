import Image from "next/image";
import school_girl from "@/assets/school_girl.png";
import logo from "@/assets/Infano Logo.png";
import React from "react";
import layer from "../../assets/Vector 16.png"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex md:h-screen w-[80%] sm:w-full  mx-auto ">
      {/* Left Side - Static */}

      <div className="md:w-1/2 w-full  sm:bg-gradient-to-tr from-[#f0c8d8] to-white relative">

        <Image
          src={layer}
          alt=""
         
          className=" object-cover absolute h-screen -right-6"
        />

 
        <div className="w-full lg:w-[95%]  mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className=" sm:ml-16 sm:mt-10"
          />
          <div className="">
            <div className=" border-[1.5px] border-gray-300 bg-[#faf9ff] md:w-[85%] w-full md:p-10 p-4 rounded-lg items-center relative mx-auto mt-8 md:mt-8     ">
              <Image
                src={school_girl}
                alt=""
                className="absolute bottom-0 right-0 lg:w-[300px]  sm:w-[270px] w-[100px] "
              />
              <div className="md:pr-56">
                <h1 className="text-[12px] md:text-[22px] lg:text-[28px] xl:text-[32px] text-black font-bold   sm:text-start mt-4 md:mt-5  ">
                  Empowered Flow: Navigating wellness with{" "}
                  <span className="text-[#652ab6]">Confidence</span>
                </h1>
                <p className="md:text-[16px] text-[10px] md:mt-4 mt-4 ">
                  A Multi-Session Wellness Program for Adolescent Girls
                </p>
                <div className="  rounded-xl flex flex-col md:mt-14 lg:mt-[90px]  w-full  ">
                  <p className="text-[10px] sm:text-[16px]">
                    <strong>Designed By:</strong> Panel of Experts
                  </p>
                  <p className="text-[10px] sm:text-[16px]">
                    <strong>Powered by:</strong> Infano.Care
                  </p>
                </div>
              </div>
            </div>
            <div className="md:mt-10 lg:mt-[120px] md:w-[85%] w-full mx-auto md:block hidden">
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
      </div>
      {/* Main content */}
      <div className="md:w-1/2 flex justify-center items-center mt-8 sm:mt-0">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

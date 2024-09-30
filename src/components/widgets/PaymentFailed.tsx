"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import failed from "../../assets/failed.svg";
import { Separator } from "../ui/separator";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


const PaymentFailed = () => {
  return (
    <>
      <Card className="md:w-[65%] lg:w-[60%]  w-full mx-auto   sm:p-8 py-8 bg-[#faf9ff] flex flex-col justify-center items-center ">
        <Image
          src={failed}
          alt="Payment Success Icon"
          width={100}
          height={100}
          className="mt-5 w-56"
        />
        <h1 className="text-lg font-bold mt-4">Payment Failed</h1>
        <p className="text-center text-sm font-medium mt-4">
          Something Went Wrong We Couldn't Process Your Payment. Contact Our
          Support If You Have Lost Money
        </p>
        <button
          className="rounded-full flex mx-auto mt-8 px-8 py-2 font-semibold text-white"
          style={{ backgroundColor: "#6e4a99" }}
        >
          Retry Payment
        </button>
        <Separator className="mt-4 mb-4" />
        <p className="mt-4 font-bold">Contact Us:</p>
        <div className="flex items-center justify-around gap-4 mt-4">
          <div className="flex items-center gap-2 ">
            <FaPhoneAlt size={15} className=" text-[#6e4a99]    " />
            <p className="text-[14px]">+91 9742802062</p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdMail size={15} className=" text-[#6e4a99]  " />
            <p className="text-[14px]">infano.care@gmail.com</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PaymentFailed;

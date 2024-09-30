"use client";
import React, { useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import thankyou from "../../assets/thankyou.svg";
import loader from "../../assets/loader.gif";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import framer-motion for animations

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000); 

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [router]);

  // Motion variants for the card animation
  const cardVariants = {
    hidden: { opacity: 0, y: "100%" }, // Start position (below the screen)
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.75 },
    }, // End position
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="md:w-[65%] lg:w-[60%]  w-full mx-auto  "
    >
      <Card className="sm:p-8 bg-[#faf9ff] flex flex-col justify-center items-center p-2">
        <Image
          src={thankyou}
          alt="Payment Success Icon"
          width={100}
          height={100}
          className="mt-5 w-56"
        />
        <p className="mt-5 text-center">
          <strong>Congratulations</strong> on embarking on your empowering
          journey toward self-discovery and growth!
        </p>
        <Image
          src={loader}
          alt="Loading..."
          width={100}
          height={100}
          className="mt-8"
        />
        <p className="text-sm mb-10 text-center sm:text-left">
          We're getting your personalized profile ready just for you!
        </p>
      </Card>
    </motion.div>
  );
};

export default PaymentSuccess;

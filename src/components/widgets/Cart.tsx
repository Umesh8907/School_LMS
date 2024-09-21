"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loadScript } from "../../utils/loadscript"; // Utility to load Razorpay script
import { motion } from "framer-motion"; // Import framer-motion for animations

const Cart = () => {
  const [courseData, setCourseData] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [grade, setGrade] = useState(null); // New state to store the grade
  const [loading, setLoading] = useState(false); // Loading state for payment initiation
  const router = useRouter(); // For navigation after payment success
  const [animateOut, setAnimateOut] = useState(false); // Control for upward animation on payment success

  // Fetch the course data and grade from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRegistrationResponse(parsedData);
      setCourseData(parsedData.offeredCourses[0]); // Assuming there's one course, adjust if needed
      setGrade(parsedData.offeredCourses[0].allowedGrades); // Grade is stored at the registrationData level
    }
  }, []);

  // Function to convert duration (in minutes) to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Function to initiate payment
  const initiatePayment = async () => {
    try {
      setLoading(true);
      // Prepare the payload for order creation
      const payload = {
        userId: registrationResponse.userId, // Assuming registrationResponse has the _id field
        mandate: "once",
        isRecurring: false,
        cart: [
          {
            orderAmount: courseData.discountedPrice,
            studentId: registrationResponse.id,
            courseId: courseData.id,
            reference: "string",
          },
        ],
      };

      // Make API call to fetch order ID and payment details
      const { data } = await axios.post(
        "https://infanoapi.pocapi.in/api/Payment/CheckOut",
        payload
      );

      if (data.isSuccess) {
        const { orderId, key } = data.payload;

        // Load Razorpay script
        const razorpayScriptLoaded = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!razorpayScriptLoaded) {
          alert("Failed to load Razorpay SDK. Please try again.");
          setLoading(false);
          return;
        }

        // Configure Razorpay options
        const options = {
          key, // Razorpay API key from the backend
          amount: courseData.discountedPrice * 100, // Amount in paise (₹1 = 100 paise)
          currency: "INR",
          name: "Infano Learning", // Your brand name
          description: "Course Purchase",
          order_id: orderId, // The order ID received from the backend
          handler: async function (response) {
            console.log("Payment Success:", response);
            setAnimateOut(true);
            setTimeout(() => {
              router.push("/payment-success");
            }, 3000); // Add a 3-second delay before navigation
          },
          modal: {
            // Delay navigation after modal dismissal to avoid Razorpay cleanup issue
            ondismiss: () => {
              console.log("Payment modal closed by the user");
              setTimeout(() => {
                router.push("/payment-failed");
              }, 500); // 500ms delay to allow Razorpay to clean up its DOM elements
            },
          },
          prefill: {
            name: registrationResponse.name,
            email: registrationResponse.email,
            contact: registrationResponse.parentContact,
          },
          notes: {
            address: "Infano HQ",
          },
          theme: {
            color: "#6e4a99",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          console.log("Payment Failed:", response);
          setTimeout(() => {
            router.push("/payment-failed");
          }, 500); // Add delay to avoid runtime errors when Razorpay is cleaning up
        });
        paymentObject.open();
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("An error occurred during payment initiation.");
    } finally {
      setLoading(false);
    }
  };

  const formatGrade = (grade) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = grade % 100;
    return grade + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  // Render the grades in the desired format
  const formattedGrades = grade
    ? grade
        .map((g) => formatGrade(g))
        .join(", ")
        .replace(/,([^,]*)$/, " and$1")
    : "N/A";
  // Motion variants for entrance and exit animations
  const cardVariants = {
    hidden: { opacity: 0, y: "100%" }, // Start position (below the screen)
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.75 },
    }, // End position
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.5 } }, // Exit upward
  };

  return (
    <motion.div
      initial="hidden"
      animate={animateOut ? "exit" : "visible"}
      variants={cardVariants}
      className="md:w-[65%] lg:w-[50%] mx-auto"
    >
      <Card className=" p-4 bg-[#faf9ff]">
        {courseData ? (
          <Card>
            <div className="p-6">
              <div className="header flex gap-6 justify-around">
                <Image
                  src={`https://infanoapi.pocapi.in/api/Image/Download?folder=images&fileName=No_Image_Available.jpg&uniqueFileName=${courseData.thumbnailUniqueName}`}
                  alt={courseData.thumbnail}
                  width={200}
                  height={100}
                  className="object-cover rounded-lg w-[140px] h-[120px]"
                />
                <div>
                  <h1 className="text-[22px] font-bold">Girlhood: HerNext</h1>
                  <p className="text-sm mt-2 line-clamp-4">
                    {courseData.description}
                  </p>
                </div>
              </div>
              <div className="flex mt-8 justify-between">
                <p>
                  <strong>Duration:</strong>{" "}
                  {formatDuration(courseData.duration)}
                </p>
                <p>
                  <strong>Grade:</strong> {formattedGrades}
                </p>
              </div>
              <p className="mt-8">
                Based on your grade, you are eligible for the{" "}
                <strong>{courseData.name}</strong> course.
              </p>
              <Separator className="mt-8 mb-8 bg-gray-400" />
              <div className="w-[95%] mx-auto">
                <div className="flex justify-between">
                  <p>Program Price:</p>
                  <p>
                    <strong className="line-through text-gray-500 text-xl">
                      ₹ {courseData.price}/-
                    </strong>
                  </p>
                </div>
                <div className="flex mt-2 justify-between">
                  <p>Empowered Price:</p>
                  <p className="text-xl">
                    <strong>₹ {courseData.discountedPrice}/-</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <p>No course data available.</p>
        )}
        <div>
          <Button
            onClick={initiatePayment}
            disabled={loading}
            className="rounded-full text-xl flex mx-auto mt-8 px-8 py-6 font-bold"
            style={{ backgroundColor: "#6e4a99" }}
          >
            {loading
              ? "Processing..."
              : `Proceed to Pay | ₹ ${
                  courseData ? courseData.discountedPrice : "N/A"
                }/-`}
          </Button>
        </div>
        <p className="text-sm text-center mt-4">
          We do not share your data with 3rd parties.
        </p>
      </Card>
    </motion.div>
  );
};

export default Cart;

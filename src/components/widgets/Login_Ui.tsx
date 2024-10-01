"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { motion } from "framer-motion"; // Import framer-motion
import { useRouter } from "next/navigation"; // Import useRouter for redirect

// API endpoint to fetch country data
const COUNTRIES_API = "https://restcountries.com/v3.1/all";

// API endpoints for OTP
const BASE_URL = "https://infanoapi.pocapi.in/api"; // Set your base URL
const SEND_OTP_URL = `${BASE_URL}/Auth/sendotp?mobile_number_with_prefix=`;
const VERIFY_OTP_URL = `${BASE_URL}/Auth/verifyotp?mobile_number_with_prefix=`;

// Define the Country type
interface Country {
  code: string;
  name: string;
  flag: string;
}

// Define the API response type
interface ApiCountry {
  idd: {
    root: string;
    suffixes?: string[];
  };
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

const PhoneNumberInput: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code for India
  const [countries, setCountries] = useState<Country[]>([]); // State for storing country data
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({
    phoneNumber: "",
    otp: "",
    api: "", // For handling API errors
  });
  const [isExiting, setIsExiting] = useState(false); // New state to trigger card exit animation

  const router = useRouter(); // Initialize the Next.js router

  // Motion variants for entrance and exit animations
  const cardVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.75 },
    },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.5 } },
  };
  // Refs for OTP input fields
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fetch country data when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_API);
        const data: ApiCountry[] = await response.json();
        const countryData: Country[] = data
          .map((country) => ({
            code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
            name: country.name.common,
            flag: country.flags?.png || "", // Provide default value
          }))
          .filter((country): country is Country => !!country.code); // Type guard

        setCountries(countryData);
        setCountryCode(
          countryData.find((c) => c.code === "+91")?.code || "+91"
        ); // Set default to India
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when data is fetched
      }
    };

    fetchCountries();
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPhoneNumber(value);
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setOtp(newOtp);
    setErrors((prevErrors) => ({ ...prevErrors, otp: "" }));

    // Automatically focus next input field if current field is filled
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle focus on previous input field
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Phone number validation
  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]+$/;
    if (!phoneNumber) {
      return "Phone number is required.";
    }
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number must contain only digits.";
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      return "Phone number should be between 10 to 15 digits.";
    }
    return "";
  };

  // OTP validation
  const validateOtp = () => {
    const otpRegex = /^[0-9]+$/;
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length !== 4) {
      return "OTP must be 4 digits.";
    }
    if (!otpRegex.test(otpCode)) {
      return "OTP must contain only digits.";
    }
    return "";
  };

  // Function to send OTP
  const sendOtp = async () => {
    setIsLoading(true);
    try {
      console.log("Sending OTP to:", countryCode + phoneNumber);
      const response = await fetch(SEND_OTP_URL + countryCode + phoneNumber);
      const data = await response.json();

      console.log("Response data:", data); // Log the entire response

      if (data.payload?.status === "Success") {
        console.log("OTP sent successfully:", data.payload.details);
        setOtpRequested(true);
        setErrors((prevErrors) => ({ ...prevErrors, api: "" })); // Clear API error
      } else {
        throw new Error(data.payload?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors((prevErrors) => ({ ...prevErrors, api: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    setIsLoading(true); // Start loading
    try {
      const otpCode = otp.join(""); // Combine OTP digits into one string
      console.log("Verifying OTP:", otpCode);
      const response = await fetch(
        VERIFY_OTP_URL + countryCode + phoneNumber + "&otp=" + otpCode
      );
      const data = await response.json();

      if (data.isSuccess) {
        console.log("OTP verified successfully. Tokens:", data.payload);
        // Store tokens in cookies
        document.cookie = `accessToken=${data.payload.access_token}; path=/`;
        document.cookie = `refreshToken=${data.payload.refresh_token}; path=/`;
        setIsExiting(true); // Start exit animation

        // Redirect after animation
        setTimeout(() => {
          router.push("/register");
        }, 400); // Match the duration of the exit animation (0.4s)
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors((prevErrors) => ({ ...prevErrors, api: error.message }));
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleSubmit = () => {
    const phoneError = validatePhoneNumber();
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: phoneError }));

    if (!otpRequested) {
      if (phoneError) return; // Prevent submitting if there's an error
      sendOtp(); // Request OTP
    } else {
      const otpError = validateOtp();
      setErrors((prevErrors) => ({ ...prevErrors, otp: otpError }));

      if (phoneError || otpError) return; // Prevent submitting if there are errors
      verifyOtp(); // Submit OTP
    }
  };

  const otpVariants = {
    hidden: { opacity: 0, y: "-50%" }, // Start slightly above
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    }, // Slide down smoothly
    exit: { opacity: 0, y: "-50%", transition: { duration: 0.5 } }, // Exit upwards smoothly
  };

  return (
    <motion.div
      initial="hidden" // Start hidden (below screen)
      animate={isExiting ? "exit" : "visible"} // Animate exit when isExiting is true
      exit="exit" // Animate out (upwards) when unmounting
      variants={cardVariants}
      className="md:w-[65%] lg:w-[60%]  w-full mx-auto   "
    >
      <Card className="sm:p-4 p-0 bg-[#faf9ff]">
        <CardHeader>
          <h1 className="lg:text-[22px] md:text-[24px] text-lg underline font-semibold mb-4">
            Enter your mobile number
          </h1>
          <p className="text-[18px]">
            Please confirm your country code and enter the mobile number
          </p>
        </CardHeader>
        <CardContent>
          {/* Phone Number Input with Country Code */}
          <div className="mb-6">
            <div className="flex items-center mt-6 gap-2 ">
              {/* Country Code Selector */}
              <div className="flex items-center border border-gray-300 rounded-md ">
                {countries.length > 0 && (
                  <Select
                    onValueChange={(value) => setCountryCode(value)}
                    defaultValue={countryCode}
                  >
                    <SelectTrigger
                      className="flex items-center appearance-none  h-12 sm:text-xl bg-white"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        border: "none",
                      }} // Cross-browser support
                    >
                      <span className="flex items-center">
                        <img
                          src={
                            countries.find((c) => c.code === countryCode)?.flag
                          }
                          alt="Country flag"
                          className="w-4 sm:flex hidden"
                        />
                      </span>
                      <SelectValue>{countryCode}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="flex ">
                      {countries.map((country) => (
                        <SelectItem
                          key={`${country.code}-${country.name}`} // Ensure unique key by combining code and name
                          value={country.code}
                          className=" items-center"
                        >
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-6 h-4 mr-2"
                            loading="lazy"
                          />
                          <span>
                            {country.name} ({country.code})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className=" h-12 sm:text-xl text-lg  bg-white"
                />
              </div>
            </div>
            {/* Phone Number Error */}
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-2">{errors.phoneNumber}</p>
            )}
            {/* API Error */}
            {errors.api && (
              <p className="text-red-600 text-sm mt-2">{errors.api}</p>
            )}
          </div>

          {/* OTP Input Field */}
          {otpRequested && (
            <motion.div
              initial="hidden" // Start hidden (above screen)
              animate="visible" // Animate in when OTP is requested
              exit="exit" // Animate out when component unmounts
              variants={otpVariants} // Apply defined motion variants
              className=""
            >
              <div className="mb-6">
                <Label className="text-lg text-gray-500">Enter OTP</Label>
                <div className="flex space-x-2 mt-2  items-end">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (otpRefs.current[index] = el || null)} // Corrected ref callback
                      className="text-center w-14 h-12  bg-white text-lg"
                    />
                  ))}
                  <p className="text-[#6e4a99] underline">Resend OTP</p>
                </div>

                {/* OTP Error */}
                {errors.otp && (
                  <p className="text-red-600 text-sm mt-2">{errors.otp}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="rounded-full text-xl flex mx-auto mt-8 px-6 py-2 font-bold text-white"
              style={{ backgroundColor: "#6e4a99" }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading
                ? "Loading..."
                : otpRequested
                ? "Submit"
                : "Request For OTP"}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PhoneNumberInput;

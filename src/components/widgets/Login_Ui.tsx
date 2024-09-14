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
import { Button } from "../ui/button";

// API endpoint to fetch country data
const COUNTRIES_API = "https://restcountries.com/v3.1/all";

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
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [errors, setErrors] = useState({
    phoneNumber: "",
    otp: "",
  });

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

  const handleSubmit = () => {
    const phoneError = validatePhoneNumber();
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: phoneError }));

    if (!otpRequested) {
      if (phoneError) return; // Prevent submitting if there's an error
      // Request OTP logic
      setOtpRequested(true);
    } else {
      const otpError = validateOtp();
      setErrors((prevErrors) => ({ ...prevErrors, otp: otpError }));

      if (phoneError || otpError) return; // Prevent submitting if there are errors

      // Submit OTP logic
      const otpCode = otp.join(""); // Combine OTP digits into one string
      console.log("Submitting OTP:", otpCode);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-10 bg-[#faf9ff]">
      <CardHeader>
        <h1 className="lg:text-[22px] underline font-semibold mb-4">
          Enter your mobile number
        </h1>
        <p className="text-[18px]">
          Please confirm your country code and enter the mobile number
        </p>
      </CardHeader>
      <CardContent>
        {/* Phone Number Input with Country Code */}
        <div className="mb-6">
          <div className="flex items-center mt-6">
            {/* Country Code Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              {countries.length > 0 && (
                <Select
                  onValueChange={(value) => setCountryCode(value)}
                  defaultValue={countryCode}
                >
                  <SelectTrigger
                    className="flex items-center appearance-none"
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
                        className="w-4"
                      />
                    </span>
                    <SelectValue>{countryCode}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="flex">
                    {countries.map((country) => (
                      <SelectItem
                        key={`${country.code}-${country.name}`} // Ensure unique key by combining code and name
                        value={country.code}
                        className="flex items-center"
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
                className="w-full"
              />
            </div>
          </div>
          {/* Phone Number Error */}
          {errors.phoneNumber && (
            <p className="text-red-600 text-sm mt-2">{errors.phoneNumber}</p>
          )}
        </div>

        {/* OTP Input Field */}
        {otpRequested && (
          <div className="mb-6">
            <Label>Enter OTP</Label>
            <div className="flex space-x-2 mt-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (otpRefs.current[index] = el || null)} // Corrected ref callback
                  className="text-center w-12"
                />
              ))}
            </div>
            {/* OTP Error */}
            {errors.otp && (
              <p className="text-red-600 text-sm mt-2">{errors.otp}</p>
            )}
          </div>
        )}

        {/* Button */}
        <Button
          onClick={handleSubmit}
          className="w-full mt-4"
          style={{ backgroundColor: "#6e4a99" }}
        >
          {otpRequested ? "Submit" : "Request For OTP"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhoneNumberInput;

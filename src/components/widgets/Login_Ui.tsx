"use client";
import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineMobile } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

const PhoneNumberInput: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code for India
  const [countries, setCountries] = useState<any[]>([]); // State for storing country data
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Fetch country data when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_API);
        const data = await response.json();
        const countryData = data
          .map((country: any) => ({
            code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
            name: country.name.common,
            flag: country.flags?.png, // Flag URL
          }))
          .filter((country: any) => country.code); // Filter out countries without calling codes

        setCountries(countryData);
        setCountryCode(
          countryData.find((c) => c.code === "+91")?.code || "+91"
        ); // Set default to India
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    if (!otpRequested) {
      // Request OTP logic
      setOtpRequested(true);
    } else {
      // Submit OTP logic
      const otpCode = otp.join(""); // Combine OTP digits into one string
      console.log("Submitting OTP:", otpCode);
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Login with Phone Number</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Phone Number Input with Country Code */}
        <div className="mb-4">
          <Label>Phone Number</Label>
          <div className="flex items-center mt-2 ">
            {/* Country Code Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              {countries.length > 0 && (
                <Select
                  onValueChange={(value) => setCountryCode(value)}
                  defaultValue={countryCode}
                >
                  <SelectTrigger
                    className="flex items-center pl-2 pr-1 h-full w-24 appearance-none"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      border: "none",
                    }} // Cross-browser support
                  >
                    <span className="mr-2 flex items-center">
                      <img
                        src={
                          countries.find((c) => c.code === countryCode)?.flag
                        }
                        alt="Country flag"
                        className="w-6 h-4"
                      />
                    </span>
                    <SelectValue>{countryCode}</SelectValue>
                    <FiChevronDown className="ml-1" />
                  </SelectTrigger>
                  <SelectContent className="flex flex-col">
                    {countries.map((country) => (
                      <SelectItem
                        key={country.code}
                        value={country.code}
                        className="flex items-center p-2"
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-6 h-4 mr-2"
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
              <AiOutlineMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* OTP Input Field */}
        {otpRequested && (
          <div className="mb-4">
            <Label>Enter OTP</Label>
            <div className="flex space-x-2 mt-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="text-center w-12"
                />
              ))}
            </div>
          </div>
        )}

        {/* Button */}
        <Button onClick={handleSubmit} className="w-full mt-4">
          {otpRequested ? "Submit" : "Request For OTP"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhoneNumberInput;

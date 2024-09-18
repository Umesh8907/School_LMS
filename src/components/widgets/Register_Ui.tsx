"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios"; // axios for API requests
import { useRegistration } from "@/context/RegistrationContext";

// Helper function to calculate age based on DOB
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Helper function for validation
const validateProfile = ({
  name,
  email,
  dob,
  grade,
  school,
  contact,
}: {
  name: string;
  email: string;
  dob: string;
  grade: string;
  school: string;
  contact: string;
}) => {
  const errors: { [key: string]: string } = {};
  const gradeAgeRanges = {
    
    "6": [11, 14],
    "7": [12, 15],
    "8": [13, 18],
    "9": [15, 20],
    "10": [15, 16],
    "11": [16, 17],
    "12": [17, 20],
  };

  if (!name) errors.name = "Full name is required.";
  if (!email) errors.email = "Email address is required.";
  else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email))
    errors.email = "Invalid email address.";
  if (!dob) errors.dob = "Date of birth is required.";
  if (!grade) errors.grade = "Grade is required.";
  if (!school) errors.school = "School/Institution name is required.";
  if (!contact)
    errors.contact = "Parent/Guardian contact details are required.";
  else if (!/^\d{10}$/.test(contact))
    errors.contact = "Contact number must be 10 digits.";

  if (dob && grade) {
    const age = calculateAge(dob);
    const ageRange = gradeAgeRanges[grade];
    if (ageRange && (age < ageRange[0] || age > ageRange[1])) {
      errors.grade = `For Grade ${grade}, age must be between ${ageRange[0]} and ${ageRange[1]}. Your age is ${age}.`;
    }
  }

  return errors;
};

const Register_Ui: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { setRegistrationData } = useRegistration(); // use the context to store data

  // Generate date options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleSubmit = async () => {
    // Ensure month and day are in two-digit format (e.g., 01, 09)
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");
    const dob = `${year}-${formattedMonth}-${formattedDay}`; // YYYY-MM-DD format

    const validationErrors = validateProfile({
      name,
      email,
      dob,
      grade,
      school,
      contact,
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Data structure to match the API requirements
        const requestData = {
          name,
          email,
          dateOfBirth: dob, // formatted in YYYY-MM-DD
          grade: parseInt(grade), // Ensure grade is a number
          institution: school, // Assuming school is the institution name
          parentContact: contact, // Assuming contact is a string
        };

        // Sending the POST request to the API
        const response = await axios.post(
          "https://infanoapi.pocapi.in/api/Student/Create",
          requestData
        );

        if (response.data.isSuccess) {
          setRegistrationData(response.data.payload); // Store response data in context
          console.log("Registration successful", response.data.payload);
        } else {
          console.error("Registration failed", response.data.messages);
        }
      } catch (error) {
        console.error("API error", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 bg-[#faf9ff]">
      <CardContent>
        <h1 className="lg:text-[22px] underline font-semibold">
          Profile Details
        </h1>
        <p className="mt-4 text-[18px]">
          Complete your profile to get course access
        </p>
        <div className="mt-4 flex flex-col gap-4">
          {/* Full Name */}
          <label className="text-sm font-semibold">Full Name</label>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          {/* Email */}
          <label className="text-sm font-semibold">Email Address</label>
          <Input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

          {/* Date of Birth */}
          <label className="text-sm font-semibold">Date of Birth</label>
          <div className="flex gap-4">
            {/* Day */}
            <Select onValueChange={setDay} defaultValue={day}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={`${d}`}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Month */}
            <Select onValueChange={setMonth} defaultValue={month}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, index) => (
                  <SelectItem key={index} value={`${index + 1}`}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year */}
            <Select onValueChange={setYear} defaultValue={year}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={`${y}`}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}

          {/* Grade */}
          <label className="text-sm font-semibold">Grade</label>
          <Select onValueChange={setGrade} defaultValue={grade}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(7).keys()].map((i) => (
                <SelectItem key={i + 6} value={`${i + 6}`}>
                  {`Grade ${i + 6}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-red-600 text-sm">{errors.grade}</p>
          )}

          {/* School */}
          <label className="text-sm font-semibold">
            School/Institution Name
          </label>
          <Input
            type="text"
            placeholder="School/Institution Name"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full bg-white"
          />
          {errors.school && (
            <p className="text-red-600 text-sm">{errors.school}</p>
          )}

          {/* Contact */}
          <label className="text-sm font-semibold">
            Parent/Guardian Contact Details
          </label>
          <Input
            type="text"
            placeholder="Parent/Guardian Contact Details"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full bg-white"
          />
          {errors.contact && (
            <p className="text-red-600 text-sm">{errors.contact}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="bg-[#6e4a99] text-white font-bold rounded-full px-12 py-2 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <p className="mt-6">
            By submitting the profile details, I agree to the{" "}
            <span className="underline">Terms & Conditions {"  "}</span>
            and <span className="underline">Privacy Policy</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register_Ui;

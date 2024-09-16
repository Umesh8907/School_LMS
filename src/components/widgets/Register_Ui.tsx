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
    "1": [6, 7],
    "2": [7, 8],
    "3": [8, 9],
    "4": [9, 10],
    "5": [10, 11],
    "6": [11, 12],
    "7": [12, 13],
    "8": [13, 14],
    "9": [14, 15],
    "10": [15, 16],
    "11": [16, 17],
    "12": [17, 18],
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

  // Generate date options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = () => {
    const dob = `${year}-${month}-${day}`;
    const validationErrors = validateProfile({
      name,
      email,
      dob,
      grade,
      school,
      contact,
    });
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully");
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
        <p className="mt-4 text-[18px]">Complete your profile to get course access</p>
        <div className="mt-4 flex flex-col gap-6">
          {/* Full Name */}
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          {/* Email */}
          <Input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          {/* Date of Birth */}
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
          <Select onValueChange={setGrade} defaultValue={grade}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12).keys()].map((i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {`Grade ${i + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.grade && <p className="text-red-600 text-sm">{errors.grade}</p>}

          {/* School */}
          <Input
            type="text"
            placeholder="School/Institution Name"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full bg-white"
          />
          {errors.school && <p className="text-red-600 text-sm">{errors.school}</p>}

          {/* Contact */}
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
          {/* <Button
            onClick={handleSubmit}
            className="w-full mt-6"
            style={{ backgroundColor: "#6e4a99" }}
          >
            Submit
          </Button> */}
          <div className="flex justify-center">
          <button className="bg-[#6e4a99] text-white font-bold rounded-full px-12 py-2 "  onClick={handleSubmit}>
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

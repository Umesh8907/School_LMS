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
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

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

  if (dob && grade) {
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < gradeAgeRanges[grade][0] || age > gradeAgeRanges[grade][1]) {
      errors.dob = `Date of birth does not match the selected grade. Expected age for grade ${grade} is between ${gradeAgeRanges[grade][0]} and ${gradeAgeRanges[grade][1]}.`;
    }
  }

  return errors;
};

const Register_Ui: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const validationErrors = validateProfile({
      name,
      email,
      dob: dob ? dob.toISOString().split("T")[0] : "",
      grade,
      school,
      contact,
    });
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission
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
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

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

          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={(date) => {
                    setDob(date);
                    // Close the popover when a date is selected
                  }}
                />
              </PopoverContent>
            </Popover>

            <Select
              onValueChange={(value) => setGrade(value)}
              defaultValue={grade}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12).keys()].map((i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.grade && (
              <p className="text-red-600 text-sm">{errors.grade}</p>
            )}
          </div>
          {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
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
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full mt-6"
          style={{ backgroundColor: "#6e4a99" }}
        >
          Submit
        </Button>
        <p className="mt-6">
          By submitting the profile details, I agree to the{" "}
          <span className="underline">Terms & Conditions {"  "}</span>
          and <span className="underline">Privacy Policy</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default Register_Ui;

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
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import Link from "next/link";

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
    "6": [10, 14],
    "7": [11, 15],
    "8": [12, 16],
    "9": [13, 17],
    "10": [13, 18],
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
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Next.js router for navigation

  const handleFieldChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear the error message for the specific field
    }));
  };

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
    setLoading(true); // Show loading spinner while processing the request

    const monthNames = [
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
    const monthIndex = monthNames.indexOf(month);
    const formattedMonth = (monthIndex + 1).toString().padStart(2, "0");

    const formattedDay = day.padStart(2, "0");
    const dob = `${year}-${formattedMonth}-${formattedDay}`;

    const validationErrors = validateProfile({
      name,
      email,
      dob,
      grade,
      school,
      contact,
    });

    setErrors({});

    if (Object.keys(validationErrors).length === 0) {
      try {
        const requestData = {
          userId: "66ea8f4cd2586ff84ffb523f", // Hard-coded userId
          name,
          email,
          dateOfBirth: dob,
          grade: parseInt(grade),
          institution: school,
          parentContact: contact,
        };

        const response = await axios.post(
          "https://infanoapi.pocapi.in/api/Student/Create",
          requestData
        );

        if (response.data.isSuccess) {
          setErrors({});
          setLoading(false);
          setShowPopover(true);

          // Store registration data in localStorage
          localStorage.setItem(
            "registrationData",
            JSON.stringify(response.data.payload)
          );

          setTimeout(() => {
            router.push("/purchase");
          }, 3000);
        } else if (response.data.messages) {
          const backendErrorString = response.data.messages.join(", ");
          setErrors({ general: backendErrorString });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          const responseError = error.response?.data || {};
          const errorMessage =
            responseError.messages?.join(", ") ||
            responseError.message ||
            "An error occurred.";
          setErrors({ general: errorMessage });
        } else {
          setErrors({ general: "An unexpected error occurred." });
        }
      }
    } else {
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  return (
    <Card className="w-[60%] mx-auto mt-10 p-6 bg-[#faf9ff]">
      <CardContent>
        <h1 className="lg:text-[22px] underline font-semibold">
          Profile Details
        </h1>
        <p className="mt-4 text-[18px]">
          Complete your profile to get course access
        </p>
        <div className="mt-4 flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleFieldChange("name", e.target.value);
            }}
            className="w-full bg-white"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <Input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleFieldChange("email", e.target.value);
            }}
            className="w-full bg-white"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

<label className="text-sm font-semibold text-gray-500">Date of Birth</label>
          <div className="flex gap-4">
          
            <Select
              onValueChange={(value) => {
                setDay(value);
                handleFieldChange("dob", value);
              }}
              defaultValue={day}
            >
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

            <Select
              onValueChange={(value) => {
                setMonth(value);
                handleFieldChange("dob", value);
              }}
              defaultValue={month}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={`${m}`}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                setYear(value);
                handleFieldChange("dob", value);
              }}
              defaultValue={year}
            >
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

          <Select
            onValueChange={(value) => {
              setGrade(value);
              handleFieldChange("grade", value);
            }}
            defaultValue={grade}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">Grade 6</SelectItem>
              <SelectItem value="7">Grade 7</SelectItem>
              <SelectItem value="8">Grade 8</SelectItem>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-red-600 text-sm">{errors.grade}</p>
          )}

          <Input
            type="text"
            placeholder="School/Institution"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              handleFieldChange("school", e.target.value);
            }}
            className="w-full bg-white"
          />
          {errors.school && (
            <p className="text-red-600 text-sm">{errors.school}</p>
          )}

          <Input
            type="text"
            placeholder="Parent/Guardian Contact Number"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              handleFieldChange("contact", e.target.value);
            }}
            className="w-full bg-white"
          />
          {errors.contact && (
            <p className="text-red-600 text-sm">{errors.contact}</p>
          )}

          {errors.general && (
            <p className="text-red-600 text-sm">{errors.general}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full text-xl flex mx-auto mt-8 px-14 py-6 font-bold"
          style={{ backgroundColor: "#6e4a99" }}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </Button>
        <p className="text-sm text-left text-gray-500 mt-4">By submitting the profile details, I agree to the <Link href="https://infano.care/policy/#agreement" target="_blank" rel="noopener noreferrer"><span className="underline">Terms & Conditions</span></Link> and <Link href="https://infano.care/policy/#want"><span className="underline">Privacy Policy</span></Link></p>

        {showPopover && (
          <Popover open={true}>
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
            <PopoverContent>
              Profile updated! You will be redirected shortly.
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
};

export default Register_Ui;

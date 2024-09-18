'use client'
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
import { useRegistration } from "@/context/RegistrationContext";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";

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
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setRegistrationData } = useRegistration(); // use the context to store data
  const router = useRouter(); // Next.js router for navigation

  const handleFieldChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear the error message for the specific field
    }));
  };
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
  setLoading(true); // Show loading spinner while processing the request

  // Convert month name to numeric format
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

  // Format day and year
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

  // Clear previous errors before validating
  setErrors({});

  if (Object.keys(validationErrors).length === 0) {
    try {
      const requestData = {
        name,
        email,
        dateOfBirth: dob,
        grade: parseInt(grade),
        institution: school,
        parentContact: contact,
      };

      console.log("Sending request with data: ", requestData); // Debugging

      const response = await axios.post(
        "https://infanoapi.pocapi.in/api/Student/Create",
        requestData
      );

      console.log("API Response: ", response.data); // Debugging

      if (response.data.isSuccess) {
        setErrors({});
        setRegistrationData(response.data.payload); // Store registration data in context
        setLoading(false);
        console.log("Registration successful", response.data.payload);
        setShowPopover(true); // Show popover on success
        setTimeout(() => {
          router.push("/purchase"); // Navigate to /purchase after delay
        }, 3000); // 3 seconds delay before redirecting
      } else if (response.data.messages) {
        const backendErrorString = response.data.messages.join(", ");
        setErrors({ general: backendErrorString }); // Display backend errors as general error
        console.log("Backend validation errors: ", backendErrorString); // Debugging
        setLoading(false); // Stop loading if error occurs
      }
    } catch (error) {
      setLoading(false); // Stop loading if error occurs

      // Handle Axios errors (network issues, server errors)
      console.error("Error during request:", error); // Debugging: Log the error details

      if (axios.isAxiosError(error)) {
        const responseError = error.response?.data || {};
        const errorMessage =
          responseError.messages?.join(", ") ||
          responseError.message ||
          "An error occurred.";
        setErrors({ general: errorMessage }); // Display general error message
        console.log("Error message from API: ", errorMessage); // Debugging
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  } else {
    setErrors(validationErrors); // Show frontend validation errors
    setLoading(false); // Stop loading if validation fails
    console.log("Validation errors: ", validationErrors); // Debugging
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
            onChange={(e) => {
              setName(e.target.value);
              handleFieldChange("name", e.target.value);
            }}
            className="w-full bg-white"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          {/* Email */}
          <label className="text-sm font-semibold">Email Address</label>
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

          {/* Date of Birth */}
          <label className="text-sm font-semibold">Date of Birth</label>
          <div className="flex gap-4">
            {/* Day */}
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

            {/* Month */}
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

            {/* Year */}
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

          {/* Grade */}
          <label className="text-sm font-semibold">Grade</label>
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
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-red-600 text-sm">{errors.grade}</p>
          )}

          {/* School */}
          <label className="text-sm font-semibold">School/Institution</label>
          <Input
            type="text"
            placeholder="School/Institution Name"
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

          {/* Contact */}
          <label className="text-sm font-semibold">
            Parent/Guardian Contact Number
          </label>
          <Input
            type="text"
            placeholder="Contact Number"
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

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              "Submit and Continue"
            )}
          </Button>

          {/* Popover on successful registration */}
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild></PopoverTrigger>
            <PopoverContent className="p-6 bg-white">
              <h2 className="text-lg font-semibold">
                Registration Successful!
              </h2>
              <p className="mt-2">
                Redirecting to the purchase page in a few seconds...
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register_Ui;

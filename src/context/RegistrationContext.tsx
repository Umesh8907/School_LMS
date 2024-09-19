"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define the context and its type
interface RegistrationData {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  grade: number;
  institution: string;
  parentContact: string;
  offeredCourses: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discountedPrice: number;
    duration: number;
    certificate: string;
  }>;
}

interface RegistrationContextType {
  registrationData: RegistrationData | null;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegistrationData | null>
  >;
}

// Create the context
const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

// Provider component
export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  return (
    <RegistrationContext.Provider
      value={{ registrationData, setRegistrationData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// Custom hook to use the context
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};

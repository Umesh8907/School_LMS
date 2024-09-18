'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  setRegistrationData: (data: RegistrationData) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Custom hook to use the context
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

// Provider component
export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

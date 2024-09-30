import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Using react-icons for the WhatsApp icon

const WhatsAppChat: React.FC = () => {
  const phoneNumber = "1234567890"; // Replace with your WhatsApp number
  const message = "Hello, I need help!"; // Replace with the default message you want to send

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center md:w-auto md:h-auto w-160 h-w-160 bg-[#25D366] hover:bg-[#1d8f47] rounded-full shadow-lg hover:shadow-xl duration-200 px-4 py-2 transition-all"
    >
      <FaWhatsapp className="text-white sm:text-3xl text-3xl  md:mr-2" />
      <p className="hidden md:block text-white text-sm font-semibold">
        Chat with Us
      </p>
    </Link>
  );
};

export default WhatsAppChat;

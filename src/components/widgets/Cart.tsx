'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loadScript } from '../../utils/loadscript'; // Utility to load Razorpay script

const Cart = () => {
  const [courseData, setCourseData] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [grade, setGrade] = useState(null); // New state to store the grade
  const [loading, setLoading] = useState(false); // Loading state for payment initiation
  const router = useRouter(); // For navigation after payment success

  console.log(courseData);

  // Fetch the course data and grade from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRegistrationResponse(parsedData);
      console.log(parsedData);
      // Extract course and grade data
      setCourseData(parsedData.offeredCourses[0]); // Assuming there's one course, adjust if needed
      setGrade(parsedData.grade); // Grade is stored at the registrationData level
    }
  }, []);

  // Function to convert duration (in minutes) to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Function to initiate payment
  const initiatePayment = async () => {
    try {
      setLoading(true);
      // Prepare the payload for order creation
      const payload = {
        userId: registrationResponse.userId, // Assuming registrationResponse has the _id field
        mandate: 'once',
        isRecurring: false,
        cart: [
          {
            orderAmount: courseData.discountedPrice,
            studentId: registrationResponse.id,
            courseId: courseData.id,
            reference: 'string',
          },
        ],
      };

      // Make API call to fetch order ID and payment details
      const { data } = await axios.post(
        'https://infanoapi.pocapi.in/api/Payment/CheckOut',
        payload
      );

      if (data.isSuccess) {
        const { orderId, key, customerId } = data.payload;
        console.log(data.payload);

        // Load Razorpay script
        const razorpayScriptLoaded = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
        if (!razorpayScriptLoaded) {
          alert('Failed to load Razorpay SDK. Please try again.');
          setLoading(false);
          return;
        }

        // Configure Razorpay options
        const options = {
          key: key, // Razorpay API key from the backend
          amount: courseData.discountedPrice * 100, // Amount in paise (₹1 = 100 paise)
          currency: 'INR',
          name: 'Infano Learning', // Your brand name
          description: 'Course Purchase',
          order_id: orderId, // The order ID received from the backend
          handler: async function (response) {
            console.log('Payment Success:', response);
            alert('Payment Successful!');

            // Navigate to success page or handle post-payment logic here
            router.push('/dashboard');
          },
          prefill: {
            name: registrationResponse.name,
            email: registrationResponse.email,
            contact: registrationResponse.parentContact,
          },
          notes: {
            address: 'Infano HQ',
          },
          theme: {
            color: '#6e4a99',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('An error occurred during payment initiation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-10 p-4 bg-[#faf9ff]">
      {courseData ? (
        <Card>
          <div className="p-4">
            <div className="header flex gap-4 justify-around">
              <Image
                src={`https://infanoapi.pocapi.in/api/Image/Download?folder=images&fileName=No_Image_Available.jpg&uniqueFileName=${courseData.thumbnailUniqueName}&width=100&height=100`} // Replace with an actual fallback image if needed
                alt={courseData.thumbnail}
                className="w-24 rounded-lg"
                width={100} // Adjust dimensions as needed
                height={100}
              />
              <div>
                <h1 className="text-[22px] font-bold">{courseData.name}</h1>
                <p className="text-sm mt-2">{courseData.description}</p>
              </div>
            </div>
            <div className="flex mt-4 justify-between">
              <p>
                <strong>Duration:</strong> {formatDuration(courseData.duration)}
              </p>
              <p>
                <strong>Grade:</strong> {grade || 'N/A'}
              </p>
            </div>
            <p className="mt-4">
              Based on your grade, you are eligible for the {courseData.name} course.
            </p>
            <Separator className="mt-6 mb-4 bg-gray-400" />
            <div>
              <div className="flex justify-between">
                <p>Program Price:</p>
                <p>
                  <strong className="line-through text-gray-500">
                    ₹ {courseData.price}/-
                  </strong>
                </p>
              </div>
              <div className="flex mt-4 justify-between">
                <p>Empowered Price:</p>
                <p>
                  <strong>₹ {courseData.discountedPrice}/-</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <p>No course data available.</p>
      )}
      <Button
        onClick={initiatePayment}
        disabled={loading}
        className="w-full mt-6"
        style={{ backgroundColor: '#6e4a99' }}
      >
        {loading ? 'Processing...' : `Proceed to Pay | ₹ ${courseData ? courseData.discountedPrice : 'N/A'}/-`}
      </Button>
      <p className="text-sm text-center mt-4">
        We do not share your data with third parties.
      </p>
    </Card>
  );
};

export default Cart;

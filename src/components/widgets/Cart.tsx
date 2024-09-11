import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image';
import course1_image from '../../assets/Course1.jpg'
import { Separator } from "@/components/ui/separator";
import { Button } from '../ui/button';


const Cart = () => {
  return (
    <Card className="w-[400px] mx-auto mt-10 p-4 bg-[#faf9ff]">
      <Card>
        <div className="p-4">
          <div className="header flex  gap-4">
            <Image
              src={course1_image}
              alt="course1"
              className="w-32 h-32 rounded-lg"
            />
            <div>
              <h1 className="text-[22px] font-bold">Girlhood: HerNext</h1>
              <p>A Multi-Session Wellness Program for Adolescent Girls</p>
            </div>
          </div>
          <div className="flex mt-4 justify-between">
            <p>
              <strong>Duration:</strong> 10 Hours
            </p>
            <p>
              <strong>Grade:</strong> 6th, 7th or 8th
            </p>
          </div>
          <p className="mt-4">
            Based on the grade you are eligible for the Girlhood: HerNext course
          </p>
          <Separator className="mt-6 mb-4 bg-gray-400" />
          <div className="flex  ">
            <p className="mr-20">Program Price:</p>
            <p>
              <strong>₹ 999/-</strong>
            </p>
          </div>
          <div className="flex  mt-4">
            <p className="mr-20">Program Price:</p>
            <p>
              <strong>₹ 499/-</strong>
            </p>
          </div>
        </div>
      </Card>
      <Button
       
        className="w-full mt-6"
        style={{ backgroundColor: "#6e4a99" }}
      >
        Submit
      </Button>
    </Card>
  );
}

export default Cart

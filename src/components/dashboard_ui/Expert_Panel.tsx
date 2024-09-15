import React from "react";
import expert_1 from "../../assets/experts/1.png";
import expert_2 from "../../assets/experts/2.png";
import expert_3 from "../../assets/experts/3.png";
import Image from "next/image";

const Experts = [
  {
    id: 1,
    name: "Jasika Makhija",
    designation: "Gynaecologist",
    about: "Provides accurate medical information on menstruation and hygiene",
    image_url: expert_1,
  },
  {
    id: 2,
    name: "Jasika Makhija",
    designation: "Gynaecologist",
    about: "Provides accurate medical information on menstruation and hygiene",
    image_url: expert_2,
  },
  {
    id: 3,
    name: "Jasika Makhija",
    designation: "Gynaecologist",
    about: "Provides accurate medical information on menstruation and hygiene",
    image_url: expert_3,
  },
];

const Expert_Panel = () => {
  return (
    <div className=" w-[28%] rounded-xl flex flex-col md:gap-4 ">
      <h1>
        <strong>Experts -</strong> designed the course
      </h1>

      {Experts.map((experts, index) => {
        return (
          <div
            key={index}
            className="bg-[#f4f2ff] p-4 rounded-xl shadow-sm flex flex-col gap-4 border-2"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={experts.image_url}
                alt={experts.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{experts.name}</p>
                <p className="text-sm text-gray-700">{experts.designation}</p>
              </div>
            </div>
            <p className="text-sm">{experts.about}</p>
            <div className="flex justify-end">
              <button className=" bg-[#bea7d6] text-[#652ab6] px-4 py-1 rounded-full font-semibold ">
                Book a Consultation
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Expert_Panel;

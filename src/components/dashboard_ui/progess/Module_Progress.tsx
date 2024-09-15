import React from "react";

// Define TypeScript types for module data
interface ModuleType {
  id: number;
  title: string;
  subtitle: string;
  status: "In-progress" | "Pending";
  duration: string;
  color?: string; // Optional Hexadecimal color code
  statusColour?: string; // Optional Hexadecimal color code for status bar
  iconColor?: string; // Optional Hexade
}

// Sample module data
const modules: ModuleType[] = [
  {
    id: 1,
    title: "Understanding Menstruation",
    subtitle: "Expert: Gynecologist",
    status: "In-progress",
    duration: "2 Hours",
    color: "#f7f0f3",
    statusColour: "#f7d3e1",
    iconColor: "#ed99bb"
  },
  {
    id: 2,
    title: "Menstrual Hygiene",
    subtitle: "Expert: Gynecologist",
    status: "Pending",
    duration: "2 Hours",
    color: "#f5f0f9",
    statusColour: "#bea7d6",
    iconColor: "#bea7d6"
  },
  {
    id: 3,
    title: "Nutrition and Menstruation",
    subtitle: "Expert: Nutritionist",
    status: "In-progress",
    duration: "1 Hour 30 Minutes",
    color: "#ebf3ff",
    statusColour: "#b7d0f9",
    iconColor: "#4686f2"
  },
  {
    id: 4,
    title: "Managing Menstrual Discomfort",
    subtitle: "Expert: Gynecologist",
    status: "In-progress",
    duration: "2 Hours",
    color: "#f2fff9",
    statusColour: "#b1dec8",
    iconColor: "#79c5a0"
  },
  {
    id: 5,
    title: "Safety and Well-being",
    subtitle: "Expert: Psychologist",
    status: "In-progress",
    duration: "3 Hours",
    color: "#f9e8f7",
    statusColour: "#e9a8e0",
    iconColor: "#b955aa"
  },
];

const ModuleProgress: React.FC = () => {
  return (
    <div className="border-2  md:p-4 p-2 flex flex-col gap-4 rounded-xl bg-white md:mt-0 mt-4">
      {modules.map((mod) => (
        <div
          key={mod.id}
          className="rounded-sm  p-2 flex  items-center justify-between border"
          style={{ backgroundColor: mod.color || "#ffffff" }} // Apply dynamic background color
        >
         <div className="flex items-center md:gap-4" >
          <div className="md:w-14 md:h-14  rounded-md flex justify-center items-center"   style={{ backgroundColor: mod.iconColor || "#ffffff" }}>
          {/* first word of the module title */}
         <p className="md:text-[32px] font-bold text-center hidden md:block"> {mod.title.charAt(0)}</p>
          </div>
         <div className="">
             
             <h3 className=" text-[12px] md:text-[16px]">{mod.title}</h3>
             <p className="text-[10px] md:text-sm text-gray-600">{`${mod.subtitle} | ${mod.duration}`}</p>
         
         </div>
         </div>
          <div
            className=" px-2 py-1 bg-[#f7d3e1] md:w-[100px] rounded "
            style={{ backgroundColor: mod.statusColour || "#ffffff" }}
          >
            <p className={`md:text-sm text-center text-[10px] `}>{mod.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleProgress;

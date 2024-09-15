 // Ensure the path is correct

import Image from "next/image";
import { GrScorecard } from "react-icons/gr";

import profile from '../../assets/profile.jpg'

const Profile_Card = () => {
  return (
    <div className="md:px-20 sm:py-8 p-4 bg-[#f4f2ff] rounded-lg ring-1 ring-gray-300 relative shadow-[5px_5px_0px_0px_rgba(245,229,235)]">
      <div className="md:flex justify-between">
        <div className="left">
          <p>Hi Sarah! Welcome to your wellness care</p>
          <h1 className="font-bold md:text-[24px] mt-4 text-[18px] text-center md:text-left">
            And now that you don't have to be perfect, you can be goods
          </h1>
          <div>
            <button className="bg-white rounded-full  px-4 py-2 md:flex gap-2 items-center justify-center mt-6 shadow-lg hidden">
              <p className="font-semibold">Check wellness scores</p>
              <GrScorecard />
            </button>
          </div>
        </div>
        <div className="right flex flex-col justify-center items-center gap-4 md:mt-0 mt-4">
          <Image
            src={profile}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-[#b955aa]"
          />
          <p className="font-semibold">Sarah Jones</p>
          <div>
            <button className="bg-white rounded-full  px-4 py-2 flex gap-2 items-center justify-center shadow-lg md:hidden ">
              <p className="font-semibold text-sm">Check wellness scores</p>
              <GrScorecard />
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Profile_Card;

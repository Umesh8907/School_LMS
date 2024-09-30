import Image from 'next/image'
import React from 'react'
import community from "../../../assets/community.png"

const page = () => {
  return ( 
    <div className='container mx-auto mt-40 ' >
      <div className='bg-[#f4f2ff] w-[65%] rounded-xl mx-auto flex flex-col items-center px-48 py-8 pb-20 '>
        <div>
        <Image src={community} alt='community'  className='w-[300px] object-fill '/>
        </div>
        <h1 className='text-[28px] font-bold'>Comming Soon!</h1>
        <p className='text-center text-lg mt-6'>We're hard at work building exciting new features to enhance your experience. Stay tuned for updates!</p>
        <p className='mt-6 bg-[#6e4a99] text-white font-semibold  px-8 py-2 rounded-full  '>Thanks for being a part of our community</p>
      </div>

    </div>
  )
}

export default page

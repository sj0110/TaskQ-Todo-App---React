import React from 'react'
/*
    #6D9773 - Light Green
    #0C3B2E - Dark Green
    #B46617 - Orange Brown
    #FFBAOO - Yellow
*/

const Navbar = () => {
  return (
    <div className='bg-[#0C3B2E] text-white text-center h-16 flex justify-between items-center px-5 md:px-20'>
        <img src="https://raw.githubusercontent.com/sj0110/TaskQ-Todo-App---React/refs/heads/main/src/assets/image.png" className='max-h-8 cursor-pointer hover:scale-105 transition-all' alt="" />
        <p className='italic font-medium transition-all hover:not-italic text-sm md:text-xl'>Keeping track of your tasks!</p>
    </div>
  )
}

export default Navbar

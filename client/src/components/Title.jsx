import React from 'react'

function Title() {
  return (
    <div className='flex flex-col justify-center items-center mb-10 lg:mb-15 text-main '>
        
        <div className='text-5xl md:text-7xl lg:text-9xl font-sgothic m-1'>
            Huntr
        </div>

        <div className='text-center text-lg sm:text-2xl md:text-3xl font-sgothic mx-5'>
            organize your job hunting process
        </div>

        <div className='text-main px-5 py-2 font-poppins m-5 text-center'>
          record every applications // prioritize ideal companies // record the status
        </div>

    </div> 
  )
}

export default Title
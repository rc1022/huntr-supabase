import React from 'react'
import { useNavigate } from 'react-router-dom'


function JobsDisplayButton() {

    const navigate = useNavigate();

  return (
    <button className='m-3 p-1 rounded-2xl h-10 w-50 md:h-15 md:w-80 md:text-2xl bg-main text-ivory font-poppins cursor-pointer hover:scale-110 ease-in-out duration-500'
        onClick={() => navigate('/jobs')}
            >
        Check Applications
    </button>
  )
}

export default JobsDisplayButton
import React from 'react'
import useJobs from '../hooks/useJobs'

function AddJobButton() {

  const { handleApplying } = useJobs();

  return (
    <button className='m-1 p-1 rounded-2xl h-10 w-50 bg-main text-ivory font-poppins cursor-pointer hover:scale-110 ease-in-out duration-500'
            onClick={() => handleApplying()}>
        add an application
    </button>
  )
}

export default AddJobButton
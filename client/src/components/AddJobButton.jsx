import React from 'react'
import useJobs from '../hooks/useJobs'

function AddJobButton() {

  const { handleApplying } = useJobs();

  return (
    <button className='m-1 py-2 px-4 rounded-xl text-sm bg-main text-ivory font-poppins cursor-pointer btn-animate'
            onClick={() => handleApplying()}>
        add an application
    </button>
  )
}

export default AddJobButton
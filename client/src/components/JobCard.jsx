import React from 'react'
import useJobs from '../hooks/useJobs'
import { ChevronsDown, Heart } from 'lucide-react'

function JobCard({ job }) {

  const { handleEditing, updateJob, deleteJob } = useJobs();

  const handleChangeStatus = (e) => {
    const newStatus = e.target.value;
    updateJob(job.id, {status: newStatus});
  }

  return (
   <div key={job.id} 
        className='relative m-2 p-2 h-80 font-poppins text-md text-center text-main border-4 border-main bg-ivory rounded-2xl flex flex-col justify-center items-center hover:scale-105 ease-in-out duration-500'>
          
          <span className='absolute right-4 top-2'>
              { job.priority === 'high' ? ( <Heart size={30} strokeWidth={2} color='#E29DA4'  fill='#E29DA4'/> ) :
                job.priority === 'medium' ? (<Heart size={30} strokeWidth={2}/>) :
                (<ChevronsDown size={30} strokeWidth={2}/>)
              }
          </span>

          <div className='flex flex-col justify-center items-center mb-2'>
            <div className='grow p-2 mb-3 text-3xl font-sgothic border-b-2 flex items-center'>{job.company_name}</div>
            <div className='grow mb-2 text-xl font-sgothic flex items-center'>{job.job_title}</div>
          </div>
          <p className=''>Applied on: {new Date(job.application_date).toLocaleDateString('en-CA')}</p>

          <div className='flex justify-center items-center mt-2'>

            <select 
              className='text-center m-1 pl-2 pr-2 border-2 border-main rounded-xl cursor-pointer'
              id='status' 
              value={job.status || ''} 
              onChange={(e) => handleChangeStatus(e)}>
              <option value='applied'> Applied </option>
              <option value='arrangedInterview'> Arranged Interview </option>
              <option value='interviewed'> Interviwed </option>
              <option value='rejected'> Rejected </option>
              <option value='offer'> Offer </option>
            </select>

          </div>

          <div >
            <button className='rounded-lg pl-2 pr-2 pt-1 pb-1 mt-5 mr-5 bg-main text-sm text-ivory cursor-pointer btn-animate' 
              onClick={() => handleEditing(job)}
              > Details </button>
            
            <button className='rounded-lg pl-2 pr-2 pt-1 pb-1 mt-5 bg-gray-200 text-sm text-main/40 cursor-pointer btn-animate' 
              onClick={async () => await deleteJob(job.id)}
              > delete </button>
            </div>
        </div>

  )
}

export default JobCard
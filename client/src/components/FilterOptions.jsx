import { useState } from "react"
import useJobs from "../hooks/useJobs";

function FilterOptions() {

  const { priorityFilter, setPriorityFilter, statusFilter, setStatusFilter } = useJobs();

  const handlePriority = (e) => {
    if (priorityFilter === e.target.name) {
      setPriorityFilter('all');
    } else {
      setPriorityFilter(e.target.name);
    }
  }

  const handleStatus = (e) => {
    if (statusFilter === e.target.name) {
      setStatusFilter('all');
    } else {
      setStatusFilter(e.target.name);
    }
  }

  return (
    <div className='flex flex-col pr-10 font-sgothic space-y-3  w-full'>
      <span className="text-3xl">Filter by</span>

      <div className="mt-5">
        <span className="block mb-2 text-lg">Priority:</span>
        <div className="grid grid-cols-1 gap-y-2">
          <button name='high' 
            onClick={(e) => handlePriority(e)}
            className={`${priorityFilter == 'high' && 'border-main border-2' } px-2 py-1 rounded-sm option-animate`}>
            high
          </button>
          <button name='medium' 
            onClick={(e) => handlePriority(e)}
            className={`${priorityFilter == 'medium' && 'border-main border-2'} px-2 py-1 rounded-sm option-animate`}>
            medium
          </button>
          <button name='low' 
            onClick={(e) => handlePriority(e)}
            className={`${priorityFilter == 'low' && 'border-main border-2'} px-2 py-1 rounded-sm option-animate`}>
            low
          </button>
        </div>
      </div>

      <div className="mt-5">
        <span className="block mb-2 text-lg">Status:</span>
        <div className="grid grid-cols-1 gap-y-2">
          <button name='applied' 
            onClick={(e)=>{handleStatus(e)}}
            className={`${statusFilter == 'applied' && 'border-main border-2' } px-2 py-1 rounded-sm option-animate`}>
            Applied
          </button>
          <button name='arrangedInterview' 
            onClick={(e)=>{handleStatus(e)}}
            className={`${statusFilter == 'arrangedInterview' && 'border-main border-2' } m-1 px-2 py-1 rounded-sm option-animate`}>               
          Arranged Interview </button>

          <button name='interviewed' 
            onClick={(e)=>{handleStatus(e)}}
            className={`${statusFilter == 'interviewed' && 'border-main border-2' } m-1 px-2 py-1 rounded-sm option-animate`}>               
          Interviewed </button>

          <button name='offer' 
            onClick={(e)=>{handleStatus(e)}}
            className={`${statusFilter == 'offer' && 'border-main border-2' } m-1 px-2 py-1 rounded-sm option-animate`}>               
          Offer </button>

          <button name='rejected' 
            onClick={(e)=>{handleStatus(e)}}
            className={`${statusFilter == 'rejected' && 'border-main border-2' } m-1 px-2 py-1 rounded-sm option-animate`}>               
          Rejected </button>
          </div>


      </div>

    </div>
  )
}

export default FilterOptions
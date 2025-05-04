import { useState } from "react"
import useJobs from "../hooks/useJobs";

function FilterOptions() {

  const { priorityFilter, setPriorityFilter } = useJobs();

  const handleClick = (e) => {
    if (priorityFilter === e.target.name) {
      setPriorityFilter('all');
    } else {
      setPriorityFilter(e.target.name);
    }
  }

  return (
    <div className='flex flex-col border-r-4 pr-10 font-sgothic space-y-5 justify-center items-center'>
      <span className="border-b-2">filter by priority</span>
      <div className='flex flex-row space-x-10'>
        <button name='high' 
          onClick={(e) => handleClick(e)}
          className={`${priorityFilter == 'high' ? 'border-main' : 'border-ivory'} border-2 px-3 py-1 rounded-sm`}> 
                        
        high </button>
        
        <button name='medium' 
          onClick={(e) => handleClick(e)}
          className={`${priorityFilter == 'medium' ? 'border-main' : 'border-ivory'} border-2 px-3 py-1 rounded-sm`}> 
                        
        medium </button>

        <button name='low' 
          onClick={(e) => handleClick(e)}
          className={`${priorityFilter == 'low' ? 'border-main' : 'border-ivory'} border-2 px-3 py-1 rounded-sm`}> 
                        
        low </button>
      </div>
    </div>
  )
}

export default FilterOptions
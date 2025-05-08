import React from 'react'
import useJobs from '../hooks/useJobs';
import AddJobButton from './AddJobButton';
import LogoutButton from './LogoutButton';
import Charts from '../components/Charts';
import FilterOptions from '../components/FilterOptions';


function SideBar({ showFilter }) {
  
    const { jobs } = useJobs();

    const totalApplication = jobs.length;

    const jobStatus = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {})

    
  return (
            <aside className='relative min-h-screen lg:flex flex-col h-full font-sgothic w-100 bg-ivory border-r-6 text-main p-4 hidden  ease-in-out overflow-y-auto'>
            {showFilter ? (<> <FilterOptions /> </>) 
            : (
            <>
            <div className=' pb-2 flex flex-col justify-center items-center text-sm'>
              <div className=' text-3xl mt-4'>SUMMARY</div>
              <div className='w-full h-48 flex justify-center items-center'>
                <Charts jobStatus={jobStatus}/>
              </div>
              
                <div className='grid grid-cols-2 gap-x-2 gap-y-6 m-2 p-1 text-lg'>
                  <div className='text-center'>Total</div>
                  <div className='text-center'>{totalApplication}</div>
                  
                  { Object.entries(jobStatus).map(([status, count]) => (
                    <React.Fragment key={status}>
                      <div className='text-center flex items-center justify-center'>{ status === "arrangedInterview" ? "Arranged Interview" : 
                        status.replace(status[0],status[0].toUpperCase())}</div>
                      <div className='text-center flex items-center justify-center'>{count}  <span className='pl-2 text-sm'> {" (" + count/totalApplication*100+ "%)" }</span> </div>
                    </React.Fragment>
                  ))}
                </div>
            </div>
  
            <div className='mt-auto w-full flex flex-col justify-center'>
              <div className='m-3 w-full flex justify-center'>
                    <AddJobButton />
              </div>
  
  
              <div className='m-3 w-full flex justify-center'>
                    <LogoutButton />
              </div>
            </div>
            </>)}
            
          </aside>
  )
}

export default SideBar
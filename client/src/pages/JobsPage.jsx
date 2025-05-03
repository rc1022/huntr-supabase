import React from 'react'
import useJobs from '../hooks/useJobs';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import AddJobButton from '../components/addJobButton';
import JobForm from '../components/JobForm';
import Spinner from '../components/Spinner';
import JobDetail from '../components/JobDetail';
import Charts from '../components/Charts';

function JobsPage() {

  const { jobs, editing, applying, isLoading } = useJobs();

  const totalApplication = jobs.length;

  const jobStatus = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {})

  return (
  <>

      {applying && <JobForm /> }
      {editing && <JobDetail />}
      <Header />
      <div className='flex h-screen'>
        {/* Side bar */}
        <aside className='relative font-sgothic w-100 bg-ivory border-r-6 text-main p-4 hidden lg:block'>
          <div className='border-b-2 pb-2 flex flex-col justify-center items-center text-sm'>
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
                    <div className='text-center flex items-center justify-center'>{count}</div>
                  </React.Fragment>
                ))}
              </div>

              
          </div>

          {/* add application button */}
          <div className='absolute bottom-5 w-full flex justify-center'>
                <AddJobButton />
            </div>
        </aside>

        {/* job cards */}
        <main className='flex-1 p-6'>
          <div className='flex flex-col h-full justify-center items-center mt-2 mb-2 ml-10 mr-10 bg-ivory'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-1 overflow-y-auto justify-items-center'>
              
              {isLoading ? <Spinner /> : 
                jobs.map( job => (
                  <div className='w-full sm:1/2 lg:1/3 xl:1/4 m-4 bg-ivory'
                        key={job.id}>
                    <JobCard job={job} />
                  </div>
              ))}
            </div>

        
          </div>
        </main>
      </div>
  </>
  )
}

export default JobsPage
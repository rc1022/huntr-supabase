import React from 'react'
import useJobs from '../hooks/useJobs';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import AddJobButton from '../components/addJobButton';
import JobForm from '../components/JobForm';
import Spinner from '../components/Spinner';
import JobDetail from '../components/JobDetail';

function JobsPage() {

  const { jobs, editing, applying, isLoading } = useJobs();

  return (
  <>

      {applying && <JobForm /> }
      {editing && <JobDetail />}
      <Header />

      <div className='flex flex-col h-full justify-center items-center mt-2 mb-2 ml-10 mr-10 bg-ivory'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 m-1 overflow-y-auto justify-items-center'>
          
          {isLoading ? <Spinner /> : 
            jobs.map( job => (
              <div className='w-full sm:1/2 lg:1/3 xl:1/4 m-4 bg-ivory'
                    key={job.id}>
                <JobCard job={job} />
              </div>
          ))}
        </div>

        <div className='w-full bg-ivory flex justify-center'>
          <AddJobButton />
        </div>
      </div>
  </>
  )
}

export default JobsPage
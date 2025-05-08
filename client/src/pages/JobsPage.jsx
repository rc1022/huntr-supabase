import React, { useState } from 'react'
import { AnimatePresence, motion, useScroll }from 'framer-motion'
import useJobs from '../hooks/useJobs';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import Spinner from '../components/Spinner';
import JobDetail from '../components/JobDetail';
import SortingOptions from '../components/SortingOptions';
import { ListFilterPlus, ArrowDownUp } from 'lucide-react';
import SideBar from '../components/SideBar';

function JobsPage() {

  const { jobs, editing, applying, isLoading, statusFilter, priorityFilter } = useJobs();

  const [ showSort, setShowSort ] = useState(false); 
  const [ showFilter, setShowFilter ] = useState(false);

  // Filter jobs based on status and priority
  const filteredJobs = jobs.filter(job =>
    (statusFilter === 'all' || job.status === statusFilter) &&
    (priorityFilter === 'all' || job.priority === priorityFilter)
  );

  return (
  <>

      {isLoading && <Spinner />}
      {applying && <JobForm /> }
      {editing && <JobDetail />}
      <Header />
      <div className='relative flex min-h-screen'>
      <SideBar showFilter={showFilter}/>

        {/* job side */}
        <main className='relative flex-1 p-6'>
        
        <div className='max-w-full absolute left-5 top-5 space-y-5'>
          <ArrowDownUp strokeWidth={2}
            className='option-animate'
            onClick={() => setShowSort(!showSort)}/>
          <ListFilterPlus strokeWidth={2}
            className='option-animate'
            onClick={() => setShowFilter(!showFilter)} />
        </div>



        {/* filtering and sorting section */}
        { showSort && 
          <motion.div 
            className='flex-col flex md:flex-row justify-center items-center w-full max-w-full gap-2 px-2 '
            initial={{opacity:0, scale:0.8}}
            animate={{opacity:1, scale: 1}}
            exit={{opacity:0, scale: 0.8}}
            transition={{ duration: 0.3}}>

            {/* <FilterOptions /> */}
            <SortingOptions />

          </motion.div>}
        

        {/* cards */}
          <div className='flex flex-col h-full justify-center items-center mt-2 mb-2 ml-10 mr-10 bg-ivory'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-1 overflow-y-auto justify-items-center'>
              
              <AnimatePresence>
              { 
                filteredJobs.map( job => (
                  <motion.div 
                        className='w-full sm:1/2 lg:1/3 xl:1/4 m-4 bg-ivory'
                        key={job.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}  >

                    <JobCard job={job} />
                  </motion.div>
              ))}
              </AnimatePresence>
            </div>

        
          </div>
        </main>
      </div>
  </>
  )
}

export default JobsPage

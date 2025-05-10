import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import useJobs from '../hooks/useJobs';
import AddJobButton from './AddJobButton';
import LogoutButton from './LogoutButton';
import Charts from '../components/Charts';
import FilterOptions from '../components/FilterOptions';
import { ArrowBigLeftDash } from 'lucide-react'
import JobForm from './JobForm';



function MobilDashBoard({ showFilter, onToggleMobileDashboard }) {
  const { jobs, applying } = useJobs();
  const totalApplication = jobs.length;
  const jobStatus = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-ivory flex flex-col font-sgothic p-4 md:hidden overflow-y-auto border-r-6 text-main">
      <button
        className="absolute left-4 top-4 p-2 flex items-center justify-center btn-animate"
        aria-label="Close dashboard"
        onClick={onToggleMobileDashboard}
        style={{ zIndex: 60 }}
      >
        <ArrowBigLeftDash size={28} />
      </button>

      {applying && <JobForm /> }
      
      <div className="pt-12"> {/* Add top padding to avoid overlap with close button */}
        <AnimatePresence mode="wait">
        {showFilter ? (
          <motion.div
            key="filter"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <FilterOptions />
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col h-full"
          >
            <div className='pb-2 flex flex-col justify-center items-center text-sm flex-1'>
              <div className='text-2xl mt-2 mb-2'>SUMMARY</div>
              <div className='w-full h-40 flex justify-center items-center'>
                <Charts jobStatus={jobStatus} />
              </div>
              <div className='grid grid-cols-2 gap-x-2 gap-y-4 m-2 p-1 text-base'>
                <div className='text-center'>Total</div>
                <div className='text-center'>{totalApplication}</div>
                {Object.entries(jobStatus).map(([status, count]) => (
                  <React.Fragment key={status}>
                    <div className='text-center flex items-center justify-center'>{status === "arrangedInterview" ? "Arranged Interview" : status.replace(status[0], status[0].toUpperCase())}</div>
                    <div className='text-center flex items-center justify-center'>{count} <span className='pl-2 text-xs'> {" (" + Math.round(count / totalApplication * 100) + "% )"}</span> </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='mt-auto w-full flex flex-col justify-center'>
              <div className='m-2 w-full flex justify-center'>
                <AddJobButton />
              </div>
              <div className='m-2 w-full flex justify-center'>
                <LogoutButton />
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MobilDashBoard
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useJobs from '../hooks/useJobs';
import { AnimatePresence, motion } from 'framer-motion';

function JobForm() {

    const modalRef = useRef();
    const { addJob, handleApplying } = useJobs();

    const [ formData, setFormData ] = useState({
        company_name: '',
        job_title: '',
        application_date: '',
        job_link: '',
        notes: '',
    });
    
    const handleChange = ( e ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    // Close modal on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            handleApplying(); 
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);

    const isValid = formData.company_name && formData.job_title && formData.application_date

  return (
    <AnimatePresence>
      <motion.div
        className='z-50 fixed inset-0 bg-black/40 flex justify-center items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}    
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className='bg-ivory h-4/5 w-full max-w-sm sm:max-w-md shadow-2xl border-4 border-main overflow-y-auto max-h-[90vh] flex flex-col'
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, duration: 0.35 }}
        >
        <div ref={modalRef} className='w-full bg-main text-2xl sm:text-3xl p-4 text-ivory font-sgothic flex justify-center items-center'>
          New Application
        </div>

        <form className='flex flex-col gap-4 py-4 px-6 w-full font-poppins text-main' onSubmit={e => {e.preventDefault();}}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="company_name" className="text-main font-semibold">Company Name</label>
            <input id="company_name" type="text" required value={formData.company_name} onChange={handleChange} className="border-main border-2 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-main" />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="job_title" className="text-main font-semibold">Job Title</label>
            <input id="job_title" type="text" required value={formData.job_title} onChange={handleChange} className="border-main border-2 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-main" />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="application_date" className="text-main font-semibold">Apply Date</label>
            <input id="application_date" type="date" required value={formData.application_date} onChange={handleChange} className="border-main border-2 p-3 rounded-lg w-full block appearance-none focus:outline-none focus:ring-2 focus:ring-main" />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="job_link" className="text-main font-semibold">JD URL (optional)</label>
            <input id="job_link" type="url" value={formData.job_link} onChange={handleChange} className="border-main border-2 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-main" />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="notes" className="text-main font-semibold">Notes (optional)</label>
            <textarea id="notes" value={formData.notes} onChange={handleChange} className="border-main border-2 p-3 h-24 text-sm rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-main resize-none" />
          </div>

          <div className='flex flex-row justify-center items-center gap-3 mt-2 font-sgothic'>
          <button
            className={`rounded-xl py-2 w-1/3 text-ivory text-lg font-bold transition-all ${isValid ? 'bg-main' : 'bg-main opacity-50 cursor-not-allowed'}`}
            onClick={async () => {
              const success = await addJob(formData);
              if (success) { handleApplying(); }
              else { alert("Failed to add application!"); }
            }}
            disabled={!isValid}
          >
            ADD
          </button>
          <button
            className='rounded-xl py-2 w-1/3 bg-main text-ivory text-lg font-bold mt-0.5'
            onClick={() => handleApplying()}
          >
            BACK
          </button>
        </div>
      </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default JobForm
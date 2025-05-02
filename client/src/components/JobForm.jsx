import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useJobs from '../hooks/useJobs';

function JobForm() {

    const modalRef = useRef();
    const navigate = useNavigate();
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
    <div className='h-screen w-screen fixed bg-black/30 flex justify-center items-center transition-all duration-500 ease-in-out'>

            <div className='bg-ivory h-4/5 w-1/2 flex flex-col border-4 border-main justify-center items-center animate-fadeZoom'>
                <div ref={modalRef} className='w-full bg-main text-3xl p-4 text-ivory font-sgothic flex justify-center items-center'>
                    New Application</div>

                <div className='h-full w-full bg-ivory p-4 m-4 text-main text-lg xl:text-2xl font-poppins'>
                    <div className="grid grid-cols-2 gap-4 justify-center items-center ">

                        <label htmlFor="company_name" className="text-center">Company Name</label>
                        <input id="company_name" type="text" required
                                value={formData.company_name}
                                onChange={handleChange}
                                className="border-main border-2 p-1 text-center rounded-sm" />

                        <label htmlFor="job_title" className="text-center">Job Title</label>
                        <input id="job_title" type="text" required
                                value={formData.job_title}
                                onChange={handleChange}
                                className="border-main border-2 p-1 text-center rounded-sm" />

                        <label htmlFor="application_date" className="text-center">Apply date</label>
                        <div className='flex justify-center'>
                            <input id="application_date" type="date" required
                                    value={formData.application_date}
                                    onChange={handleChange}
                                    className="border-main border-2 p-1 text-center self-center rounded-sm" />
                        </div>

                        <label htmlFor="job_link" className="text-center">JD url (optional)</label>
                        <input id="job_link" type="url"
                                value={formData.job_link} 
                                onChange={handleChange}
                                className=" border-main border-2 p-1 text-center rounded-sm" />

                        <label htmlFor="notes" className="text-center">Notes (optional)</label>
                        <textarea id="notes" value={formData.notes} onChange={handleChange} 
                                className="border-main border-2 p-1 h-20 text-sm justify-center rounded-sm" />

                    </div>
                </div>

                <div className='mb-4 flex flex-row justify-center items-center font-sgothic'>
                    <button className={`grow pl-2 pr-2 rounded-xl h-10 w-20 text-ivory text-lg m-1 cursor-pointer ${isValid ? 'bg-main' : 'bg-main opacity-50 cursor-not-allowed'}`}
                                onClick={ async () => {
                                    await addJob(formData);
                                    handleApplying();
                                    navigate('/jobs');
                                    console.log(clicked);
                                }}
                                disabled={!isValid}
                            >
                                ADD</button>
                    <button className='pl-2 pr-2 rounded-xl h-8 w-18 bg-main text-ivory text-sm cursor-pointer'
                                onClick={() => handleApplying()}
                            >
                                BACK</button>

                            
                                
                </div>
            </div>

       
        
    </div>
  )
}

export default JobForm
import React, { useEffect, useState, useRef } from 'react'
import useJobs from '../hooks/useJobs';


function JobDetail() {
    
    const { handleEditing, selectedJob, deleteJob, updateJob } = useJobs();

    const [ editingJob, setEditingJob ] = useState(false);
    const [ editedJob, setEditedJob ] = useState({ ...selectedJob });

    const jobLinkRef = useRef(null);

    if (!selectedJob) return null;

    const handleSave = async () => {
        const cleanedJob = Object.fromEntries(
          Object.entries(editedJob).filter(
            ([key, value]) =>
                value !== null &&
                value !== '' &&
                value !== undefined &&
                key !== 'id' &&
                key !== 'created_at'
            )
        );
      
        await updateJob(selectedJob.id, cleanedJob);
        setEditingJob(false);
        Object.assign(selectedJob, cleanedJob);
        console.log(cleanedJob);
      };

    const handleCancel = () => {
        setEditedJob({...selectedJob});
        setEditingJob(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedJob( prev => ({... prev, [name] : value} ))
    }

    useEffect(() => {
        setEditedJob({ ... selectedJob,
            'application_date':new Date(selectedJob.application_date).toLocaleDateString('en-CA')
         });
    }, [selectedJob])


    // Close when pressing escape
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            handleEditing(); 
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);

  return (
    <div className='z-50 h-screen w-screen font-poppins fixed bg-black/30 flex justify-center items-center transition-all duration-500 ease-in-out'>
        <div className={`${editingJob ? 'h-4/7 md:h-5/8' : 'h-3/7 md:h-3/5' }
                        w-5/6 md:w-1/2 xl:w-1/3 relative bg-ivory  flex flex-col border-4 border-main justify-center items-center animate-fadeZoom`}>
            {/* Closing button */}

            <button 
                onClick={handleEditing}
                className=' absolute top-1 right-6 text-lg hover:text-red-400 cursor-pointer'>x</button>
            
            <div className='static md:absolute font-sgothic top-1 text-sm md:text-lg mb-2'>Job Details</div>

            {/* Title Section */}
            <div className='font-sgothic text-center mb-8'>       
                <div className='text-3xl md:text-5xl mb-2'> {selectedJob.company_name} </div>
                <div className='text-xl md:text-3xl '> {selectedJob.job_title} </div>
            </div>

            {/* Info Section */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm md:text-lg text-main'>

                <div className='text-right'> Application Date</div>
                <div className='text-center'> {new Date(selectedJob.application_date).toLocaleDateString('en-CA')} </div>

                <div className='text-right'> status </div>
                <div className='text-center'> 
                    {editingJob ? (
                        <select
                        name="status"
                        value={editedJob.status}
                        onChange={handleChange}
                        className="w-4/5 md:w-full border p-1 rounded text-center bg-ivory focus:outline-none">
                            
                            <option value="applied">Applied</option>
                            <option value="arrangedInterview">Arranged Interview</option>
                            <option value="interview">Interviewed</option>
                            <option value="rejected">Rejected</option>
                            <option value="offer">Offer</option>
                        </select>) :
                    selectedJob.status === "arrangedInterview" ?  ("Arranged Interview") :
                    (selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1))}
                </div>

                <div className='text-right'> Priority </div>
                <div className='text-center'> 
                    
                    {editingJob ? (
                        <select
                        name="priority"
                        value={editedJob.priority}
                        onChange={handleChange}
                        className="w-4/5 md:w-full border p-1 rounded text-center bg-ivory focus:outline-none">
                            
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>

                        </select>)
                    :  (selectedJob.priority.charAt(0).toUpperCase() + selectedJob.priority.slice(1) ) }
                </div>

                { editingJob && selectedJob.job_link && 
                    (<>
                        <div className='text-right text-xs md:text-sm'> Job link</div>
                        <div className='text-center text-xs md:text-sm'>
                        <input
                            ref={jobLinkRef}
                            name="job_link"
                            value={editedJob.job_link || ''}
                            onChange={handleChange}
                            onClick={() => {
                                if (jobLinkRef.current) {
                                    jobLinkRef.current.setSelectionRange(0, jobLinkRef.current.value.length);
                                }
                            }}
                            className="w-4/5 md:w-full border p-1 rounded bg-transparent focus:outline-none"
                        />
                        </div> 
                    </>

                    )}

                <div className='text-right text-xs md:text-sm'> Notes </div>
                <div className='text-center text-xs md:text-sm'> 
                    
                    {editingJob ? ( 
                        <textarea
                            name="notes"
                            value={editedJob.notes || ''}
                            onChange={handleChange}
                            className="w-4/5 md:w-full border p-1 rounded bg-transparent focus:outline-none"
                        />) 
                    : (selectedJob.notes)} 
                </div>
            </div>
           
            {/* Buttons */}
            <div className='flex space-x-4 mb-3 md:mt-8'>
            
            {!editingJob ? (<>
                {selectedJob.job_link && <a href={selectedJob?.job_link}
                    target='_blank'
                    className='px-3 py-2.5 md:px-6 md:py-2 text-xs md:text-sm bg-main text-ivory rounded-md cursor-pointer btn-animate'>
                        Job Page
                </a>}
                
                
                <button 
                    className='px-3.5 py-2.5 md:px-6 md:py-2 text-xs md:text-sm bg-main text-ivory rounded-md cursor-pointer btn-animate'
                    onClick={() => setEditingJob(!editingJob)}> 
                Edit</button> 

                <button 
                        className='px-3 py-2.5 md:px-6 md:py-2 bg-gray-200 text-main/40 rounded-md text-xs md:text-sm cursor-pointer btn-animate'
                        onClick={async () => {
                            await deleteJob(selectedJob.id)
                            handleEditing();
                        }}> 
                    
                    Delete</button>

                </>): 
                <>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2.5 md:px-6 md:py-2  bg-gray-800 text-ivory rounded-md text-xs md:text-sm hover:bg-gray-900 btn-animate"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-3.5 py-2.5 md:px-6 md:py-2  bg-gray-400 text-ivory rounded-md text-xs md:text-sm hover:bg-gray-500 btn-animate"
                    >
                        Cancel
                    </button>
                </>}
            </div>



        </div>
    </div>
  )
}

export default JobDetail
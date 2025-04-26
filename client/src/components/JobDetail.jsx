import React, { useEffect, useState } from 'react'
import useJobs from '../hooks/useJobs';


function JobDetail() {
    
    const { handleEditing, selectedJob, deleteJob, updateJob } = useJobs();

    const [ editingJob, setEditingJob ] = useState(true);
    const [ editedJob, setEditedJob ] = useState({ ...selectedJob });

    if (!selectedJob) return null;

    const handleSave = async() => {
        await updateJob(selectedJob.id, editedJob);
        setEditingJob(false);
        Object.assign(selectedJob, editedJob);
    }

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
    <div className='h-screen w-screen font-poppins fixed bg-black/30 flex justify-center items-center transition-all duration-500 ease-in-out'>
        <div className='relative bg-ivory h-3/5 w-1/2 flex flex-col border-4 border-main justify-center items-center animate-fadeZoom'>
            {/* Closing button */}
            <button 
                onClick={handleEditing}
                className=' absolute top-1 right-6 text-lg hover:text-red-400 cursor-pointer'>x</button>
            
            <div className='absolute font-sgothic top-1 text-lg mb-2'>Job Details</div>

            {/* Title Section */}
            <div className='font-sgothic text-center mb-8'>       
                <div className='text-5xl mb-2'> {selectedJob.company_name} </div>
                <div className='text-3xl '> {selectedJob.job_title} </div>
            </div>

            {/* Info Section */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-lg text-main'>

                <div className='text-right'> Application Date</div>
                <div className='text-center'> {new Date(selectedJob.application_date).toLocaleDateString('en-CA')} </div>

                <div className='text-right'> status </div>
                <div className='text-center'> 
                    {editingJob ? (
                        <select
                        name="status"
                        value={editedJob.status}
                        onChange={handleChange}
                        className="border p-1 rounded text-center bg-ivory focus:outline-none">
                            
                            <option value="applied">Applied</option>
                            <option value="arranged interview">Arranged Interview</option>
                            <option value="interview">Interviewed</option>
                            <option value="rejected">Rejected</option>
                            <option value="offer">Offer</option>
                        </select>) 
                    
                    : (selectedJob.status)}
                </div>

                <div className='text-right'> Priority </div>
                <div className='text-center'> 
                    
                    {editingJob ? 
                    (<input
                        type="text"
                        name="priority"
                        value={editedJob.priority || ''}
                        onChange={handleChange}
                        className="border p-1 rounded bg-ivory text-center focus:outline-none"
                      />) 
                    : (selectedJob.priority)} 
                </div>

                <div className='text-right text-sm'> Notes </div>
                <div className='text-center text-sm'> 
                    
                    {editingJob ? ( 
                        <textarea
                            name="notes"
                            value={editedJob.notes || ''}
                            onChange={handleChange}
                            className="border p-1 rounded bg-transparent focus:outline-none w-full"
                        />) 
                    : (selectedJob.notes)} 
                </div>
            </div>
           
            {/* Buttons */}
            <div className='flex space-x-4 mb-3 mt-8'>
            
                {!editingJob ? (<>
                <a href={selectedJob?.job_link}
                    target='_blank'
                    className='px-6 py-2 bg-main text-ivory rounded-md text-sm cursor-pointer anima btn-animate'>
                        Job Page
                </a>

                <button 
                    className='px-6 py-2 bg-main text-ivory rounded-md text-sm cursor-pointer btn-animate'
                    onClick={() => setEditingJob(!editingJob)}> 
                Edit</button> 

                <button 
                        className='px-6 py-2 bg-gray-200 text-main/40 rounded-md text-sm cursor-pointer btn-animate'
                        onClick={async () => {
                            await deleteJob(selectedJob.id)
                            handleEditing();
                        }}> 
                    
                    Delete</button>

                </>): 
                <>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gray-800 text-ivory rounded-md text-sm hover:bg-gray-900 btn-animate"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-400 text-ivory rounded-md text-sm hover:bg-gray-500 btn-animate"
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
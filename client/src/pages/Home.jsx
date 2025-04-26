import React, { useState } from 'react'
import Title from '../components/Title'
import AddJobButton from '../components/addJobButton'
import JobsDisplayButton from '../components/JobsDisplayButton'
import JobForm from '../components/JobForm';
import useJobs from '../hooks/useJobs';



function Home() {

  const { applying } = useJobs();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-ivory">
      <Title />
      <AddJobButton />
      <JobsDisplayButton />

      {applying && <JobForm /> }
      
    </div>


  )
}

export default Home
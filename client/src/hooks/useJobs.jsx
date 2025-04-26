import { useContext } from 'react';
import { JobsContext } from '../context/JobsContext'

function useJobs() {

  return useContext(JobsContext);

}

export default useJobs
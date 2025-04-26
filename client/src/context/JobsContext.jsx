import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobsContext = createContext();

const API_BASE_URL = '/api/huntr';

export const JobsProvider = ({ children }) => {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const [ editing, setEditing ] = useState(false);
    const [ applying, setApplying ] = useState(false);
    const [ selectedJob, setSelectedJob ] = useState(null);

    const handleApplying = () => {
        setApplying(!applying);
      }
    
    const handleEditing = ( job = null ) => {
        setSelectedJob(job);
        setEditing(!editing);
      }

    const fetctJobs = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_BASE_URL);
            console.log("Fetched jobs:", response.data);
            setJobs(response.data);
            
        } catch (err) {
            console.error("Failed to fetch jobs", err);
            setError(`Failed to fetch jobs: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetctJobs();
    }, [])

    const addJob = async ( job_details ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(API_BASE_URL, job_details);
            const newJob = response.data;

            setJobs([...jobs, newJob]);
            setError(null);
            console.log("New Job added:", newJob);

        } catch (err) {
            console.err("Failed to add job:", err);
            setError(`Failed to add job: ${err.message}`);
        } finally {
            setIsLoading(false);
        }

    }

    const deleteJob = async ( id ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`)

            setJobs(jobs.filter( job => job.id !== id ));
            
        } catch (err) {
            console.error(`Failed to delete application with id ${id}`, err);
            setError(`Failed to delete applciation: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    const updateJob = async ( id, updatedFields ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, updatedFields)
            const updatedJob = response.data;

            setJobs((prevJobs) => 
                prevJobs.map(job => job.id === id ? updatedJob : job));
            
            
        } catch (err) {
            console.error(`Failed to update application with id ${id}`, err);
            setError(`Failed to update application: ${err.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <JobsContext.Provider value={{
            jobs,
            isLoading,
            error,
            selectedJob,
            applying,
            handleApplying,
            editing,
            handleEditing,
            fetctJobs,
            addJob,
            deleteJob,
            updateJob,
        }}>
            {children}
        </JobsContext.Provider>
    )
}
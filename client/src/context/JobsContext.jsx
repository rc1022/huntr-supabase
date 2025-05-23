import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

export const JobsContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const JobsProvider = ({ children }) => {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ editing, setEditing ] = useState(false);
    const [ applying, setApplying ] = useState(false);
    const [ selectedJob, setSelectedJob ] = useState(null);
    const [ priorityFilter, setPriorityFilter ] = useState('all');
    const [ statusFilter, setStatusFilter ] = useState('all');
    const [ prioritySort, setPrioritySort ] = useState('');

    const { user, accessToken } = useUser();

    const handleApplying = () => {
        setApplying(!applying);
      }
    
    const handleEditing = ( job = null ) => {
        setSelectedJob(job);
        setEditing(!editing);
      }

    const fetchJobs = async ( priority, sort, status ) => {

        if (!accessToken) {
            setError("Not authenticated.");
            return;
        }

        setIsLoading(true);
        setError(null);

        let query = [];
        if (priority) query.push(`priority=${priority}`);
        if (sort) query.push(`sort=${sort}`);
        if (status) query.push(`status=${status}`);
        const queryString = query.length > 0 ? `${query.join('&')}` : '';

        try {
            const response = await axios.get(`${API_BASE_URL}/api/huntr/?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setJobs(response.data);
            
        } catch (err) {
            console.error("Failed to fetch jobs", err);
            setError(`Failed to fetch jobs: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (accessToken){
        fetchJobs(priorityFilter, prioritySort);
        }
    }, [accessToken, priorityFilter, prioritySort, statusFilter])

    const addJob = async ( job_details ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/huntr/`, job_details,
                {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }}
            );
            const newJob = response.data;

            setJobs([...jobs, newJob]);
            setError(null);

            return true;

        } catch (err) {
            console.error("Failed to add job:", err);
            setError(`Failed to add job: ${err.message}`);
            return false;
        } finally {
            setIsLoading(false);
        }

    }

    const deleteJob = async ( id ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${API_BASE_URL}/api/huntr/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            
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
            const response = await axios.put(`${API_BASE_URL}/api/huntr/${id}`, updatedFields,
                {
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                }
            )
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
            setIsLoading,
            error,
            setError,
            selectedJob,
            applying,
            handleApplying,
            editing,
            handleEditing,
            fetchJobs,
            addJob,
            deleteJob,
            updateJob,
            priorityFilter,
            setPriorityFilter,
            prioritySort,
            setPrioritySort,
            statusFilter,
            setStatusFilter
        }}>
            {children}
        </JobsContext.Provider>
    )
}
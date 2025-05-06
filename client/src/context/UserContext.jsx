import React, {createContext ,useState, useContext, useEffect } from 'react';
import axios from 'axios';
const UserContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ accessToken, setAccessToken ] = useState(null);

    const signup = async ( formData ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/huntr/signup`, formData);

            setUser(response.data.user);

        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    }
    
    const login = async ( loginData ) => {
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/huntr/login`, loginData);
            setUser(response.data.user);
            setAccessToken(response.data.accessToken);
            return true;

        } catch (err) {
            setError('Invalid email or password');
            return false;
        }
    }

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');  
    }

    const refresh = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/huntr/refresh`,{},
                {
                    withCredentials: true
                });
                setAccessToken(response.data.accessToken);
                setUser(response.data.user);
                return true;
        } catch (err) {
            setError('Session expired. Please log in again.');
            setAccessToken(null);
            setUser(null);
            return false;
        }
    }

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshed = await refresh();
                    if (refreshed?.accessToken) {
                        setAccessToken(refreshed.accessToken)
                        originalRequest.headers['Authorization'] = `Bearer ${refreshed.accessToken}`
                        return axios(originalRequest);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, [ accessToken ]);



    return (
        <UserContext.Provider value={{
            user,
            isLoading,
            setIsLoading,
            error,
            setError,
            signup,
            accessToken,
            login,
            logout,
            setUser,
            setAccessToken
        }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext);

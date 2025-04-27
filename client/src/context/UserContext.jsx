import React, {createContext ,useState, useContext } from 'react';
import axios from 'axios';

  const UserContext = createContext();

const API_BASE_URL = '/api/huntr';

export const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const signup = async ( formData ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/signup`, formData);
            console.log("New user added", response.data);
            setUser(response.data.user);

        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            isLoading,
            error,
            signup,
        }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext);

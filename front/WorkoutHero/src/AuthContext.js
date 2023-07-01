import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
  
    const login = (data) => {
        setUserData(data);
    };
  
    const logout = () => {
      setUserData(null);
    };
  
    return (
      <AuthContext.Provider value={{ userData, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthProvider };
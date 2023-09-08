import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const baseUrl = 'https://apiworkouthero.onrender.com'

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const AuthProvider = ({ children }) => {
    //const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
  
    const tryLogin = async (username, password) => {
        const url = baseUrl + `/user/select?login=${username}&pass=${password}`

        if (username === '') {
            throw new Error("Usuario vazio.")
            //return {}
        }
        if (password === '') {
            throw new Error("Senha vazia.")
            //return {}
        }

        let response = null

        try {
            response = await axios.get(url);

            console.log(response)
            if (!response.data || response.data.length === 0 || response.data.message === "Nenhum registro encontrado.") {
                // Handle case when no data is returned
                throw new Error('Usuario ou senha incorretos. Tente novamente.')
            } else {
                // Handle the data returned by the request
                setUserData(response.data[0])
                console.log('User Data:', response.data)
            }
            
        } catch (error) {
            console.error(error);
            //console.log(JSON.stringify(error))
            if (error.response) {
              console.log(error.response.data);
            }
            throw error
        }
    }

    // const login = (data) => {
    //     setUserData(data);
    // };

    const trySignUp = async (params) => {
        const { name, sex, weight, height, login, pass } = params
        const timeout = 10000
        //const url = baseUrl + `/user/register`//?name=${name}&sex=${sex}&weight=${weight}&height=${height}&login=${login}&pass=${pass}`
        const url = baseUrl + `/user/register?name=${name}&sex=${sex}&weight=${weight}&height=${height}&login=${login}&pass=${pass}`
        try {
            response = await axios.post(url, params, { timeout });
            console.log("Response: ", response)
            

            if (Object.is(response.config.data, null)) {
                // Handle case when no data is returned
                console.log("passou aqui")
                throw new Error('Ocorreu um erro. Tente novamente.')
            }

            if (response.data.sucess == false) {
                console.log("nao, passou aqui")
                let errorMsg = response.data.message
                console.log("Message: ", errorMsg)
                throw new Error(errorMsg)
            }

            // Handle the data returned by the request
            setUserData(response.data.newUser)
            console.log('User data:', response.data.newUser)
            
            
        } catch (error) {
            // if (axios.isTimeout(error)) {
            //     console.log('Request timed out.'); // Handle the timeout error
            // }
            console.log(error)
            throw error
        }
    }
  
    const logout = () => {
      setUserData(null);
    };
  
    return (
      <AuthContext.Provider value={{ userData, tryLogin, logout, trySignUp, setUserData }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };

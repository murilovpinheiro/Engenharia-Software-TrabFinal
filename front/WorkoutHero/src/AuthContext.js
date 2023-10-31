import React, { createContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

const baseUrl = 'https://apiworkouthero.onrender.com'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const AuthProvider = ({ children }) => {
    //const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    const trySendPassword = async (login, token, pass) => {
        const url = baseUrl + `/user/reset_password?login=${login}&passResetToken=${token}&pass=${pass}`;

        if (login === '') throw new Error("login vazio.");
        if (token === '') throw new Error("token vazio.");
        if (pass === '') throw new Error("pass vazio.");

        let response = null;

        try {
            response = await axios.post(url, {login, token, pass}, { timeout:10000 });

            console.log('RESPONSE SENDPASS:', response)

            if (Object.is(response.data, null)) {
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
        } catch (error) {
            console.log('ERRO EM TRYSENDPASS:', error);
            throw error;
        }
        

    }

    const trySendEmail = async (login) => {
        const url = baseUrl + `/user/forgot_password?login=${login}`
        
        if (login === '') throw new Error("login vazio.")

        let response = null

        try {
            response = await axios.post(url, login, {timeout: 10000});

            console.log('RESPONSE SENDEMAIL:',response)
            
            if (Object.is(response.data, null)) {
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

        } catch (error) {
            console.log('ERRO EM TRYSENDEMAIL:', error)
            throw error
        }
    }
  
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

    const trySignUp = async (params) => {
        const { name, sex, weight, height, login, pass } = params
        const timeout = 10000
        //const url = baseUrl + `/user/register`//?name=${name}&sex=${sex}&weight=${weight}&height=${height}&login=${login}&pass=${pass}`
        const url = baseUrl + `/user/register?name=${name}&sex=${sex}&weight=${weight}&height=${height}&login=${login}&pass=${pass}`
        try {
            response = await axios.post(url, params, { timeout });
            console.log("Response: ", response)
            

            if (Object.is(response.data, null)) {
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

    const tryChangePassword = async (newPass, confirmPass) => {
        if (newPass == '') throw new Error('Nova senha não pode ser vazia.')
        if (confirmPass == '') throw new Error('Confirme a nova senha.')


        if (newPass != confirmPass) {
            throw new Error('Confirmação incorreta. Digite a mesma senha nas duas caixas.')
        }

        //send to back
        await sleep(3000)
        throw new Error('Função não implaementada.')
    }

    const logout = () => {
      setUserData(null);
    };
  
    return (
      <AuthContext.Provider value={{ userData, trySendPassword, tryLogin, trySendEmail, logout, trySignUp, tryChangePassword, setUserData }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };

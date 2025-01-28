import axios, { isAxiosError } from "axios"
import { confirmtokenType, loginForm, userRegisterForm } from "../types"


export const createUser = async ( formdata : userRegisterForm ) => { 

    try {
        const url = `${import.meta.env.VITE_API_URL}/user/`
    
        const resultado = await axios.post( url ,  formdata )
        
        return resultado.data 
        
    } catch (error) {
        
        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error)
        }

    }
    
}


export const login = async ( formdata : loginForm ) => { 

    try {
        
        const url = `${import.meta.env.VITE_API_URL}/user/login`

        const resultado = await axios.post( url , formdata )
        
        return resultado.data
        
    } catch (error) {

        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }

    }   

}

export const confirmAccount = async ( token  : confirmtokenType['token'] ) => { 

    try {
        
        const url = `${import.meta.env.VITE_API_URL}/user/confirm-account`

        const resultado = await axios.post( url  ,  { token }  )
        
        return resultado.data
        
    } catch (error) {

        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }

    }   
}


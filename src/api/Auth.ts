import axios, { isAxiosError } from "axios"
import { loginForm, userRegisterForm } from "../types"


export const createUser = async ( formdata : userRegisterForm ) => { 
    
    const url = `${import.meta.env.VITE_API_URL}/user/`

    const resultado = await axios.post( url ,  formdata )
    
    if( resultado.status == 200 ) { 
        return resultado.data
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
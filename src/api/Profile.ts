import axios, { isAxiosError } from "axios"
import { ProfileFormType } from "../types"

// interceptor de request, se ejecuta antes de enviar cualquier peticion
axios.interceptors.request.use( config => {

    const token = localStorage.getItem('AUTH_TOKEN')

    if( token ) { 
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const updateProfile = async ( formdata :  ProfileFormType ) => { 
    
    const url = `${import.meta.env.VITE_API_URL}/user/auth/profile/`

    try {

        const resultado = await axios.post<string>( url , formdata )

        if( resultado.status == 200) {
            return resultado.data
        }

        
    } catch (error) {
        if( isAxiosError ( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }
    
    
    }

}
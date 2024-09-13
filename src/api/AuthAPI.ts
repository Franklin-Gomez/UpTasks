import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { confirmToken, UserRegistrationForm } from "../types";

export const createAccount  = async ( formData : UserRegistrationForm) => { 

    try {
        const url = '/auth/create-account'
        
        const { data } = await api.post<string>( url , formData ) 

        return data 
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }
}

export const confirmAccount  = async ( formData  : confirmToken) => { 

    try {
        const url = '/auth/confirm-account'
        
        const { data } = await api.post<string>( url , formData  ) 

        return data 
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }

}
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { confirmToken, ForgotPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

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

export const RequestConfirmationCode  = async ( formData  : RequestConfirmationCodeForm) => { 

    try {
        const url = '/auth/request-code'
        
        const { data } = await api.post<string>( url , formData  ) 

        return data 
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }

}

export const AuthenticateUser  = async ( formData  : UserLoginForm) => { 

    try {
        const url = '/auth/login'
        
        const { data } = await api.post<string>( url , formData  ) 

        return data 
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }

}

export const forgotPassword  = async ( formData  : ForgotPasswordForm) => { 

    try {
        const url = '/auth/forgot-password'
        
        const { data } = await api.post<string>( url , formData  ) 

        return data 
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }

}
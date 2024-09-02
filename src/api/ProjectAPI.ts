import { isAxiosError } from "axios"
import { projectFormDataType } from "../types"
import api from "@/lib/axios"

export const createProject  = async  ( formData : projectFormDataType ) =>  {
    try {

        const { data } = await api.post('/projects', formData )

        return  data 
        
    } catch (error) {
        
        if( isAxiosError( error) && error.response) { 
            throw new Error( error.response.data.error)
        }
    }
}
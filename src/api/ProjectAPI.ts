import { isAxiosError } from "axios"
import { dashboardProjectSchema, projectFormDataType } from "../types"
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

export const getAllProjects  = async  (  ) =>  {
    try {

        const { data } = await api.get('/projects' )
        
        const response = dashboardProjectSchema.safeParse( data )

        if( response.success) { 
            
            return  response.data

        }
        
    } catch (error) {
        
        if( isAxiosError( error) && error.response) { 
            throw new Error( error.response.data.error)
        }
    }
}
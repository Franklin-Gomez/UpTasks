import { projectFormDataType } from "../types"
import api from "@/lib/axios"

export const createProject  = async  ( formData : projectFormDataType ) =>  {
    try {

        const { data } = await api.post('/projects', formData )

        return  data 
        
    } catch (error) {
        console.log( error )
    }
}
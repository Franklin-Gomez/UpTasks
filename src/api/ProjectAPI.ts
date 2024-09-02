import { projectFormDataType } from "../types"
import api from "@/lib/axios"

export const createProject  = async  ( formData : projectFormDataType ) =>  {
    try {

        const { data } = await api.post('/projects', formData )

        console.log( data )
        
    } catch (error) {
        console.log( error )
    }
}
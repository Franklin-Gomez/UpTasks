import api from "@/lib/axios";
import { TaskFormData , projectType } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = { 
    formData : TaskFormData
    projectId : projectType['_id']
}


export async function createTask ( { formData , projectId } : TaskAPI ) { 

    try {
        
        const url = `http://localhost:4000/api/projects/${projectId}/tasks`;

        const { data } = await api.post<string>(url , formData)
        
        return data 

    } catch (error) {

        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }

    }

}
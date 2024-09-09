import api from "@/lib/axios";
import { TaskFormData , TaskType, projectType, taskSchema } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = { 
    formData : TaskFormData
    projectId : projectType['_id']
    taskId : TaskType['_id']
    status : TaskType['status']
}


export async function createTask ( { formData , projectId } : Pick<TaskAPI, 'formData' | 'projectId'> ) { 

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

export async function getTaskById( { projectId, taskId } : Pick <TaskAPI , 'projectId'  | 'taskId'> ) { 

    try {
        
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`;

        const { data } = await api(url)

        const response = taskSchema.safeParse( data )

        if( response.success ) { 
            return response.data
        }

    } catch (error) {
        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }
    }
}

export async function updateTask( { projectId, taskId , formData } : Pick <TaskAPI , 'projectId'  | 'taskId' | 'formData'> ) { 

    try {
        
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`;

        const { data } = await api.put<string>(url , formData)

        return data

    } catch (error) {
        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }
    }
}

export async function deleteTask( { projectId, taskId } : Pick <TaskAPI , 'projectId'  | 'taskId'> ) { 

    try {
        
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`;

        const { data } = await api.delete<string>(url)

        return data

    } catch (error) {
        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }
    }
}

export async function updateStatus( { projectId, taskId  , status } : Pick <TaskAPI , 'projectId'  | 'taskId' | 'status'> ) { 

    try {
        
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}/status`;

        const { data } = await api.post<string>(url , {status})

        return data

    } catch (error) {
        if( isAxiosError( error ) && error.response ) { 
            throw new Error( error.response.data.error )
        }
    }
}
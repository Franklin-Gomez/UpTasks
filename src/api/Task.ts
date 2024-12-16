import axios from "axios"
import { tasksNoteSchema, tasksSchema, taskStatusType, taskType } from "../types"

type TaskApiType = { 
    projectId? : string
    formdata? : object
    taskId? : string
    status? : taskStatusType
}

export const createTask = async ( { projectId , formdata } :  TaskApiType ) => { 

    const resultado = await axios.post( `${import.meta.env.VITE_API_URL}/projects/${projectId}/task` , formdata )

    if( resultado.status == 200 ) { 
        return resultado.data
    }

}

export async function getAllTask( projectId : string ) { 

    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/task`)

    if( resultado.status == 200 ) { 
        return resultado.data
    }
    
}

export const getOneTask = async ( { taskId , projectId } : TaskApiType ) => { 
    
    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}`)

    const validacion = tasksNoteSchema.safeParse( resultado.data )
    
    if( validacion.success ) { 

        return validacion.data

    }
    
}   

export const updateTask = async ( { taskId , formdata , projectId  } : TaskApiType ) => { 
    
    const resultado = await axios.put(`${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}` , formdata )

    if ( resultado.data == 200 ) { 

        return resultado.data

    } 

}

export const deleteTask = async ( { taskId  , projectId } : TaskApiType) => { 

    const resultado = await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}`)

    if( resultado.status == 200 ) { 

        return resultado.data

    }

}

export const updateStatusTask = async ( { projectId , taskId , status } : TaskApiType) => { 

    const resultado = await axios.post(`${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}/status` , { status })


    if( resultado.status == 200 ) { 

        return resultado.data

    }
}
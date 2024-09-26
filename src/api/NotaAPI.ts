import { isAxiosError } from "axios"
import { NoteFormData, noteSchema, projectType, TaskType } from "../types"
import api from "@/lib/axios"

type NoteApiType = { 
    formData : NoteFormData
    projectId : projectType['_id']
    taskId : TaskType['_id']
}

export const createNote = async ( { formData , projectId , taskId  } : Pick<NoteApiType, 'formData' | 'projectId' | 'taskId'>) => {
     
    try {

        const url = `projects/${projectId}/tasks/${taskId}/notes`

        const { data } = await api.post<string>( url , formData ) 

        return data 
                
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
}
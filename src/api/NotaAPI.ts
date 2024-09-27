import { isAxiosError } from "axios"
import { Note, NoteFormData, projectType, TaskType } from "../types"
import api from "@/lib/axios"

type NoteApiType = { 
    formData : NoteFormData
    projectId : projectType['_id']
    taskId : TaskType['_id']
    noteId : Note['_id']
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

export const deleteNote = async ( { projectId , taskId , noteId   } : Pick<NoteApiType, 'projectId' | 'taskId' | 'noteId'>) => {
     
    try {

        const url = `projects/${projectId}/tasks/${taskId}/notes/${noteId}`

        const { data } = await api.delete<string>( url ) 

        return data 
                
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
}


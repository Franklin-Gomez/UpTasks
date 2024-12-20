import axios from "axios"
import { NoteFormData, projectType, taskType } from "../types"

type NoteProps = { 
    projectId? : projectType['_id']
    taskId? : taskType['_id']
    noteId? : string
    formData? : NoteFormData
}

export const createNote = async ( { formData , projectId , taskId }  : NoteProps) => { 

    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}/notes`

    const resultado = await axios.post( url , formData  )

    if(resultado.status == 200) { 
        return resultado.data
    }
}

export const deleteNote = async ( { projectId , taskId , noteId  } : NoteProps ) => { 
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/task/${taskId}/notes/${noteId}`

    const resultado = await axios.delete( url )

    if( resultado.status == 200) { 
        return resultado.data
    }

}
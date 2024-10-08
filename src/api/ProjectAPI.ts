import { isAxiosError } from "axios"
import { dashboardProjectSchema, editProjectSchema, projectFormDataType, projectSchema, projectType } from "../types"
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

        const { data } = await api.get('/projects')
        
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


export const getProjectById  = async  ( id : projectType['_id'] ) =>  {
    try {

        const { data } = await api(`/projects/${id}` )
        const response = editProjectSchema.safeParse( data )

        if( response.success ) { 
            return response.data
        }
        

    } catch (error) {
        
        if( isAxiosError( error) && error.response) { 
            throw new Error( error.response.data.error)
        }
    }
}

export const getFullProject  = async  ( id : projectType['_id'] ) =>  {
    try {

        const { data } = await api(`/projects/${id}` )
        const response = projectSchema.safeParse( data )

        if( response.success ) { 
            return response.data
        }
        

    } catch (error) {
        
        if( isAxiosError( error) && error.response) { 
            throw new Error( error.response.data.error)
        }
    }
}

type updateProjectTypes = { 
    formData : projectFormDataType
    projectId : projectType['_id']
}

export const updateProject  = async  ({ formData , projectId } : updateProjectTypes ) =>  {
    try {

        const { data } = await api.put<string>(`/projects/${projectId}` , formData  )
        
        return data

    } catch (error) {
        
        if( isAxiosError( error) && error.response) { 
            throw new Error( error.response.data.error)
        }
    }
}

export const deleteProject = async ( id : projectType['_id']) => { 
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data 
    } catch (error) {
        if( isAxiosError( error) && error.response ) { 
            throw new Error( error.response.data.error)
        }
    }
}
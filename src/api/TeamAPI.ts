import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { projectType, TeamMemberForm, TeamMemberType , TeamMembersSchema } from "../types";



export const findUserByEmail = async ({ projectId , formData } : { projectId : projectType['_id'] , formData : TeamMemberForm }) => {
    
    try {

        const url = `/projects/${projectId}/team/find`

        const { data } = await api.post( url, formData ) 
        
        return data
        
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
} 

export const addUserToProject = async ({ projectId , id } : { projectId : projectType['_id'] , id : TeamMemberType['_id'] }) => {
    
    try {

        const url = `/projects/${projectId}/team`

        const { data } = await api.post<string>( url, { id }) 
        
        return data
        
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
} 

export const getProjectTeam = async ( projectId :  projectType['_id']) => {
     
    try {

        const url = `/projects/${projectId}/team`

        const { data } = await api( url) 

        const response = TeamMembersSchema.safeParse( data )

        if( response.success ) { 
            return response.data
        }
                
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
}

export const removeUserFromProject = async ( { projectId , userId } : { projectId : projectType['_id'] , userId : TeamMemberType['_id'] }) => {
     
    try {

        const url = `/projects/${projectId}/team/${userId}`

        const { data } = await api.delete<string>( url) 

        return data
                
    } catch (error) {

        if( isAxiosError( error) && error.response ) { 
            throw new Error(error.response.data.error)
        }

    }
} 
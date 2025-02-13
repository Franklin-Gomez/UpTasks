import axios , { isAxiosError } from "axios"
import { projectType, TeamMemberForm, TeamMembersSchema, TeamMemberType } from "../types"


export const FindUserbyEmail = async ( { formdata , projectId } : { formdata : TeamMemberForm , projectId : projectType['_id']}) => { 
    
    try {

        const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/team/find`

        const response = await axios.post( url , formdata )

        return response.data
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }
}

export const addMemberById = async (  { id , projectId  } : { id :  projectType['_id'] , projectId : projectType['_id'] })  => { 

    try {

        const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/team`

        const response = await axios.post( url , { id })

        return response.data
        
    } catch (error) {

        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }

    }
}

export const getProjectsTeam = async ( projectId : projectType['_id']) => { 
    try {

        const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/team`

        const response = await axios.get( url )

        const validacion = TeamMembersSchema.safeParse(  response.data )

        return validacion.data
        
    } catch (error) {

        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }

    }
}

export const removeMemberById = async ( { userId , projectId } : { userId : TeamMemberType['_id'] , projectId : projectType['_id']} ) => {
    
    try {

        const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/team/${userId}`

        const response = await axios.delete( url )

        const validacion = TeamMembersSchema.safeParse(  response.data )

        return validacion.data
        
    } catch (error) {

        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }

    }

}
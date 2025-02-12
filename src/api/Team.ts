import axios , { isAxiosError } from "axios"
import { projectType, TeamMemberForm } from "../types"


export const FindUserbyEmail = async ( { formdata , projectId } : { formdata : TeamMemberForm , projectId : projectType['_id']}) => { 
    
    try {

        const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/team/find`

        const response = await axios.post( url , formdata )

        console.log( response )
        
    } catch (error) {
        if( isAxiosError(error) && error.response  ) { 
            throw new Error( error.response.data.error )
        }
    }
}
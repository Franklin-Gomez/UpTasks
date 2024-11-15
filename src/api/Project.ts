import { projectFormDataType, projectType } from "../types";
import axios from "axios";
import { projectsSchema , projectSchema } from "../types";

export async function createProject( formData : projectFormDataType ) {
    
    const resultado = await axios.post( `${import.meta.env.VITE_API_URL}/projects/` , formData)
    
    if( resultado.status == 200 ) { 
        return resultado.data
    }

}

export async function getAllProject() { 

    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/projects/`)

    const validacion = projectsSchema.safeParse( resultado.data )

    if( validacion.success) { 
        return validacion.data
    }

}

export async function getOneProject( id : projectType['_id'] ) { 

    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`)

    const validacion = projectSchema.safeParse( resultado.data)

    if( validacion.success ) { 

        return validacion.data

    }

}

export async function updateProject( id : projectType['_id'] ) {


    
}


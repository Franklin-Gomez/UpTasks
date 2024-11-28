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

    console.log( resultado.data )

    const validacion = projectsSchema.safeParse( resultado.data )

    console.log( validacion )

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

export async function getFullProject( id : projectType['_id']){

    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`)

    const validacion = projectSchema.safeParse( resultado.data )

    if( validacion.success ) { 

        return validacion.data
        
    }
}

export async function updateProject(  { formdata , projectId }  : { formdata  :  projectFormDataType , projectId : projectType['_id'] }  ) {

    const resultado = await axios.put( `${import.meta.env.VITE_API_URL}/projects/${projectId }`, formdata )
    
    if( resultado.status == 200 ) { 
        return resultado.data
    }
        
}

export async function deleteProject( id : projectType['_id']) { 

    const resultado = await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`)

    if( resultado.status == 200 ) { 
        return resultado.data
    }
}


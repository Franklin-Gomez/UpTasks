import axios from "axios"

type TaskApiType = { 
    projectId : string
    formdata : object
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

export const getOneTask = async () => { 

}

export const updateTask = async () => { 

}

export const deleteTask = async () => { 

}
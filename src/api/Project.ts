import { projectFormDataType } from "../types";
import axios from "axios";

export async function createProject( formData : projectFormDataType ) {
    
    const resultado = await axios.post( `${import.meta.env.VITE_API_URL}/projects/` , formData)
    
    if( resultado.status == 200) { 
        return resultado.data
    }

}
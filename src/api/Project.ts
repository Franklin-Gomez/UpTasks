import { projectFormDataType } from "../types";
import axios from "axios";

export async function createProject( data : projectFormDataType ) {
    
    const resultado = await axios.post( import.meta.env.VITE_API_URL , data) 

    console.log( resultado )
}
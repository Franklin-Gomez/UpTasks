import axios from "axios"
import { userRegisterForm } from "../types"


export const createUser = async ( formdata : userRegisterForm ) => { 
    
    const url = `${import.meta.env.VITE_API_URL}/user/`

    const resultado = await axios.post( url ,  formdata )

    console.log( resultado )

    if( resultado.status == 200 ) { 
        return resultado.data
    } 
}
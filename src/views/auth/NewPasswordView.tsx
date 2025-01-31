import { useState } from "react"
import NewPasswordToken from "../../components/Auth/NewPasswordToken"
import NewPasswordForm from "../../components/Auth/NewPasswordForm"


export default function NewPasswordView() {

    const [ token , setToken ] = useState("")
    const [ isValidToken , setIsValidToken ] = useState( false )


    return (
        <>
            { !isValidToken ? 

                <NewPasswordToken 
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />

                :

                <NewPasswordForm
                    token={token}
                />
                
            }
        </>
    )
}

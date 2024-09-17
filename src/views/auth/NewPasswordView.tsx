import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { confirmToken } from "@/types/index";

export default function NewPasswordView() {

  const [ token , setToken ] = useState<confirmToken['token']>('')
  const [ isValidToken , setIsValidToken ] = useState( false )

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibistes  {''}
        <span className=" text-fuchsia-500 font-bold"> en el Email </span>
      </p>

      { !isValidToken ? 
        // componente para ingresar el token 
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        /> 
        
        : 
        
        // componente para ingresar la nueva contraseña
        <NewPasswordForm

          token={token}

        /> 
      }
    </>
  )
}

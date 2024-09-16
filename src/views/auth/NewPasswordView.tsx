import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

export default function NewPasswordView() {

  const [ isValidToken , serIsValidToken ] = useState( false )

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibistes  {''}
        <span className=" text-fuchsia-500 font-bold"> en el Email </span>
      </p>

      { !isValidToken ? 
        // componente para ingresar el token 
        <NewPasswordToken/> 
        
        : 
        
        // componente para ingresar la nueva contraseña
        <NewPasswordForm/> 
      }


    </>
  )
}

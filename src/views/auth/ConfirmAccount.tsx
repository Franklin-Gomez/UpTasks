import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmtokenType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmAccount } from "../../api/Auth";

export default function ConfirmAccount() {

    const [ token , setToken ] = useState<confirmtokenType["token"]>("")
    const navigate = useNavigate()

    const mutate = useMutation({
        mutationFn : confirmAccount,

        onSuccess : () => {
            toast.success("Cuenta Confirmadata Correctamente")
            navigate("/")
        },

        onError : ( error ) => { 
            toast.error( error.message )
        }
    })

    const handleChange = ( token : confirmtokenType["token"] ) => { 
        setToken(token)
    }

    const handleComplete = ( token : confirmtokenType["token"]  ) => {
        mutate.mutate( token )
    }

    return (
        <>
            <h1 className="text-6xl font-bold text-white">Confirma tu Cuenta </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Digita El Token de Confirmacion </p>

            <form 
                className="bg-white grid gap-6 p-8 rounded mt-4"
            >

                <label
                    className="font-normal text-2xl text-center block"
                > Código de 6 dígitos </label>

                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={  handleChange } onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white "/>
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">

                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>

            </nav>
        </>
    )
}

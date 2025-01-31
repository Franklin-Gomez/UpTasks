import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../ErrorMessage"
import { SkipToken, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { UpdatePasswordWithToken } from "../../api/Auth"
import { confirmtokenType, NewPasswordFormType } from "../../types"

export default function NewPasswordForm( token :  confirmtokenType) {

    const navigate = useNavigate()

    const { register  , formState : { errors  } , handleSubmit , watch } = useForm({ defaultValues : { 
        password : "",
        password_confirmation : ""
    }})

    const password = watch("password")

    const mutate = useMutation({
        mutationFn : UpdatePasswordWithToken,

        onSuccess : ( data ) => { 
            toast.success("data")
            navigate('/auth/login')
        },

        onError : (error) => { 
            toast.error( error.message )
        }

    })

    const onSubmit = ( formData : NewPasswordFormType  ) => { 

        const data = { 
            formData : formData,
            token : token
        }

        mutate.mutate( data )

    }

    return (
        <>
            <h1 className="text-6xl font-bold text-white"> Nueva Contraseña </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Crea tu Nueva Contraseña</p>

            <form 
                className="bg-white grid gap-6 p-8 rounded mt-4"
                onSubmit= { handleSubmit( onSubmit ) }
            >

                <div className="grid gap-3">
                    <label htmlFor="password" className="font-bold text-lg uppercase">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Contraseña de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("password" , { 
                            required : "La contraseña es obligatorio"
                        })}
                    />
                    
                    { errors.password && ( 
                        <ErrorMessage> { errors.password.message} </ErrorMessage>
                    )}

                </div>

                <div className="grid gap-3">

                    <label htmlFor="password_confirmation" className="font-bold text-lg uppercase">Repita la Nueva Contraseña</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Repetir Contraseñá de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("password_confirmation" , { 
                            required : "La contraseña es obligatorio",
                            validate : value => value === password || "Los password  no son iguales "
                        })}
                    />

                    { errors.password_confirmation && ( 
                        <ErrorMessage> { errors.password_confirmation.message} </ErrorMessage>
                    )}

                </div>

                <input 
                    type="submit" 
                    value="Crear Nueva Password" 
                    className="bg-purple-700 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-400 cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">

                <Link
                    to={'/auth/register'}
                    className="text-center text-gray-300 font-normal"
                > No tienes Cuenta ?  Crea Una </Link>

                <Link
                    to={'/auth/forgot-password'}
                    className="text-center text-gray-300 font-normal"
                > Olvitastes tu password ? Recuperar tu Password </Link>

            </nav>

        </>

    )
}

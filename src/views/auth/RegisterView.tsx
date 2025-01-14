import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import { userRegisterForm } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "../../api/Auth"
import { toast } from "react-toastify"

export default function RegisterView() {
    
    const { register  , formState : { errors  } , handleSubmit , watch } = useForm({ defaultValues : { 
        email : "",
        password : "",
        name : "",
        password_confirmation : ""   
    }})

    const navigate = useNavigate()

    const password = watch("password")

    const mutation = useMutation({

        mutationFn : createUser,

        onSuccess : () => { 
            toast.success("Usuario Creado Correctamente")
            navigate('/auth/login')
        } , 

        onError : ( errors ) => { 
            toast.error( errors.message)
        }
    })


    const formSubmit = ( formdata : userRegisterForm) => { 
        mutation.mutate( formdata )
    }

    return (
        <>
            <h1 className="text-6xl font-bold text-white"> Registrar usuario </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Llena los Campos para Registrarte</p>

            <form 
                className="bg-white grid gap-6 p-8 rounded mt-4"
                onSubmit={ handleSubmit ( formSubmit )}
            >

                <div className="grid gap-3">
                    <label htmlFor="email" className="font-bold text-lg uppercase">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("email" , { 
                            required : "El email es obligatorio"
                        })}
                    />

                    { errors.email && ( 
                        <ErrorMessage> { errors.email.message} </ErrorMessage>
                    )}

                </div>

                <div className="grid gap-3">
                    <label htmlFor="name" className="font-bold text-lg uppercase">Nombre</label>
                    <input 
                        type="name" 
                        id="name" 
                        placeholder="Nombre de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("name" , { 
                            required : "El nombre es obligatorio"
                        })}
                    />

                    { errors.name && ( 
                        <ErrorMessage> { errors.name.message} </ErrorMessage>
                    )}

                </div>

                <div className="grid gap-3">
                    <label htmlFor="password" className="font-bold text-lg uppercase">Contraseña</label>
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

                    <label htmlFor="password_confirmation" className="font-bold text-lg uppercase">Password</label>
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
                    value="Crear Cuenta" 
                    className="bg-purple-700 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-400 cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">

                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal"
                > ya tienes cuenta ? Inicia Sesion </Link>

                <Link
                    to={'/auth/forgot-password'}
                    className="text-center text-gray-300 font-normal"
                > Olvitastes tu password ? Recuperar tu Password </Link>

            </nav>
        </>
    )
}

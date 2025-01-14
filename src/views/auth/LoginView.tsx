import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Auth";
import { toast } from "react-toastify";
import { loginForm } from "../../types";

export default function LoginView() {

    const { register  , formState : { errors  } , handleSubmit } = useForm({ defaultValues : { 
        email : "",
        password : ""    
    }})

    const mutate = useMutation({
        mutationFn : login,

        onSuccess : () => { 
            toast.success("Sesion Iniciada")
        },

        onError : (error) => { 
            toast.error( error.message )
        }

    })

    const onSubmit = ( formData : loginForm ) => { 
        mutate.mutate( formData )
    }

    return (
        <>
            <h1 className="text-6xl font-bold text-white"> Iniciar sesion </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Comienza  a planear tus proyectos <span className="text-purple-400"> iniciando  sesion  en este formulario </span></p>

            <form 
                className="bg-white grid gap-6 p-8 rounded mt-4"
                onSubmit= { handleSubmit( onSubmit ) }
            >

                <div className="grid gap-3">

                    <label htmlFor="email" className="font-bold text-lg uppercase">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("email", { 
                            required: "El email es obligatorio"
                        })}
                    />

                    { errors.email && ( 
                        <ErrorMessage> { errors.email.message }</ErrorMessage>
                    )}

                </div>

                <div className="grid gap-3">

                    <label htmlFor="password" className="font-bold text-lg uppercase">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("password", { 
                            required: "La contraseña es obligatorio"
                        })}
                    />

                    { errors.password && (
                        <ErrorMessage> { errors.password.message } </ErrorMessage>
                    )}

                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesion" 
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

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

export default function NewPasswordView() {

    const { register  , formState : { errors  } , handleSubmit } = useForm({ defaultValues : { 
        email : ""
    }})

    return (
        <>
            <h1 className="text-6xl font-bold text-white"> Recuperar Contraseña </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Escribe el email de registro y sigue las instrucciones </p>

            <form className="bg-white grid gap-6 p-5 rounded mt-4">

                <div className="grid gap-3">
                    
                    <label htmlFor="email" className="font-bold text-lg uppercase">Email</label>

                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("email" , { 
                            required : "La contraseña es obligatorio"
                        })}
                    />

                    { errors.email && ( 
                        <ErrorMessage> { errors.email.message }</ErrorMessage>
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
                    to={'/auth/register'}
                    className="text-center text-gray-300 font-normal"
                > No tienes Cuenta ?  Crea Una </Link>

            </nav>
        </>
    )
}

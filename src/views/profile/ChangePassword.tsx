import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { updateCurrentUserPassword } from "../../api/Profile"
import { UpdateCurrentPasswordFormType } from "../../types"
import { toast } from "react-toastify"

export default function ChangePassword() {

    const { register , formState : { errors } , handleSubmit , watch , reset } = useForm({ defaultValues : { 
        currentPassword : "",
        newPassword : "" ,
        newPasswordRepeat : "" 
    }})

    const newPassword = watch("newPassword")

    const mutation = useMutation({
        mutationFn : updateCurrentUserPassword ,
        
        onSuccess : (data) => { 
            toast.success( data )
            reset()
        }, 

        onError : ( error) => { 
            toast.error( error.message)
        }
    })


    const submitForm = ( formData : UpdateCurrentPasswordFormType ) => { 
        mutation.mutate( formData )
    }

    

    return (
        <div className=" grid gap-3">
    
            <h1 className="text-6xl font-bold"> Cambiar Password  </h1>

            <p className="text-gray-500 font-light text-3xl"> Utiliza este formulario para cambiar  tu Contraseña </p>


            <div className="w-[700px] mx-auto py-14 ">
                <form 
                    className="mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    onSubmit= { handleSubmit( submitForm ) }
                >

                    <div className="grid gap-3">

                        <label htmlFor="currentPassword" className="font-bold text-lg uppercase">Contraseña Actual</label>
                        <input 
                            placeholder="Escribe tu Contraseña actual"
                            type="password" 
                            id="currentPassword" 
                            className="border border-gray-200 rounded-xl p-3"
                            {...register("currentPassword", { 
                                 required: "La Contraseña es obligatorio"
                            })}
                            
                        />
                        { errors.currentPassword && ( 
                           <ErrorMessage> { errors.currentPassword?.message }</ErrorMessage>
                        )} 

                    </div>

                    <div className="grid gap-3">

                        <label htmlFor="newPassword" className="font-bold text-lg uppercase">Contraseña</label>
                        <input 
                            type="password" 
                            className="border border-gray-200 rounded-xl p-3"
                            id="newPassword"
                            placeholder="Escribe la Nueva Contraseña"
                            {...register("newPassword", { 
                                required: "El email es obligatorio"
                            })}
                        />

                        { errors.newPassword && (
                           <ErrorMessage> { errors.newPassword.message } </ErrorMessage>
                        )}

                    </div>

                    <div className="grid gap-3">

                        <label htmlFor="newPasswordRepeat" className="font-bold text-lg uppercase">Repite la Contraseña </label>
                        <input 
                            type="password" 
                            className="border border-gray-200 rounded-xl p-3"
                            id="newPasswordRepeat"
                            placeholder="Repita la nueva coontraseña"
                            {...register("newPasswordRepeat", { 
                                required: "Repite la nueva Contraseña",
                                validate : value => value == newPassword || "las Contraseñas no son iguales"
                            })}
                        />

                        { errors.newPasswordRepeat && (
                            <ErrorMessage> { errors.newPasswordRepeat.message } </ErrorMessage>
                        )}

                    </div>

                    <input 
                        type="submit" 
                        value="Guardar Cambios" 
                        className="bg-purple-700 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-400 cursor-pointer"
                    />
                </form>
            </div>
        </div>
    )
}

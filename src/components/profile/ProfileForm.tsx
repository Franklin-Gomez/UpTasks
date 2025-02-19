import { useForm } from "react-hook-form";
import { ProfileFormType, userType } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../api/Profile";
import { toast } from "react-toastify";

type ProfileFormPropsType = { 
    userInfo : userType
}

export default function ProfileForm(  { userInfo }  : ProfileFormPropsType) {


    const { register , formState : { errors } , handleSubmit } = useForm({
        defaultValues : { 
            name : userInfo.name,
            email : userInfo.email
        }
    })

    const mutation = useMutation({
        mutationFn : updateProfile , 
        onSuccess : ( data ) => { 
            toast.success( data)
        }, 
        onError : ( error ) => { 
            toast.error( error.message)
        }
    })

    const onSubmit = (  formdata   :  ProfileFormType   ) => { 
        mutation.mutate  ( formdata )
    }

    return (
        <div className=" grid gap-3">
    
            <h1 className="text-6xl font-bold"> Mi Perfil </h1>

            <p className="text-gray-500 font-light text-3xl"> Aqui Puedes Actualizar tu informacion </p>


            <div className="w-[700px] mx-auto py-14 ">
                <form 
                    className="mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    onSubmit= { handleSubmit( onSubmit ) }
                >

                    <div className="grid gap-3">

                        <label htmlFor="name" className="font-bold text-lg uppercase">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="border border-gray-200 rounded-xl p-3"
                            {...register("name", { 
                                required: "El Nombre es obligatorio"
                            })}
                            
                        />

                        { errors.email && ( 
                           <ErrorMessage> { errors.name?.message }</ErrorMessage>
                        )} 

                    </div>

                    <div className="grid gap-3">

                        <label htmlFor="email" className="font-bold text-lg uppercase">E-mail</label>
                        <input 
                            type="email" 
                            className="border border-gray-200 rounded-xl p-3"
                            id="email"
                            {...register("email", { 
                                required: "El email es obligatorio"
                            })}
                        />

                        { errors.email && (
                           <ErrorMessage> { errors.email.message } </ErrorMessage> 
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

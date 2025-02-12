import { useForm } from "react-hook-form";
import { TeamMemberForm } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FindUserbyEmail } from "../../api/Team";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


export default function AddMemberForm( ) {

    const param = useParams()
    const projectId = param.projectId!
    
    const { register , formState : { errors } , handleSubmit } = useForm<TeamMemberForm>()

    const mutation = useMutation({
        mutationFn : FindUserbyEmail,

        onSuccess : () => { 
            
        }, 

        onError : (error) => { 
            toast.error( error.message)
        }

    
    })

    const submitForm = (  formdata  : TeamMemberForm ) => { 

        const data = { 
            formdata : formdata,
            projectId : projectId
        }

        console.log( data )
        
        mutation.mutate( data )
    }

    return (
        <>

            <form className="mt-4 bg-white rounded-xl " onSubmit={ handleSubmit ( submitForm )}>

                <div className="bg-white  grid gap-6 ">

                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold text-lg uppercase"> E-mail de Usuario </label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="E-mail del usuario a Agregar " 
                            className="border border-gray-200 rounded-xl p-3 mt-3"
                            {...register("email" , {
                                required : "El Email es obligatorio"
                            })}   
                        />
                        
                        {errors.email?.message  && 
                            <ErrorMessage>
                                {errors.email.message}
                            </ErrorMessage>
                        }
                    </div>

                    <input 
                        type="submit" 
                        value="Buscar Miembro" 
                        className="bg-purple-400 text-white py-4 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-3"    
                    />

                </div>

            </form>

          
        </>
    )
}

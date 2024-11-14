import { Link  , useNavigate } from "react-router-dom"
import ProjectForm from "../../components/projects/ProjectForm"
import { useForm } from "react-hook-form"
import { projectFormDataType } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { createProject } from "../../api/Project"
import { toast } from "react-toastify"

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValue = { 
        projectName : "",
        clientName : "",
        description : ""
    }

    const { register , handleSubmit ,  formState : { errors }  } = useForm( { defaultValues : initialValue} )

    const mutation = useMutation({

        mutationFn : createProject,

        onSuccess : (data) => { 
            toast.success(data)
            navigate('/')
        },

        onError : (error) => { 
            toast.error( error.message )
        }
            
    })

    const formSubmit = (   formData  : projectFormDataType  ) =>  { 
        
        mutation.mutate( formData )

    }


    return (
        <>
            <div className="mx-auto max-w-3xl grid gap-2 ">

                <h1 className="text-6xl font-bold"> Crear Projecto </h1>

                <p className="text-gray-500 font-light text-3xl"> Crear nuevo Proyecto </p>

                <nav className="my-2">
                    <Link
                        to={'/'}
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                    >
                        Mis Proyectos
                    </Link>
                </nav>

                <form onSubmit={handleSubmit( formSubmit )} className="mt-4 bg-white rounded-xl p-6">

                    <ProjectForm
                        errors={errors}
                        register={register}
                    />

                    <input 
                        type="submit" 
                        value="Crear Proyecto" 
                        className="bg-purple-400 text-white py-4 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-6"
                    />

                </form>
                

            </div>


        </>
    )
}

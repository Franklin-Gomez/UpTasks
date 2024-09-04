import { projectFormDataType } from "@/types/index"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/ProjectAPI"
import { projectType } from "@/types/index"
import { toast } from "react-toastify"

type EditProjectForm = { 
    data : projectFormDataType
    projectId : projectType['_id']
}

export default function EditProjectForm( { data  , projectId } :  EditProjectForm) {

    const navigate = useNavigate()

    const { register , handleSubmit , formState: { errors } } = useForm({defaultValues:  {
        projectName : data.projectName,
        clientName : data.clientName,
        description : data.description
    }})

    // quitar el cacheo automatico - invalidar query
    const queryClient = useQueryClient()

    const { mutate } = useMutation({

        mutationFn: updateProject,
        onError: ( error ) => { 
            toast.error( error.message)
        },
        onSuccess: ( data ) => { 
            queryClient.invalidateQueries({queryKey : ['projects']}) // no cashear sino hacer un nuevo query
            queryClient.invalidateQueries({queryKey : ['editProject', projectId]})
            toast.success( data )
            navigate('/')

        }
    })

    const handleForm = ( formData : projectFormDataType)  => { 
        const data = { 
            formData : formData,
            projectId : projectId
        }
        
        mutate( data )
    }

    return (
        <>  
            <div className="max-w-3xl mx-auto">
                
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500">Llena el siguiente Formulario para editar un Proyecto </p>

                <nav className="my-5">

                    <Link
                        to='/'
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    > Volver a Proyectos </Link>

                </nav>

                <form 
                    action=""
                    className=" mt-10 bg-white shadow-lg p-10 rounded-lg "
                    onSubmit={handleSubmit( handleForm )}
                    noValidate // debilita validacion de html 5
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input 
                        type="submit" 
                        value='Guardar Cambios'
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors "
                    />

                </form>
                
            </div>
        </>
    )
}

import { Link, redirect } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form"
import { projectFormDataType, projectType } from "../../types"
import { updateProject } from "../../api/Project"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type EditProjectFormType = { 
    data : projectType
    projectId : projectType['_id']
}

export default function EditProjectForm( { data , projectId  } : EditProjectFormType ) {


    const { register, formState : { errors } , handleSubmit } = useForm<projectFormDataType>()

    const navigate = useNavigate()

    const mutation = useMutation({

        mutationFn :  updateProject,

        onSuccess : () => {  
            toast.success('Projecto Actualizado Correctamente')
            navigate("/")
        } , 

        onError : (errors) => { 
            toast.error(errors.message)
        }

    })

    const submitForm = async ( formdata : projectFormDataType  ) => { 

        const data = { 
            formdata,
            projectId
        }

        mutation.mutate(  data  )

    }

    return (
        <div className="mx-auto max-w-3xl grid gap-2 ">

        <h1 className="text-6xl font-bold"> Editar Proyecto </h1>

        <nav className="my-2">
            <Link
                to={'/'}
                className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
            >
                Mis Proyectos
            </Link>
        </nav>

        <form  onSubmit={ handleSubmit( submitForm ) }className="mt-4 bg-white rounded-xl p-6">

            <ProjectForm
                errors={errors}
                register={register}
                data={data}
            />
 
            <input 
                type="submit" 
                value="Guardar Cambios" 
                className="bg-purple-400 text-white py-4 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-6"
            />

        </form>
        

    </div>
    )
}

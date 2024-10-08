import { Link , useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "../../components/projects/ProjectForm"
import { projectFormDataType } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

import { toast } from 'react-toastify'

import { useMutation } from "@tanstack/react-query"

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues : projectFormDataType = { 
        projectName : "",
        clientName : "",
        description : ""
    }

    const { register , handleSubmit , formState: { errors } } = useForm({defaultValues: initialValues })

    const mutation = useMutation({ 
        mutationFn : createProject,

        onError : ( error ) => { 
            toast.error( error.message )
        }, 

        onSuccess : ( data ) => { 
            toast.success( data )
            navigate('/')
        }
    })
    
    const handleForm = ( formData  :  projectFormDataType)  => { 
        mutation.mutate( formData )
    }

    return (

        <>  
            <div className="max-w-3xl mx-auto">
                
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500">Llena el siguiente Formulario para crear un Proyecto </p>

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
                        value='Crear Proyecto'
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors "

                    />

                </form>
                
            </div>
        </>
    )
}

import { Link } from "react-router-dom"
import ProjectForm from "../../components/projects/ProjectForm"
import { useForm } from "react-hook-form"

export default function CreateProjectView() {

    const initialValue = { 
        proyectName : "",
        clientName : "",
        description : ""
    }

    const { register , formState : { errors }  } = useForm( { defaultValues : initialValue} )

    
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

                <form action="" className="mt-4 bg-white rounded-xl p-6">

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

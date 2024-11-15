import { Link } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form"
import { projectFormDataType } from "../../types"

export default function EditProjectForm() {

    const { register, formState : { errors } } = useForm<projectFormDataType>()

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

        <form className="mt-4 bg-white rounded-xl p-6">

            <ProjectForm
                errors={errors}
                register={register}
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

import { Link } from "react-router-dom"
import ProjectForm from "../../components/projects/ProjectForm"

export default function CreateProjectView() {
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

                <form action="" className="bg-white mt-4">

                    <ProjectForm/>

                </form>
                

            </div>


        </>
    )
}

import { Link } from "react-router-dom"

export default function DashboardViews() {
    return (
        <>
            <div className=" grid gap-3">

                <h1 className="text-6xl font-bold"> Mis Proyectos </h1>

                <p className="text-gray-500 font-light text-3xl"> Maneja y Administra tus proyectos</p>

                <nav className="my-2">
                    <Link
                        to={'/projects/createProject'}
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                    >
                        Nuevo Proyecto
                    </Link>
                </nav>

            </div>
        </>
    )
}

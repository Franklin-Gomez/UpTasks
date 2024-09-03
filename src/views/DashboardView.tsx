import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getAllProjects } from "@/api/ProjectAPI"

export default function DashboardView() {

    const { data , isError , isLoading } = useQuery({ 
        queryKey : ['projects'],
        queryFn : getAllProjects
    })
    
    if( isLoading ) { 
        return 'cargando...'
    }

    if ( data ) return (

        <>
            <h1 className="text-5xl font-black">Mis Proyectos</h1>
            <p className="text-2xl font-light text-gray-500">Maneja y administra tus proyectos</p>

            <nav className="my-5">

                <Link
                    to='/projects/create'
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                > Nuevo Proyecto </Link>

            </nav>

            { data.length ? (
                <p> Si hay proyectos </p>
            ) : ( 
                <p className="text-center py-20"> No hay proyectos aun {''}
                
                    <Link
                        to={'/projects/creat'}
                        className="text-fuchsia-500 font-bold"
                    >Crear Proyecto</Link>
                </p>
            )}
        </>
    )
}

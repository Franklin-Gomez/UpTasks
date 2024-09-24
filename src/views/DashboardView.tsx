import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { Link } from "react-router-dom"
import { useMutation, useQuery , useQueryClient} from "@tanstack/react-query"
import { deleteProject, getAllProjects } from "@/api/ProjectAPI"
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardView() {

    const { data : user , isLoading : authLoading } = useAuth();

    const { data , isError , isLoading } = useQuery({ 
        queryKey : ['projects'],
        queryFn : getAllProjects
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteProject,
        onError: ( error ) => { 
            toast.error(error.message)
        },
        onSuccess : ( data ) => {
            toast.success( data )
            queryClient.invalidateQueries({ queryKey : ['projects']})
        }
    })

    console.log( data )
    
    if( isLoading && authLoading ) { 
        return 'cargando...'
    }

    if ( data && user ) return (

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
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map((project) => (
                        <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    
                                    <div>
                                        {
                                            project.manager === user._id ? 

                                            <p className='font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block  py-1 px-5'>Manager</p> 

                                            :

                                            <p className='font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block  py-1 px-5'>Miembreo del Equipo </p> 
                                        }

                                    </div>

                                    <Link to={`/projects/${project._id}`}
                                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{project.projectName}</Link>
                                    <p className="text-sm text-gray-400">
                                        Cliente: {project.clientName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                            <Menu.Item>
                                                <Link to={`/projects/${project._id}`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    Ver Proyecto
                                                </Link>
                                            </Menu.Item>

                                            { project.manager == user._id && ( 
                                                <> 
                                                    <Menu.Item>
                                                        <Link to={`/projects/${project._id}/edit`}
                                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                        Editar Proyecto
                                                        </Link>
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        <button 
                                                            type='button' 
                                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                            onClick={() => mutate(project._id) }
                                                        >
                                                        Eliminar Proyecto
                                                        </button>
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
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

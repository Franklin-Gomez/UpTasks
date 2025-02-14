import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { deleteProject, getAllProject } from "../api/Project"

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from "react-toastify"
import { userAuth } from "../hooks/useAuth"

export default function DashboardViews() {

    const queryClient = useQueryClient()

    const { data  } = useQuery({
        queryKey:['AllProject'],
        queryFn : getAllProject
    })

    const user = userAuth()

    const mutation = useMutation({ 
        mutationFn : deleteProject , 

        onSuccess : () => { 
            toast.success('Proyecto Eliminado Correctamente')
            queryClient.invalidateQueries({ queryKey : ['AllProject']})
        } , 

        onError : ( error ) => { 
            toast.error( error.message )
        }
    })

    
    if( data && user.data ) return (
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

            { data.length ? (

                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map((project) => (

                    <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">

                        <div className="flex min-w-0 gap-x-4">

                            <div className="min-w-0 flex-auto space-y-2">

                                <div>
                                    { user.data?._id == project.manager ? 

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

                                        { user.data?._id == project.manager && 
                                            
                                            <>
                                                <Menu.Item>
                                                    <Link to={`/projects/${project._id}/editProject`}
                                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                        Editar Proyecto
                                                    </Link>
                                                </Menu.Item>

                                                <Menu.Item>
                                                    <button 
                                                        type='button' 
                                                        className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                        onClick={() => mutation.mutate(project._id) }
                                                    >
                                                        Eliminar Proyecto
                                                    </button>
                                                </Menu.Item>
                                            </>

                                        }

                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                    </li>
                    ))}
                </ul>
            ) : ( 
                <p>No hay Projectos Creados </p>
            )}
        </>
    )
}

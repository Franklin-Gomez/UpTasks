import { Link, useNavigate, useParams } from "react-router-dom";
import AddMemberModal from "../../components/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectsTeam, removeMemberById } from "../../api/Team";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { toast } from "react-toastify";

export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const query = useQuery({ 
        queryKey : ['teamMember' , projectId ] ,
        queryFn : () => getProjectsTeam( projectId ),
        retry : false 
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({ 
        mutationFn : removeMemberById , 
        onSuccess : () => { 
            queryClient.invalidateQueries({ queryKey : ['teamMember' , projectId ]})
        },

        onError : ( error ) => { 
            toast.error( error.message )
        }

    })


    if( query.data ) return (
        <>
            <div className=" grid gap-3">

                <h1 className="text-6xl font-bold"> Administrar Equipo </h1>

                <p className="text-gray-500 font-light text-3xl"> Administra el Equipo  de trabajo de este Proyecto </p>

                <nav className="my-2 flex gap-2">

                    <Link
                        to={'/'}
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                    >
                        Inicio
                    </Link>

                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={ () => navigate('?addMember=true') }
                    >Agregar Colaborador</button>

                </nav>

            </div>            
            
            { query.data.length ? (

                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {query.data.map((team) => (

                    <li key={team._id} className="flex justify-between gap-x-6 px-5 py-10">

                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">

                                { <Link to={`/`}
                                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                >{team.name}</Link> }


                                { <p className="text-sm text-gray-400">
                                    {team.email}
                                </p> }

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

                                            <Link to={`/`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                Ver Perfil
                                            </Link>

                                        </Menu.Item>

                                        <Menu.Item>

                                            <button 
                                                type='button' 
                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                onClick={() => mutation.mutate({ userId : team._id , projectId : projectId } ) }
                                            >
                                                Eliminar Miembro
                                            </button>

                                        </Menu.Item>

                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                    </li>
                    ))}
                </ul>
            
            ) : ( 
                <p> Miembros en este equipo </p>
            )}

            <AddMemberModal/>

        </>

    )
}

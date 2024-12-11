import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOneTask, updateStatusTask } from '../../api/Task';
import { statusTranslations } from './TaskList';
import { toast } from 'react-toastify';
import { taskStatusType } from '../../types';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {
    // cerrar modal
    const navigate = useNavigate()

    // abrir modal
    const location = useLocation()
    const query = location.search
    const params = new URLSearchParams( query )
    
    const taskId = params.get("viewTask")!

    const show = taskId ? true : false

    const param = useParams()
    const projectId = param.projectId!

    // peticion para obtener la informacion en el modal de los detalles de tareas
    const { data , isError , error  } = useQuery({
        queryKey: ['task' , taskId],
        queryFn: () => getOneTask({ projectId , taskId }),
        enabled: !!taskId, // true o false
        retry: false
    })

    // actualizar status
    const queryClient = useQueryClient()
    const mutate = useMutation({ 
        
        mutationFn : updateStatusTask , 

        onSuccess : () => { 
            toast.success('Status Actualizado Correctamente')
            navigate( location.pathname , { replace: true }) 
            queryClient.invalidateQueries({queryKey : ["project" , projectId]})
            queryClient.invalidateQueries({queryKey : ["task" , taskId ]})
        },

        onError : ( error ) => { 
            toast.error( error.message )
        }
    })

    // cambiar el status
    const handleChange = ( e : React.ChangeEvent<HTMLSelectElement> ) => { 

        const status = e.target.value  as taskStatusType

        const data = { 
            taskId : taskId,
            status : status,
            projectId : projectId
        }

        mutate.mutate( data  )
    }

  
    if( data )  return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate( location.pathname , { replace: true }) }>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: </p>
                                    <p className='text-sm text-slate-400'>Última actualización: </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data?.name}</Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data?.description}</p>
                                    <div className='my-5 space-y-3'>

                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={ handleChange }
                                        >
                                            {Object.entries(statusTranslations).map( ([ key , value ]) => 
                                                <option id={key} key={key} value={key} > {value} </option>
                                            )}

                                        </select>

                                    </div>

                                    <NotesPanel/>
                                    
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
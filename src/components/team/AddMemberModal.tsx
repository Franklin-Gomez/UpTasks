import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { taskFormType, TeamMemberForm } from '../../types';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../api/Task';
import { toast } from 'react-toastify';
import AddMemberForm from './AddMemberForm';

export default function AddMemberModal() {

    // cerrar modal
    const navigate = useNavigate()

    // abrir modal
    const location = useLocation()
    const query = location.search
    const params = new URLSearchParams( query )
    const openClose = params.get("addMember") ? true : false

    const validate = useParams()
    const projectId = validate.projectId!

    // form 
    const { register , formState : { errors } , handleSubmit  } = useForm<TeamMemberForm>()
    
    // invalidar query
    const queryClient = useQueryClient()

    // query  = crear tareas
    const mutation = useMutation({

        mutationFn : createTask,

        onSuccess : () => { 
            queryClient.invalidateQueries({ queryKey : [ "project" ]})
            navigate( location.pathname , { replace: true  })
            toast.success("Tarea creada satisfactoriamente")
        }, 

        onError :  ( error ) => { 
            toast.error( error.message )
        }

    })    

    // submit 
    const submitForm = ( formdata : taskFormType ) => {

        const data  = {
            formdata : formdata, 
            projectId
        }
        
        mutation.mutate( data )

    }

    return (
        <>
            <Transition appear show={openClose} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate( location.pathname , { replace: true  }) }>
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
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Agrega Integrante al equipo
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Busca al nuevo Integrante por email {''}
                                        <span className="text-fuchsia-600"> Para agregarlo al proyecto </span>
                                    </p>

                                    
                                    <AddMemberForm/>

                                </Dialog.Panel>
                            </Transition.Child>

                        </div>
                    </div>


                </Dialog>
            </Transition>
        </>
    )
}
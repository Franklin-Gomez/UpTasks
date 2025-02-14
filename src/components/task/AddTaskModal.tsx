import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { taskFormType } from '../../types';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../api/Task';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    // cerrar modal
    const navigate = useNavigate()

    // abrir modal
    const location = useLocation()
    const query = location.search
    const params = new URLSearchParams( query )
    const openClose = params.get("newTask") ? true : false

    const validate = useParams()
    const projectId = validate.projectId!

    // form 
    const { register , formState : { errors } , handleSubmit  } = useForm<taskFormType>()
    
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

        onError :  (error) => { 
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
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    
                            <form className="mt-4 bg-white rounded-xl " onSubmit={ handleSubmit ( submitForm )}>
    
                                <TaskForm
                                    errors={errors}
                                    register={register}
                                />

                                <input 
                                    type="submit" 
                                    value="Crear Nota" 
                                    className="bg-purple-400 text-white py-4 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-6"    
                                />

                            </form>

                                </Dialog.Panel>
                            </Transition.Child>

                        </div>
                    </div>


                </Dialog>
            </Transition>
        </>
    )
}
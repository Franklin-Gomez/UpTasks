import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskType } from "../../types";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { toast } from "react-toastify";
import { updateStatusTask } from "../../api/Task";
import { useParams } from "react-router-dom";
import { taskStatusType } from "../../types";

type TaskListProps = { 
    tasks : taskType[]
    canEdit : boolean
}

type GroupedTasks = { 
    [key : string ] : taskType[]
}

const  TaskListProps : GroupedTasks = { 
    pending : [],
    onHold : [], 
    inProgress : [],
    underReview : [],
    completed : []
}

const colorsStatus : { [ key : string ] : string } = {
    pending : "border-t-slate-500",
    onHold : "border-t-red-500", 
    inProgress : "border-t-blue-500",
    underReview : "border-t-amber-500",
    completed : "border-t-emerald-500"
}


export const statusTranslations : { [ key : string ] : string } = {
    pending : "Pendiente",
    onHold : "En Espera", 
    inProgress : "En Progreso",
    underReview : "Bajo Revision",
    completed : "Completado"
}


export default function TaskList(  { tasks , canEdit } : TaskListProps ) {

    const groupedTasks = tasks.reduce((acc, task) => {

        let currentGroup = acc[task.status] ? [...acc[task.status]] : []

        currentGroup = [...currentGroup, task]

        return { ...acc, [task.status]: currentGroup };

    }, TaskListProps );

    const param = useParams()
    const projectId = param.projectId!

    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn : updateStatusTask ,

        onSuccess : ( data ) => { 
            toast.success( data )
            queryClient.invalidateQueries({ queryKey : ["project"]})
        },

        onError : ( error ) => { 
            toast.error( error.message)
        }
    })

    const handleDragEnd = ( e : DragEndEvent) => { 
        const { over , active } = e 

        if( over && over.id ) { 
            const status =  over.id as taskStatusType
            const taskId =  active.id.toString()

            mutate.mutate({
                taskId,
                projectId,
                status
            })

        } else { 
            console.log('no valido')
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>

                <DndContext onDragEnd={handleDragEnd}>
                

                    {Object.entries(groupedTasks).map(([status, tasks]) => (

                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                            <h3
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${colorsStatus[status]}`}
                            >{ statusTranslations[status] }</h3>

                            <DropTask status={status}/> 

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (

                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>

                                ) : (

                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)

                                )}
                            </ul>
                        </div>
                    ))}

                </DndContext>  

            </div>
        </>
    )
}

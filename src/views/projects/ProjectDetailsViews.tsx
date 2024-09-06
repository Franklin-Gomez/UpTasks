import { useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"

import { Navigate } from "react-router-dom"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetail"


export default function ProjectDetailsViews() {
    const params   = useParams()
    const navigate = useNavigate()

    const projectId = params.projectId! //  para evitar undefined "!"
    
    const { data , isLoading , error , isError} = useQuery({
        queryKey : ['project', projectId],
        queryFn : () =>  getProjectById(projectId),
        retry : false //<-- no intenta la conexion varias veces a la api
    })

    if( isLoading ) return 'Cargando...'
    if( isError ) return <Navigate to='/404' />

    if ( data ) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate('?newTask=true')}
                >Agregar Tarea</button>
            </nav>

            <TaskList
                tasks={data.tasks}            
            />
            
            <AddTaskModal/>

            <EditTaskData/>

            <TaskModalDetails/>
        </>
    )
}
